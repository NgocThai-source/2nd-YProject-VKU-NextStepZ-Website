import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../../prisma/prisma.service';
import {
  LoginDto,
  RegisterDto,
  LoginResponseDto,
  RegisterResponseDto,
} from './dto';
import { EmailService } from './email.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async register(registerDto: RegisterDto): Promise<RegisterResponseDto> {
    // Check if user exists by email or phone
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: registerDto.email },
          { phone: registerDto.phone },
          { username: registerDto.username || registerDto.email.split('@')[0] },
        ],
      },
    });

    if (existingUser) {
      throw new ConflictException(
        'Email, số điện thoại hoặc username đã được đăng ký',
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Generate username if not provided
    const username =
      registerDto.username ||
      `${(registerDto.firstName || '').toLowerCase()}${(
        registerDto.lastName || ''
      ).toLowerCase()}${Date.now()}`.replace(/\s+/g, '');

    // Create user
    const user = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        username,
        phone: registerDto.phone,
        password: hashedPassword,
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
        role: registerDto.role,
        birthDate: registerDto.birthDate
          ? new Date(registerDto.birthDate)
          : null,
        province: registerDto.province,
        school: registerDto.school,
        major: registerDto.major,
        companyName: registerDto.companyName,
        website: registerDto.website,
        address: registerDto.address,
        taxId: registerDto.taxId,
      },
    });

    // Generate JWT token
    const accessToken = this.jwtService.sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
      },
      { expiresIn: '7d' },
    );

    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      accessToken,
      message: 'Đăng ký thành công',
    };
  }

  async login(loginDto: LoginDto): Promise<LoginResponseDto> {
    // Find user by email or phone
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: loginDto.emailOrPhone },
          { phone: loginDto.emailOrPhone },
        ],
      },
    });

    if (!user) {
      throw new UnauthorizedException(
        'Email/Số điện thoại hoặc mật khẩu không chính xác',
      );
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Email/Số điện thoại hoặc mật khẩu không chính xác',
      );
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Tài khoản của bạn đã bị khóa');
    }

    // Generate JWT token
    const accessToken = this.jwtService.sign(
      {
        sub: user.id,
        email: user.email,
        role: user.role,
      },
      { expiresIn: '7d' },
    );

    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      avatar: user.avatar || undefined,
      role: (user.role as 'user' | 'recruiter') || 'user',
      accessToken,
      birthDate: user.birthDate?.toISOString(),
      province: user.province || undefined,
      school: user.school || undefined,
      major: user.major || undefined,
      companyName: user.companyName || undefined,
      website: user.website || undefined,
      address: user.address || undefined,
      taxId: user.taxId || undefined,
    };
  }

  async getProfile(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return {
      id: user.id,
      email: user.email,
      phone: user.phone,
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      avatar: user.avatar || undefined,
      role: (user.role as 'user' | 'recruiter') || 'user',
      birthDate: user.birthDate?.toISOString(),
      province: user.province || undefined,
      school: user.school || undefined,
      major: user.major || undefined,
      companyName: user.companyName || undefined,
      website: user.website || undefined,
      address: user.address || undefined,
      taxId: user.taxId || undefined,
    };
  }

  // Forgot Password - Generate and send OTP
  async sendForgotPasswordOtp(
    emailOrPhone: string,
  ): Promise<{ message: string; success: boolean; email?: string }> {
    // Trim and validate input
    const input = emailOrPhone.trim();
    if (!input) {
      throw new BadRequestException('Vui lòng nhập email hoặc số điện thoại');
    }

    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ email: input }, { phone: input }],
      },
    });

    if (!user) {
      // Don't reveal if user exists or not for security - always return success message
      return {
        message: 'Nếu email/số điện thoại tồn tại, bạn sẽ nhận được mã OTP',
        success: true,
      };
    }

    // ✅ ANTI-SPAM: Check per-email cooldown (1 minute)
    const cooldownMinutes = 1;
    const cooldownMs = cooldownMinutes * 60 * 1000;
    const lastOtpSentAt = user.lastOtpSentAt;

    console.log(
      `[OTP-RATE-LIMIT] Email: ${user.email}, lastOtpSentAt: ${lastOtpSentAt?.toISOString() || 'null'}`,
    );

    if (lastOtpSentAt) {
      const timeSinceLastOtp = Date.now() - new Date(lastOtpSentAt).getTime();
      console.log(
        `[OTP-RATE-LIMIT] Time since last OTP: ${(timeSinceLastOtp / 1000).toFixed(1)}s, Cooldown: ${cooldownMinutes}m`,
      );

      if (timeSinceLastOtp < cooldownMs) {
        const secondsRemaining = Math.ceil((cooldownMs - timeSinceLastOtp) / 1000);
        const minutesRemaining = Math.ceil(secondsRemaining / 60);
        console.warn(
          `[OTP-RATE-LIMIT-BLOCKED] ${user.email} - Cooldown active. Wait ${minutesRemaining}m (${secondsRemaining}s)`,
        );
        throw new BadRequestException(
          `Vui lòng đợi ${minutesRemaining} phút trước khi yêu cầu mã OTP mới. (${secondsRemaining} giây)`
        );
      }
    }

    console.log(`[OTP-RATE-LIMIT] ${user.email} - Cooldown check passed, sending OTP`);

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Update user with OTP and track the request time
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        otp,
        otpExpiry,
        otpAttempts: 0,
        lastOtpSentAt: new Date(), // Record when OTP was sent for rate limiting
      },
    });

    // Send OTP via email (always send email, even if user input is phone number)
    try {
      await this.emailService.sendOtpEmail(user.email, otp, user.firstName || 'Người dùng');
    } catch (error) {
      console.error('Lỗi gửi email:', error);
      throw new BadRequestException('Không thể gửi OTP. Vui lòng thử lại.');
    }

    return {
      message: 'Mã OTP đã được gửi về email của bạn',
      success: true,
      email: user.email, // Return email to frontend for display
    };
  }

  // Verify OTP
  async verifyForgotPasswordOtp(emailOrPhone: string, otp: string): Promise<{ resetToken: string }> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: emailOrPhone },
          { phone: emailOrPhone },
        ],
      },
    });

    if (!user) {
      throw new BadRequestException('Email/số điện thoại không hợp lệ');
    }

    // Check if OTP exists and not expired
    if (!user.otp || !user.otpExpiry) {
      throw new BadRequestException('OTP chưa được gửi hoặc đã hết hạn');
    }

    if (new Date() > user.otpExpiry) {
      throw new BadRequestException('OTP đã hết hạn');
    }

    if (user.otpAttempts >= 3) {
      throw new BadRequestException('Quá nhiều lần nhập sai. Vui lòng yêu cầu OTP mới');
    }

    if (user.otp !== otp) {
      // Increment attempts
      await this.prisma.user.update({
        where: { id: user.id },
        data: { otpAttempts: user.otpAttempts + 1 },
      });
      throw new BadRequestException('OTP không chính xác');
    }

    // Clear OTP after verification
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        otp: null,
        otpExpiry: null,
        otpAttempts: 0,
      },
    });

    // Generate reset token (short-lived JWT)
    const resetToken = this.jwtService.sign(
      {
        sub: user.id,
        type: 'password-reset',
      },
      { expiresIn: '30m' },
    );

    return { resetToken };
  }

  // Reset Password
  async resetPassword(resetToken: string, newPassword: string): Promise<{ message: string }> {
    try {
      // Verify reset token
      const decoded = this.jwtService.verify(resetToken);

      if (decoded.type !== 'password-reset') {
        throw new UnauthorizedException('Token không hợp lệ');
      }

      const userId = decoded.sub;

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update password
      await this.prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });

      return { message: 'Mật khẩu đã được đặt lại thành công' };
    } catch (error) {
      throw new UnauthorizedException('Token không hợp lệ hoặc đã hết hạn');
    }
  }
}
