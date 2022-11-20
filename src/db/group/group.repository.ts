import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Group } from '@prisma/client';

@Injectable()
export class GroupRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findByIdOrFail(id: number): Promise<Group> {
    return this.prismaService.group.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  }

  public async findByUUIDOrFail(uuid: string): Promise<Group> {
    return this.prismaService.group.findUniqueOrThrow({
      where: {
        uuid: uuid,
      },
    });
  }

  public async findById(id: number): Promise<Group> {
    return this.prismaService.group.findUnique({
      where: {
        id: id,
      },
    });
  }

  public async findMany(): Promise<Group[]> {
    return this.prismaService.group.findMany();
  }

  public async create(
    data: Omit<Group, 'id' | 'uuid' | 'createdAt' | 'updatedAt' | 'deletedAt'>,
  ): Promise<Group> {
    return this.prismaService.group.create({
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  public async update(
    id: number,
    data: Omit<
      Partial<Group>,
      'id' | 'uuid' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >,
  ): Promise<Group> {
    return this.prismaService.group.update({
      where: {
        id: id,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  public async delete(id: number): Promise<Group> {
    return this.prismaService.group.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
