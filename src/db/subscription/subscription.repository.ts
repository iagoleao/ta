import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Subscription } from '@prisma/client';

@Injectable()
export class SubscriptionRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findByIdOrFail(id: number): Promise<Subscription> {
    return this.prismaService.subscription.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  }

  public async findMany(): Promise<Subscription[]> {
    return this.prismaService.subscription.findMany();
  }

  public async create(
    data: Omit<
      Subscription,
      'id' | 'uuid' | 'createdAt' | 'updatedAt' | 'isActive' | 'dropReason'
    >,
  ): Promise<Subscription> {
    return this.prismaService.subscription.create({
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  public async update(
    uuid: string,
    data: Omit<
      Partial<Subscription>,
      'groupId' | 'studentId' | 'uuid' | 'createdAt'
    >,
  ): Promise<Subscription> {
    return this.prismaService.subscription.update({
      where: {
        uuid: uuid,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }
}
