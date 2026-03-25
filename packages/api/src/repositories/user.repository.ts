import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  Prisma,
  User,
} from '@workspace/database';

type CreateOwnerInput = {
  user: Prisma.UserCreateInput;
  organization: Prisma.OrganizationCreateInput;
};

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async find() {
    return (await this.prisma.client.user.findMany()) as User[];
  }

  /* async createOwner(data: CreateOwnerInput): Promise<void> {
    return await this.prisma.client.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: data.user,
      });

      const org = await tx.organization.create({
      data: {
        ...data.organization,
        organizationMembers: {
          create: [
            {
              user: {
                connect: { id: user.id }
              },
              role: "Owner",
            }
          ]
        }
      },
    });

      const member = await tx.organization_Member.create({
        data: {
          user_id: user.id,
          organization_id: org.id,
          role: 'Owner',
        },
      });

      const project = await tx.project.create({
        data: {
          name: 'default',
          description: 'defualt project',
          api_key: 'xa@swD',
          organization_id: org.id,
        },
      });

      const projectMember = await tx.project_Member.create({
        data: {
          organization_member_id: member.id,
          project_id: project.id,
        },
      });
    });
  } */
}
