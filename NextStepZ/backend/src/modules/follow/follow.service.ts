import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class FollowService {
    constructor(private prisma: PrismaService) { }

    /**
     * Follow a user
     * @param followerId - The user who wants to follow
     * @param followingId - The user to be followed
     */
    async followUser(followerId: string, followingId: string) {
        // Prevent self-following
        if (followerId === followingId) {
            throw new BadRequestException('Không thể tự theo dõi chính mình');
        }

        // Check if target user exists
        const targetUser = await this.prisma.user.findUnique({
            where: { id: followingId },
        });

        if (!targetUser) {
            throw new NotFoundException('Người dùng không tồn tại');
        }

        // Check if already following
        const existingFollow = await this.prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId,
                },
            },
        });

        if (existingFollow) {
            throw new BadRequestException('Bạn đã theo dõi người dùng này rồi');
        }

        // Create follow relationship
        return this.prisma.follow.create({
            data: {
                followerId,
                followingId,
            },
        });
    }

    /**
     * Unfollow a user
     * @param followerId - The user who wants to unfollow
     * @param followingId - The user to be unfollowed
     */
    async unfollowUser(followerId: string, followingId: string) {
        // Check if follow relationship exists
        const existingFollow = await this.prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId,
                },
            },
        });

        if (!existingFollow) {
            throw new BadRequestException('Bạn chưa theo dõi người dùng này');
        }

        // Delete follow relationship
        return this.prisma.follow.delete({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId,
                },
            },
        });
    }

    /**
     * Check if a user is following another user
     * @param followerId - The potential follower
     * @param followingId - The user being checked
     */
    async isFollowing(followerId: string, followingId: string): Promise<boolean> {
        const follow = await this.prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId,
                    followingId,
                },
            },
        });

        return !!follow;
    }

    /**
     * Get follower count for a user
     * @param userId - The user to get follower count for
     */
    async getFollowerCount(userId: string): Promise<number> {
        return this.prisma.follow.count({
            where: {
                followingId: userId,
            },
        });
    }

    /**
     * Get following count for a user (users that this user follows)
     * @param userId - The user to get following count for
     */
    async getFollowingCount(userId: string): Promise<number> {
        return this.prisma.follow.count({
            where: {
                followerId: userId,
            },
        });
    }
}
