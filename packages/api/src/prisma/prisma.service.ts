import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { prisma, ExtendedPrismaClient } from '@workspace/database';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  public readonly client: ExtendedPrismaClient;

  constructor() {
    this.client = prisma;
  }

  onModuleInit() {
    console.log('Prisma Client ready (with Accelerate)');
    /* this.seed(); */
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
  }
}
