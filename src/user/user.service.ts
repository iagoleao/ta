import { UserRepository } from '@app/db/user/user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async create(data: any) {
    const user = await this.userRepository.findByWhatsappOrFail(data.whatsapp);

    if (user) {
      return false;
    }

    return this.userRepository.create(data);
  }

  public async findByWhatsappOrFail(whatsapp: string) {
    return this.userRepository.findByWhatsappOrFail(whatsapp);
  }
}
