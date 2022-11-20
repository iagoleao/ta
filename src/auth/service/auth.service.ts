import { LoginDto } from '@app/auth/dtos/login.dto';
import { EnvService } from '@app/env/env.service';
import { UserService } from '@app/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from '../dtos/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly envService: EnvService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  public async login(data: LoginDto) {
    const user = await this.userService.findByWhatsappOrFail(data.username);

    if (!user) {
      throw new UnauthorizedException();
    }

    if (!bcrypt.compareSync(data.password, user.password)) {
      throw new UnauthorizedException();
    }

    return {
      access_token: this.jwtService.sign({
        sub: user.id,
      }),
      user: this.omit(user),
    };
  }

  public async create(data: RegisterDto) {
    // var salt = bcrypt.genSaltSync(10);
    // console.log({ salt });
    const user = await this.userService.create({
      ...data,
      password: bcrypt.hashSync(data.password, this.envService.PASSWORD_SECRET),
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return {
      accessToken: this.jwtService.sign({
        sub: user.id,
      }),
      user: this.omit(user),
    };
  }

  private omit(user: User) {
    const { password, ...userOmmited } = user;

    return userOmmited;
  }
}
