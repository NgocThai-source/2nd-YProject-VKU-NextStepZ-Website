import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProfileDto, UpdateProfileDto } from './dto';

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  // Create profile for new user
  async createProfile(userId: string, createProfileDto?: CreateProfileDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Create profile with data from registration or defaults
    const profile = await this.prisma.profile.create({
      data: {
        userId,
        firstName: createProfileDto?.firstName || user.firstName,
        lastName: createProfileDto?.lastName || user.lastName,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        province: createProfileDto?.province || user.province,
        school: createProfileDto?.school || user.school,
        major: createProfileDto?.major || user.major,
        bio: createProfileDto?.bio || '',
      },
      include: {
        publicProfile: true,
      },
    });

    return profile;
  }

  // Get user's own profile
  async getProfile(userId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            username: true,
            role: true,
          },
        },
        publicProfile: true,
      },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  // Get profile by ID (for public profile)
  async getProfileById(profileId: string) {
    const profile = await this.prisma.profile.findUnique({
      where: { id: profileId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            role: true,
          },
        },
      },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    return profile;
  }

  // Update profile
  async updateProfile(userId: string, updateProfileDto: UpdateProfileDto) {
    const profile = await this.prisma.profile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundException('Profile not found');
    }

    const updatedProfile = await this.prisma.profile.update({
      where: { userId },
      data: {
        firstName: updateProfileDto.firstName || profile.firstName,
        lastName: updateProfileDto.lastName || profile.lastName,
        avatar: updateProfileDto.avatar || profile.avatar,
        bio: updateProfileDto.bio || profile.bio,
        phone: updateProfileDto.phone || profile.phone,
        province: updateProfileDto.province || profile.province,
        school: updateProfileDto.school || profile.school,
        major: updateProfileDto.major || profile.major,
        title: updateProfileDto.title || profile.title,
        skills: updateProfileDto.skills || profile.skills,
        experience: updateProfileDto.experience || profile.experience,
        education: updateProfileDto.education || profile.education,
        socialLinks: updateProfileDto.socialLinks || profile.socialLinks,
      },
      include: {
        publicProfile: true,
      },
    });

    return updatedProfile;
  }

  // Create or get public profile
  async getOrCreatePublicProfile(userId: string) {
    let publicProfile = await this.prisma.publicProfile.findUnique({
      where: { userId },
      include: {
        profile: true,
      },
    });

    if (!publicProfile) {
      const profile = await this.prisma.profile.findUnique({
        where: { userId },
      });

      if (!profile) {
        throw new NotFoundException('Profile not found');
      }

      publicProfile = await this.prisma.publicProfile.create({
        data: {
          userId,
          profileId: profile.id,
          isActive: true,
        },
        include: {
          profile: true,
        },
      });
    }

    return publicProfile;
  }

  // Get public profile by share token
  async getPublicProfileByToken(shareToken: string) {
    const publicProfile = await this.prisma.publicProfile.findUnique({
      where: { shareToken },
      include: {
        profile: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                role: true,
              },
            },
          },
        },
      },
    });

    if (!publicProfile) {
      throw new NotFoundException('Public profile not found');
    }

    if (!publicProfile.isActive) {
      throw new BadRequestException('This public profile is no longer active');
    }

    // Increment view count
    await this.prisma.publicProfile.update({
      where: { id: publicProfile.id },
      data: {
        viewCount: publicProfile.viewCount + 1,
      },
    });

    return publicProfile;
  }

  // Toggle public profile visibility
  async togglePublicProfile(userId: string, isActive: boolean) {
    let publicProfile = await this.prisma.publicProfile.findUnique({
      where: { userId },
    });

    if (!publicProfile) {
      publicProfile = await this.getOrCreatePublicProfile(userId);
    }

    const updated = await this.prisma.publicProfile.update({
      where: { userId },
      data: { isActive },
      include: {
        profile: true,
      },
    });

    return updated;
  }

  // Get public profile by user ID
  async getPublicProfileByUserId(userId: string) {
    const publicProfile = await this.prisma.publicProfile.findUnique({
      where: { userId },
      include: {
        profile: {
          include: {
            user: {
              select: {
                id: true,
                username: true,
                role: true,
              },
            },
          },
        },
      },
    });

    if (!publicProfile) {
      throw new NotFoundException('Public profile not found');
    }

    if (!publicProfile.isActive) {
      throw new BadRequestException('This public profile is no longer active');
    }

    // Increment view count
    await this.prisma.publicProfile.update({
      where: { id: publicProfile.id },
      data: {
        viewCount: publicProfile.viewCount + 1,
      },
    });

    return publicProfile;
  }
}
