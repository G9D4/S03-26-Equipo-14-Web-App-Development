import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { prisma, ExtendedPrismaClient, PrismaClient } from '@workspace/database';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  public readonly client: PrismaClient;

  constructor() {
    this.client = prisma as unknown as PrismaClient;
  }

  onModuleInit() {
    console.log('Prisma Client ready (with Accelerate)');
    /* this.seed(); */
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}
