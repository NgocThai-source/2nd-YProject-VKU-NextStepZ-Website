import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePostDto, UpdatePostDto, CreateCommentDto } from './dto';

@Injectable()
export class CommunityService {
    constructor(private prisma: PrismaService) { }

    // ==================== POSTS ====================

    /**
     * Create a new post
     */
    async createPost(userId: string, createPostDto: CreatePostDto) {
        return this.prisma.post.create({
            data: {
                userId,
                content: createPostDto.content,
                category: createPostDto.category || 'discussion',
                topics: createPostDto.topics || [],
                hashtags: createPostDto.hashtags || [],
                images: createPostDto.images || [],
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        firstName: true,
                        lastName: true,
                        avatar: true,
                        role: true,
                        companyName: true,
                    },
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true,
                    },
                },
            },
        });
    }

    /**
     * Get all posts with pagination
     */
    async getPosts(page: number = 1, limit: number = 10, userId?: string) {
        const skip = (page - 1) * limit;

        const posts = await this.prisma.post.findMany({
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        firstName: true,
                        lastName: true,
                        avatar: true,
                        role: true,
                        companyName: true,
                    },
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true,
                    },
                },
                likes: userId ? {
                    where: { userId },
                    select: { id: true },
                } : false,
            },
        });

        const total = await this.prisma.post.count();

        // Transform posts to include isLiked flag
        const transformedPosts = posts.map(post => ({
            ...post,
            likesCount: post._count.likes,
            commentsCount: post._count.comments,
            isLiked: userId ? post.likes && post.likes.length > 0 : false,
            likes: undefined,
            _count: undefined,
        }));

        return {
            posts: transformedPosts,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    /**
     * Get single post by ID
     */
    async getPost(postId: string, userId?: string) {
        const post = await this.prisma.post.findUnique({
            where: { id: postId },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        firstName: true,
                        lastName: true,
                        avatar: true,
                        role: true,
                        companyName: true,
                    },
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true,
                    },
                },
                likes: userId ? {
                    where: { userId },
                    select: { id: true },
                } : false,
            },
        });

        if (!post) {
            throw new NotFoundException('Bài viết không tồn tại');
        }

        return {
            ...post,
            likesCount: post._count.likes,
            commentsCount: post._count.comments,
            isLiked: userId ? post.likes && post.likes.length > 0 : false,
            likes: undefined,
            _count: undefined,
        };
    }

    /**
     * Update a post
     */
    async updatePost(postId: string, userId: string, updatePostDto: UpdatePostDto) {
        const post = await this.prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            throw new NotFoundException('Bài viết không tồn tại');
        }

        if (post.userId !== userId) {
            throw new ForbiddenException('Bạn không có quyền chỉnh sửa bài viết này');
        }

        return this.prisma.post.update({
            where: { id: postId },
            data: updatePostDto,
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        firstName: true,
                        lastName: true,
                        avatar: true,
                        role: true,
                        companyName: true,
                    },
                },
            },
        });
    }

    /**
     * Delete a post
     */
    async deletePost(postId: string, userId: string) {
        const post = await this.prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            throw new NotFoundException('Bài viết không tồn tại');
        }

        if (post.userId !== userId) {
            throw new ForbiddenException('Bạn không có quyền xóa bài viết này');
        }

        await this.prisma.post.delete({
            where: { id: postId },
        });

        return { message: 'Đã xóa bài viết thành công' };
    }

    // ==================== LIKES ====================

    /**
     * Toggle like on a post
     */
    async toggleLike(postId: string, userId: string) {
        const post = await this.prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            throw new NotFoundException('Bài viết không tồn tại');
        }

        const existingLike = await this.prisma.like.findUnique({
            where: {
                postId_userId: { postId, userId },
            },
        });

        if (existingLike) {
            // Unlike
            await this.prisma.like.delete({
                where: { id: existingLike.id },
            });
            return { isLiked: false, message: 'Đã bỏ thích' };
        } else {
            // Like
            await this.prisma.like.create({
                data: { postId, userId },
            });
            return { isLiked: true, message: 'Đã thích' };
        }
    }

    /**
     * Check if user liked a post
     */
    async checkLikeStatus(postId: string, userId: string) {
        const like = await this.prisma.like.findUnique({
            where: {
                postId_userId: { postId, userId },
            },
        });
        return { isLiked: !!like };
    }

    // ==================== COMMENTS ====================

    /**
     * Get comments for a post with unlimited nesting depth
     */
    async getComments(postId: string, userId?: string) {
        // Fetch ALL comments for this post (flat list)
        const allComments = await this.prisma.comment.findMany({
            where: { postId },
            orderBy: { createdAt: 'asc' },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        firstName: true,
                        lastName: true,
                        avatar: true,
                        role: true,
                    },
                },
                _count: {
                    select: {
                        likes: true,
                        replies: true,
                    },
                },
                likes: userId ? {
                    where: { userId },
                    select: { id: true },
                } : false,
            },
        });

        // Debug logging - track all comments and their parent relationships
        console.log(`[getComments] Post ${postId}: Found ${allComments.length} total comments`);
        allComments.forEach(c => {
            console.log(`  - Comment ${c.id.substring(0, 8)}... parentId=${c.parentId ? c.parentId.substring(0, 8) + '...' : 'null'} content="${c.content.substring(0, 30)}..."`);
        });

        // Build a map of comments by ID
        const commentMap = new Map<string, any>();
        allComments.forEach(comment => {
            commentMap.set(comment.id, {
                id: comment.id,
                content: comment.content,
                createdAt: comment.createdAt,
                parentId: comment.parentId,
                author: {
                    id: comment.user.id,
                    name: `${comment.user.firstName || ''} ${comment.user.lastName || ''}`.trim() || comment.user.username,
                    avatar: comment.user.avatar,
                    role: comment.user.role,
                },
                likesCount: comment._count?.likes || 0,
                repliesCount: comment._count?.replies || 0,
                isLiked: userId ? comment.likes && (comment.likes as any[]).length > 0 : false,
                replies: [],
            });
        });

        // Build the tree structure
        const rootComments: any[] = [];
        const orphanedReplies: any[] = [];

        allComments.forEach(comment => {
            const transformedComment = commentMap.get(comment.id);
            if (comment.parentId) {
                // This is a reply - add to parent's replies array
                const parent = commentMap.get(comment.parentId);
                if (parent) {
                    parent.replies.push(transformedComment);
                } else {
                    // Parent not found - this is an orphaned reply
                    // Log for debugging and add to orphaned list
                    console.warn(`Orphaned reply found: comment ${comment.id} has parentId ${comment.parentId} but parent not found`);
                    orphanedReplies.push(transformedComment);
                }
            } else {
                // This is a top-level comment
                rootComments.push(transformedComment);
            }
        });

        // Add orphaned replies to root level so they're not lost
        // This handles edge cases where parent comments were deleted
        if (orphanedReplies.length > 0) {
            console.warn(`Found ${orphanedReplies.length} orphaned replies, adding to root level`);
            rootComments.push(...orphanedReplies);
        }

        // Sort root comments by createdAt desc, but replies are already sorted asc
        rootComments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        return rootComments;
    }

    private transformComment(comment: any, userId?: string): any {
        return {
            id: comment.id,
            content: comment.content,
            createdAt: comment.createdAt,
            author: {
                id: comment.user.id,
                name: `${comment.user.firstName || ''} ${comment.user.lastName || ''}`.trim() || comment.user.username,
                avatar: comment.user.avatar,
                role: comment.user.role,
            },
            likesCount: comment._count?.likes || 0,
            repliesCount: comment._count?.replies || 0,
            isLiked: userId ? comment.likes && comment.likes.length > 0 : false,
            replies: comment.replies?.map((reply: any) => this.transformComment(reply, userId)) || [],
        };
    }

    /**
     * Add a comment to a post
     */
    async addComment(postId: string, userId: string, createCommentDto: CreateCommentDto) {
        const post = await this.prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            throw new NotFoundException('Bài viết không tồn tại');
        }

        // If it's a reply, verify parent exists
        if (createCommentDto.parentId) {
            const parentComment = await this.prisma.comment.findUnique({
                where: { id: createCommentDto.parentId },
            });
            if (!parentComment) {
                throw new NotFoundException('Bình luận gốc không tồn tại');
            }
        }

        const comment = await this.prisma.comment.create({
            data: {
                postId,
                userId,
                content: createCommentDto.content,
                parentId: createCommentDto.parentId || null,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        firstName: true,
                        lastName: true,
                        avatar: true,
                        role: true,
                    },
                },
            },
        });

        return {
            id: comment.id,
            content: comment.content,
            createdAt: comment.createdAt,
            author: {
                id: comment.user.id,
                name: `${comment.user.firstName || ''} ${comment.user.lastName || ''}`.trim() || comment.user.username,
                avatar: comment.user.avatar,
                role: comment.user.role,
            },
            likesCount: 0,
            repliesCount: 0,
            isLiked: false,
            replies: [],
        };
    }

    /**
     * Toggle like on a comment
     */
    async toggleCommentLike(commentId: string, userId: string) {
        const comment = await this.prisma.comment.findUnique({
            where: { id: commentId },
        });

        if (!comment) {
            throw new NotFoundException('Bình luận không tồn tại');
        }

        const existingLike = await this.prisma.commentLike.findUnique({
            where: {
                commentId_userId: { commentId, userId },
            },
        });

        if (existingLike) {
            await this.prisma.commentLike.delete({
                where: { id: existingLike.id },
            });
            return { isLiked: false, message: 'Đã bỏ thích bình luận' };
        } else {
            await this.prisma.commentLike.create({
                data: { commentId, userId },
            });
            return { isLiked: true, message: 'Đã thích bình luận' };
        }
    }

    /**
     * Delete a comment
     */
    async deleteComment(commentId: string, userId: string) {
        const comment = await this.prisma.comment.findUnique({
            where: { id: commentId },
        });

        if (!comment) {
            throw new NotFoundException('Bình luận không tồn tại');
        }

        if (comment.userId !== userId) {
            throw new ForbiddenException('Bạn không có quyền xóa bình luận này');
        }

        await this.prisma.comment.delete({
            where: { id: commentId },
        });

        return { message: 'Đã xóa bình luận thành công' };
    }

    // ==================== SHARE ====================

    /**
     * Increment share count
     */
    async incrementShareCount(postId: string) {
        const post = await this.prisma.post.findUnique({
            where: { id: postId },
        });

        if (!post) {
            throw new NotFoundException('Bài viết không tồn tại');
        }

        await this.prisma.post.update({
            where: { id: postId },
            data: { shareCount: { increment: 1 } },
        });

        return { shareCount: post.shareCount + 1 };
    }

    /**
     * Get shared post (public endpoint)
     */
    async getSharedPost(postId: string) {
        const post = await this.prisma.post.findUnique({
            where: { id: postId },
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        firstName: true,
                        lastName: true,
                        avatar: true,
                        role: true,
                        companyName: true,
                    },
                },
                _count: {
                    select: {
                        likes: true,
                        comments: true,
                    },
                },
            },
        });

        if (!post) {
            throw new NotFoundException('Bài viết không tồn tại');
        }

        return {
            ...post,
            likesCount: post._count.likes,
            commentsCount: post._count.comments,
            _count: undefined,
        };
    }

    // ==================== SUGGESTIONS & LEADERBOARD ====================

    /**
     * Get random user suggestions (3 users)
     */
    async getUserSuggestions(currentUserId?: string) {
        const users = await this.prisma.user.findMany({
            where: currentUserId ? { id: { not: currentUserId } } : {},
            select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                avatar: true,
                role: true,
                companyName: true,
                _count: {
                    select: {
                        followers: true,
                        following: true,
                    },
                },
            },
            take: 20, // Get 20 users, then randomly select 3
        });

        // Shuffle and take 3
        const shuffled = users.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        return selected.map(user => ({
            id: user.id,
            name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username,
            avatar: user.avatar,
            role: user.role,
            title: user.role === 'employer' ? user.companyName : undefined,
            followers: user._count.followers,
            following: user._count.following,
        }));
    }

    /**
     * Get leaderboard data
     */
    async getLeaderboard(limit: number = 30) {
        // Get users with their post/like/follower counts
        const users = await this.prisma.user.findMany({
            select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                avatar: true,
                role: true,
                companyName: true,
                _count: {
                    select: {
                        posts: true,
                        likes: true,
                        followers: true,
                    },
                },
            },
            take: limit * 2, // Get more to calculate scores
        });

        // Calculate scores and sort
        const usersWithScores = users.map(user => {
            // Score calculation: posts * 10 + likes * 2 + followers * 5
            const score = (user._count.posts * 10) + (user._count.likes * 2) + (user._count.followers * 5);
            return {
                id: user.id,
                name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username,
                avatar: user.avatar,
                role: user.role,
                title: user.role === 'employer' ? user.companyName : undefined,
                verified: user._count.posts > 5 || user._count.followers > 10,
                score,
                posts: user._count.posts,
                likes: user._count.likes,
                followers: user._count.followers,
            };
        });

        // Sort by score descending and add rank
        usersWithScores.sort((a, b) => b.score - a.score);

        return usersWithScores.slice(0, limit).map((user, index) => ({
            rank: index + 1,
            user: {
                id: user.id,
                name: user.name,
                avatar: user.avatar,
                role: user.role,
                title: user.title,
                verified: user.verified,
                followers: user.followers,
            },
            score: user.score,
            posts: user.posts,
            likes: user.likes,
            followers: user.followers,
            streak: Math.floor(Math.random() * 30) + 1, // Placeholder for activity streak
        }));
    }
}
