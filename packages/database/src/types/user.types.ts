import { Prisma } from "@prisma/client";

export type UserWithOrgs = Prisma.UserGetPayload<{
    include: {
        organizationMembers: {
            include: {
                organization: true
            }
        }
    }
}>