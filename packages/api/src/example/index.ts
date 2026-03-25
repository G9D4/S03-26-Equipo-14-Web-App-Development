/* import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User, Post, Comment } from '@workspace/database';

//pure types
type CreatePostWithCommentInput = {
  user: Prisma.UserCreateInput;
  post: Prisma.PostCreateWithoutAuthorInput;
  comment: Prisma.CommentCreateWithoutPostInput;
};

//pure types
type CreatePostWithCommentResult = {
  user: User;
  post: Post;
  comment: Comment;
};

@Injectable()
export class ExampleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async simpleFind() {}

  async simplePost() {}

  async createPostWithComment(
    data: CreatePostWithCommentInput,
  ): Promise<CreatePostWithCommentResult> {
    //transaction
    return this.prisma.client.$transaction(async (tx) => {
      //subquery
      const user = await tx.user.create({
        data: data.user,
      });
      //subquery
      const post = await tx.post.create({
        data: {
          ...data.post,
          author: { connect: { id: user.id } },
        },
      });
      //subquery
      const comment = await tx.comment.create({
        data: {
          ...data.comment,
          post: { connect: { id: post.id } },
        },
      });

      return { user, post, comment };
    });
  }
}
 */