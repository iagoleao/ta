import { BaseGuard } from '@app/auth/guard/base.guard';
import { UserRepository } from '@app/db/user/user.repository';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard extends BaseGuard {
  public constructor(
    protected readonly jwtService: JwtService,
    private readonly userRepository: UserRepository
  ) {
    super(jwtService);
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = super.getRequest(context);
    const id = super.getIdOrFail(request);
    const user = await this.userRepository.findByIdOrFail(id);
    request.user = user;
    console.log('AuthGuard');
    return true;
  }
}
