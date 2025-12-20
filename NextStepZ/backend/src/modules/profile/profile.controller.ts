/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Controller,
  Get,
  Put,
  Post,
  Param,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProfileService } from './profile.service';
import {
  UpdateProfileDto,
  UpdateUserInfoDto,
  UpdatePersonalInfoDto,
  UpdateProfessionalProfileDto,
} from './dto';
import { JwtAuthGuard } from '../../modules/auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { multerConfig } from '../../config/multer.config';

@Controller('profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  // Get current user's profile
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMyProfile(@CurrentUser() user: any) {
    return this.profileService.getProfile(user.userId);
  }

  // Update current user's profile (full update)
  @Put('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async updateMyProfile(
    @CurrentUser() user: any,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.updateProfile(user.userId, updateProfileDto);
  }

  // ===== User Info Endpoints =====
  // Update user info (avatar, name, email, bio)
  @Put('me/user-info')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async updateUserInfo(
    @CurrentUser() user: any,
    @Body() updateUserInfoDto: UpdateUserInfoDto,
  ) {
    return this.profileService.updateUserInfo(user.userId, updateUserInfoDto);
  }

  // Upload avatar
  @Post('me/avatar')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('file', multerConfig))
  @HttpCode(HttpStatus.OK)
  async uploadAvatar(
    @CurrentUser() user: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.profileService.uploadAvatar(user.userId, file);
  }

  // ===== Personal Info Endpoints =====
  // Update personal info (phone, birth date, city, district, social links)
  @Put('me/personal-info')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async updatePersonalInfo(
    @CurrentUser() user: any,
    @Body() updatePersonalInfoDto: UpdatePersonalInfoDto,
  ) {
    return this.profileService.updatePersonalInfo(user.userId, updatePersonalInfoDto);
  }

  // ===== Professional Profile Endpoints =====
  // Update professional profile (objective, experiences, skills, education)
  @Put('me/professional-profile')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async updateProfessionalProfile(
    @CurrentUser() user: any,
    @Body() updateProfessionalProfileDto: UpdateProfessionalProfileDto,
  ) {
    return this.profileService.updateProfessionalProfile(user.userId, updateProfessionalProfileDto);
  }

  // Get public profile endpoints
  @Post('public')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getOrCreatePublicProfile(@CurrentUser() user: any) {
    return this.profileService.getOrCreatePublicProfile(user.userId);
  }

  // Toggle public profile visibility
  @Post('public/toggle')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async togglePublicProfile(
    @CurrentUser() user: any,
    @Body() body: { isActive: boolean },
  ) {
    return this.profileService.togglePublicProfile(user.userId, body.isActive);
  }

  // Get public profile by share token (public endpoint)
  @Get('public/share/:shareToken')
  @HttpCode(HttpStatus.OK)
  async getPublicProfileByToken(@Param('shareToken') shareToken: string) {
    return this.profileService.getPublicProfileByToken(shareToken);
  }

  // Get public profile by user ID (public endpoint)
  @Get('public/user/:userId')
  @HttpCode(HttpStatus.OK)
  async getPublicProfileByUserId(@Param('userId') userId: string) {
    return this.profileService.getPublicProfileByUserId(userId);
  }

  // Get profile by profile ID (public endpoint) - MUST BE LAST
  @Get(':profileId')
  @HttpCode(HttpStatus.OK)
  async getProfileById(@Param('profileId') profileId: string) {
    return this.profileService.getProfileById(profileId);
  }
}
