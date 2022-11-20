import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Subject } from '@prisma/client';

@Injectable()
export class SubjectRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findByIdOrFail(id: number): Promise<Subject> {
    return this.prismaService.subject.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  }

  public async findMany(): Promise<Subject[]> {
    return this.prismaService.subject.findMany();
  }

  public async create(
    data: Omit<
      Subject,
      'id' | 'uuid' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'verifiedAt'
    >,
  ): Promise<Subject> {
    return this.prismaService.subject.create({
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  public async update(
    id: number,
    data: Omit<
      Partial<Subject>,
      'groupId' | 'id' | 'uuid' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >,
  ): Promise<Subject> {
    return this.prismaService.subject.update({
      where: {
        id: id,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  public async delete(id: number): Promise<Subject> {
    return this.prismaService.subject.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
