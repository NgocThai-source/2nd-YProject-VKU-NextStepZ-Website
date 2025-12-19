import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private resend: Resend;
  private fromEmail: string;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('RESEND_API_KEY');
    this.fromEmail = this.configService.get<string>('RESEND_FROM_EMAIL') || 'onboarding@resend.dev';
    this.resend = new Resend(apiKey);
  }

  async sendOtpEmail(email: string, otp: string, fullName?: string): Promise<boolean> {
    try {
      const response = await this.resend.emails.send({
        from: this.fromEmail,
        to: email,
        subject: '🔐 Mã xác nhận đặt lại mật khẩu NextStepZ',
        html: this.generateOtpEmailTemplate(otp, fullName || 'Bạn'),
      });

      return !!response.data?.id;
    } catch (error) {
      console.error('Error sending OTP email:', error);
      return false;
    }
  }

  async sendWelcomeEmail(email: string, firstName: string): Promise<boolean> {
    try {
      const response = await this.resend.emails.send({
        from: this.fromEmail,
        to: email,
        subject: '🎉 Chào mừng đến NextStepZ!',
        html: this.generateWelcomeEmailTemplate(firstName),
      });

      return !!response.data?.id;
    } catch (error) {
      console.error('Error sending welcome email:', error);
      return false;
    }
  }

  private generateOtpEmailTemplate(otp: string, userName: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
              line-height: 1.6;
              color: #1e293b;
              background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
              margin: 0;
              padding: 0;
              min-height: 100vh;
            }
            .wrapper {
              background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
              padding: 20px 0;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .container {
              max-width: 100%;
              width: 100%;
              background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0c4a6e 100%);
              border-radius: 0;
              overflow: hidden;
              box-shadow: none;
              border: none;
              position: relative;
            }
            .container::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 0px;
              background: transparent;
            }
            .header {
              background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0c4a6e 100%);
              padding: 50px 40px;
              text-align: center;
              position: relative;
              overflow: hidden;
            }
            .header::before {
              content: '';
              position: absolute;
              top: -50%;
              right: -10%;
              width: 400px;
              height: 400px;
              background: radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%);
              border-radius: 50%;
            }
            .header::after {
              content: '';
              position: absolute;
              bottom: -30%;
              left: -5%;
              width: 300px;
              height: 300px;
              background: radial-gradient(circle, rgba(8, 145, 178, 0.1) 0%, transparent 70%);
              border-radius: 50%;
            }
            .logo {
              max-width: 360px;
              height: auto;
              margin: 0 auto 20px;
              display: block;
              position: relative;
              z-index: 1;
            }
            .header h1 {
              margin: 0;
              font-size: 32px;
              font-weight: 700;
              color: #ffffff;
              position: relative;
              z-index: 1;
              letter-spacing: -0.5px;
            }
            .header p {
              margin: 10px 0 0 0;
              font-size: 14px;
              color: rgba(255, 255, 255, 0.85);
              position: relative;
              z-index: 1;
              font-weight: 500;
              letter-spacing: 0.5px;
            }
            .content {
              padding: 50px 60px;
              position: relative;
              background: linear-gradient(135deg, rgba(30, 58, 138, 0.8) 0%, rgba(12, 74, 110, 0.8) 100%);
              backdrop-filter: blur(10px);
            }
            .greeting {
              font-size: 20px;
              color: #ffffff;
              margin-bottom: 16px;
              font-weight: 600;
              letter-spacing: -0.3px;
            }
            .greeting strong {
              background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }
            .intro-text {
              font-size: 15px;
              color: rgba(255, 255, 255, 0.9);
              margin-bottom: 32px;
              line-height: 1.8;
              font-weight: 500;
            }
            .otp-section {
              background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
              border: 2px solid #06b6d4;
              border-radius: 16px;
              padding: 40px 30px;
              margin: 32px 0;
              text-align: center;
              position: relative;
              overflow: hidden;
            }
            .otp-section::before {
              content: '';
              position: absolute;
              top: -50%;
              right: -10%;
              width: 300px;
              height: 300px;
              background: radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%);
              border-radius: 50%;
            }
            .otp-label {
              font-size: 12px;
              color: #0c4a6e;
              text-transform: uppercase;
              letter-spacing: 2px;
              margin-bottom: 16px;
              font-weight: 700;
              display: block;
            }
            .otp-code {
              font-size: 56px;
              font-weight: 800;
              color: #0369a1;
              letter-spacing: 12px;
              font-family: 'Courier New', 'Monaco', monospace;
              margin: 12px 0;
              position: relative;
              z-index: 1;
              line-height: 1;
            }
            .expiry-info {
              font-size: 13px;
              color: #0c4a6e;
              margin-top: 18px;
              font-weight: 600;
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 6px;
              position: relative;
              z-index: 1;
            }
            .security-info {
              background: linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(8, 145, 178, 0.1) 100%);
              border-left: 4px solid #06b6d4;
              border-radius: 12px;
              padding: 18px 20px;
              margin: 28px 0;
              font-size: 13px;
              color: rgba(255, 255, 255, 0.95);
              line-height: 1.7;
              font-weight: 500;
            }
            .security-info strong {
              color: #06b6d4;
              font-weight: 700;
            }
            .info-text {
              font-size: 14px;
              color: rgba(255, 255, 255, 0.85);
              margin: 24px 0;
              line-height: 1.8;
              font-weight: 500;
            }
            .info-text a {
              color: #06b6d4;
              text-decoration: none;
              font-weight: 700;
              border-bottom: 2px solid transparent;
              transition: all 0.3s ease;
            }
            .info-text a:hover {
              border-bottom-color: #06b6d4;
              color: #22d3ee;
            }
            .footer {
              background: linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 58, 138, 0.6) 100%);
              padding: 30px 40px;
              text-align: center;
              border-top: 1px solid rgba(6, 182, 212, 0.2);
              font-size: 12px;
              color: rgba(255, 255, 255, 0.7);
              line-height: 1.8;
            }
            .footer p {
              margin: 6px 0;
              font-weight: 500;
            }
            .footer p:first-child {
              color: rgba(255, 255, 255, 0.9);
              font-weight: 600;
            }
            .divider {
              height: 1px;
              background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.3), transparent);
              margin: 24px 0;
            }
            @media (max-width: 600px) {
              .wrapper {
                padding: 10px 0;
              }
              .container {
                border-radius: 0;
              }
              .header {
                padding: 40px 24px;
              }
              .content {
                padding: 32px 24px;
              }
              .footer {
                padding: 24px;
              }
              .header h1 {
                font-size: 28px;
              }
              .otp-code {
                font-size: 48px;
                letter-spacing: 10px;
              }
              .greeting {
                font-size: 18px;
              }
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="header">
                <img src="https://image2url.com/images/1766046180628-403b388f-ab45-41c3-abe6-b58523f256b0.png" alt="NextStepZ" class="logo">
                <h1>Xác Nhận Tài Khoản</h1>
                <p>Đặt lại mật khẩu NextStepZ của bạn</p>
              </div>
              
              <div class="content">
                <p class="greeting">Xin chào, <strong>${userName}</strong>! 👋</p>
                
                <p class="intro-text">
                  Bạn vừa yêu cầu đặt lại mật khẩu cho tài khoản NextStepZ. Để hoàn tất quy trình, vui lòng sử dụng mã xác thực bên dưới:
                </p>
                
                <div class="otp-section">
                  <span class="otp-label">🔐 Mã Xác Thực</span>
                  <div class="otp-code">${otp}</div>
                  <div class="expiry-info">⏰ Có hiệu lực trong 10 phút</div>
                </div>
                
                <div class="security-info">
                  <strong>🛡️ Lưu ý bảo mật:</strong> Không bao giờ chia sẻ mã này với bất kỳ ai. Đội ngũ NextStepZ sẽ không bao giờ yêu cầu bạn cung cấp mã này qua email hoặc tin nhắn.
                </div>
                
                <div class="divider"></div>
                
                <p class="info-text">
                  ❓ Bạn không yêu cầu đặt lại mật khẩu? Vui lòng bỏ qua email này hoặc <a href="mailto:nguyenngocthai.nqu@gmail.com">liên hệ với chúng tôi ngay</a> nếu bạn có bất kỳ nghi ngờ nào.
                </p>
              </div>
              
              <div class="footer">
                <p>© 2025 NextStepZ - Khởi động hành trình sự nghiệp của bạn</p>
                <p>Đây là thư tự động, vui lòng không trả lời email này.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
  }

  private generateWelcomeEmailTemplate(firstName: string): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * {
              margin: 0;
              padding: 0;
              box-sizing: border-box;
            }
            body {
              font-family: 'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
              line-height: 1.6;
              color: #1e293b;
              background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
              margin: 0;
              padding: 0;
              min-height: 100vh;
            }
            .wrapper {
              background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
              padding: 20px 0;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .container {
              max-width: 100%;
              width: 100%;
              background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0c4a6e 100%);
              border-radius: 0;
              overflow: hidden;
              box-shadow: none;
              border: none;
              position: relative;
            }
            .container::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 0px;
              background: transparent;
            }
            .header {
              background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0c4a6e 100%);
              padding: 60px 40px;
              text-align: center;
              position: relative;
              overflow: hidden;
            }
            .header::before {
              content: '';
              position: absolute;
              top: -50%;
              right: -10%;
              width: 400px;
              height: 400px;
              background: radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%);
              border-radius: 50%;
            }
            .header::after {
              content: '';
              position: absolute;
              bottom: -30%;
              left: -5%;
              width: 300px;
              height: 300px;
              background: radial-gradient(circle, rgba(8, 145, 178, 0.1) 0%, transparent 70%);
              border-radius: 50%;
            }
            .logo {
              max-width: 360px;
              height: auto;
              margin: 0 auto 24px;
              display: block;
              position: relative;
              z-index: 1;
              animation: slideDown 0.8s ease-out;
            }
            @keyframes slideDown {
              from {
                opacity: 0;
                transform: translateY(-20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .header h1 {
              margin: 0;
              font-size: 40px;
              font-weight: 800;
              color: #ffffff;
              position: relative;
              z-index: 1;
              letter-spacing: -1px;
            }
            .header p {
              margin: 12px 0 0 0;
              font-size: 15px;
              color: rgba(255, 255, 255, 0.85);
              position: relative;
              z-index: 1;
              font-weight: 500;
              letter-spacing: 0.5px;
            }
            .content {
              padding: 50px 60px;
              position: relative;
              background: linear-gradient(135deg, rgba(30, 58, 138, 0.8) 0%, rgba(12, 74, 110, 0.8) 100%);
              backdrop-filter: blur(10px);
            }
            .greeting {
              font-size: 22px;
              color: #ffffff;
              margin-bottom: 20px;
              font-weight: 700;
              letter-spacing: -0.3px;
            }
            .greeting strong {
              background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              background-clip: text;
            }
            .intro-text {
              font-size: 15px;
              color: rgba(255, 255, 255, 0.9);
              margin-bottom: 32px;
              line-height: 1.8;
              font-weight: 500;
            }
            .features-container {
              background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
              border: 2px solid #06b6d4;
              border-radius: 16px;
              padding: 32px;
              margin: 32px 0;
              position: relative;
              overflow: hidden;
            }
            .features-container::before {
              content: '';
              position: absolute;
              top: -50%;
              right: -10%;
              width: 300px;
              height: 300px;
              background: radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%);
              border-radius: 50%;
            }
            .features-title {
              font-size: 14px;
              color: #0c4a6e;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              margin-bottom: 20px;
              font-weight: 700;
              display: block;
              position: relative;
              z-index: 1;
            }
            .feature-item {
              padding: 14px 0;
              font-size: 15px;
              color: #0369a1;
              border-bottom: 1px solid rgba(6, 182, 212, 0.2);
              font-weight: 600;
              position: relative;
              z-index: 1;
              transition: all 0.3s ease;
            }
            .feature-item:last-child {
              border-bottom: none;
            }
            .feature-item:hover {
              transform: translateX(8px);
              color: #0891b2;
            }
            .cta-box {
              background: linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(8, 145, 178, 0.08) 100%);
              border: 2px dashed #06b6d4;
              border-radius: 12px;
              padding: 24px;
              margin: 32px 0;
              text-align: center;
              position: relative;
            }
            .cta-text {
              font-size: 15px;
              color: #0c4a6e;
              font-weight: 600;
              margin-bottom: 12px;
            }
            .cta-link {
              display: inline-block;
              background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
              color: white;
              padding: 12px 28px;
              border-radius: 8px;
              text-decoration: none;
              font-weight: 700;
              font-size: 14px;
              transition: all 0.3s ease;
              box-shadow: 0 4px 15px rgba(6, 182, 212, 0.3);
            }
            .cta-link:hover {
              transform: translateY(-2px);
              box-shadow: 0 6px 20px rgba(6, 182, 212, 0.4);
            }
            .divider {
              height: 1px;
              background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.3), transparent);
              margin: 28px 0;
            }
            .support-text {
              font-size: 13px;
              color: rgba(255, 255, 255, 0.85);
              margin: 24px 0;
              line-height: 1.8;
              font-weight: 500;
            }
            .support-text a {
              color: #06b6d4;
              text-decoration: none;
              font-weight: 700;
              border-bottom: 2px solid transparent;
              transition: all 0.3s ease;
            }
            .support-text a:hover {
              border-bottom-color: #06b6d4;
              color: #22d3ee;
            }
            .footer {
              background: linear-gradient(135deg, rgba(15, 23, 42, 0.6) 0%, rgba(30, 58, 138, 0.6) 100%);
              padding: 30px 40px;
              text-align: center;
              border-top: 1px solid rgba(6, 182, 212, 0.2);
              font-size: 12px;
              color: rgba(255, 255, 255, 0.7);
              line-height: 1.8;
            }
            .footer p {
              margin: 6px 0;
              font-weight: 500;
            }
            .footer p:first-child {
              color: rgba(255, 255, 255, 0.9);
              font-weight: 600;
            }
            @media (max-width: 600px) {
              .wrapper {
                padding: 10px 0;
              }
              .container {
                border-radius: 0;
              }
              .header {
                padding: 40px 24px;
              }
              .header h1 {
                font-size: 32px;
              }
              .content {
                padding: 32px 24px;
              }
              .footer {
                padding: 24px;
              }
              .features-container {
                padding: 24px;
              }
              .greeting {
                font-size: 20px;
              }
            }
          </style>
        </head>
        <body>
          <div class="wrapper">
            <div class="container">
              <div class="header">
                <img src="https://image2url.com/images/1766046180628-403b388f-ab45-41c3-abe6-b58523f256b0.png" alt="NextStepZ" class="logo">
                <h1>🎉 Chào Mừng!</h1>
                <p>Bắt đầu hành trình sự nghiệp của bạn ngay hôm nay</p>
              </div>
              
              <div class="content">
                <p class="greeting">Xin chào, <strong>${firstName}</strong>! 👋</p>
                
                <p class="intro-text">
                  Cảm ơn bạn đã tham gia NextStepZ! Chúng tôi rất vui mừng được chào đón bạn vào cộng đồng của chúng tôi. Bạn đã sẵn sàng để khám phá những cơ hội vô tận trong sự nghiệp.
                </p>
                
                <div class="features-container">
                  <span class="features-title">✨ Những gì bạn có thể làm ngay bây giờ:</span>
                  <div class="feature-item">📋 Tạo hồ sơ chuyên nghiệp đầy đủ</div>
                  <div class="feature-item">📂 Xây dựng danh mục công việc ấn tượng</div>
                  <div class="feature-item">👥 Kết nối và học hỏi từ cộng đồng</div>
                  <div class="feature-item">💼 Khám phá hàng ngàn cơ hội việc làm</div>
                  <div class="feature-item">🤖 Nhận gợi ý việc làm từ AI</div>
                </div>
                
                <div class="cta-box">
                  <p class="cta-text">Bắt đầu xây dựng hồ sơ của bạn</p>
                  <a href="https://nextstepz.com/profile" class="cta-link">Hoàn thành hồ sơ ngay</a>
                </div>
                
                <div class="divider"></div>
                
                <p class="support-text">
                  ❓ Có câu hỏi? Hãy ghé thăm <a href="https://nextstepz.com/community">cộng đồng của chúng tôi</a> hoặc <a href="mailto:support@nextstepz.com">liên hệ hỗ trợ</a>.
                </p>
              </div>
              
              <div class="footer">
                <p>© 2025 NextStepZ - Khởi động hành trình sự nghiệp của bạn</p>
                <p>Đây là thư tự động, vui lòng không trả lời email này.</p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;
  }
}
