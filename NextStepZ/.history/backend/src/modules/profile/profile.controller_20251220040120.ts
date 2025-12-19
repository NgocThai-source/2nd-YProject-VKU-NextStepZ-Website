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
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto';
import { JwtAuthGuard } from '../../modules/auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@Controller('profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  // Get current user's profile
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMyProfile(@CurrentUser() user: any) {
    return this.profileService.getProfile(user.userId);
  }

  // Update current user's profile
  @Put('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async updateMyProfile(
    @CurrentUser() user: any,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.profileService.updateProfile(user.userId, updateProfileDto);
  }

  // Get or create public profile for current user
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

  // Get public profile by share token (public endpoint) - MUST BE BEFORE :profileId route
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

  // Get profile by profile ID (public endpoint)
  @Get(':profileId')
  @HttpCode(HttpStatus.OK)
  async getProfileById(@Param('profileId') profileId: string) {
    return this.profileService.getProfileById(profileId);
  }
}
