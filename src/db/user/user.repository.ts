import { PrismaService } from '@app/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

@Injectable()
export class UserRepository {
  public constructor(private readonly prismaService: PrismaService) {}

  public async findByIdOrFail(id: number): Promise<User> {
    return this.prismaService.user.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
  }

  public async findByWhatsappOrFail(whatsapp: string): Promise<User> {
    return this.prismaService.user.findFirst({
      where: {
        whatsapp: whatsapp,
      },
    });
  }

  public async create(data: User): Promise<User> {
    return this.prismaService.user.create({
      data: {
        name: data.name,
        whatsapp: data.whatsapp,
        password: data.password,
      },
    });
  }
}
