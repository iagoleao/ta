import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Student } from '@prisma/client';

@Injectable()
export class StudentRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findByIdOrFail(id: number): Promise<Student> {
    return this.prismaService.student.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  }

  public async findByUUIDOrFail(uuid: string): Promise<Student> {
    return this.prismaService.student.findUniqueOrThrow({
      where: {
        uuid: uuid,
      },
    });
  }

  public async findByWhatsappOrFail(whatsapp: string): Promise<Student> {
    return this.prismaService.student.findFirst({
      where: {
        whatsapp: whatsapp,
      },
    });
  }

  public async findManyByGroupId(groupId: number): Promise<Student[]> {
    return this.prismaService.student.findMany({
      where: {
        subscriptions: {
          some: {
            groupId: groupId,
          },
        },
      },
    });
  }

  public async findMany(): Promise<Student[]> {
    return this.prismaService.student.findMany();
  }

  public async create(
    data: Omit<
      Student,
      'id' | 'uuid' | 'createdAt' | 'updatedAt' | 'deletedAt' | 'verifiedAt'
    >,
  ): Promise<Student> {
    return this.prismaService.student.create({
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  public async update(
    id: number,
    data: Omit<
      Partial<Student>,
      'groupId' | 'id' | 'uuid' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >,
  ): Promise<Student> {
    return this.prismaService.student.update({
      where: {
        id: id,
      },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    });
  }

  public async delete(id: number): Promise<Student> {
    return this.prismaService.student.update({
      where: {
        id: id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
