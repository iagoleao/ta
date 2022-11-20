import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class BaseGuard implements CanActivate {
  public constructor(protected readonly jwtService: JwtService) {}

  public getRequest(context: ExecutionContext): any {
    const restRequest = context.switchToHttp().getRequest();
    const request = restRequest;
    return request;
  }

  private parseAccessTokenFromCookie(request: any): string | undefined {
    try {
      const cookie = request.cookies['auth'];
      const jwt = JSON.parse(cookie);
      const accessToken = jwt.accessToken;
      return accessToken;
    } catch (e) {
      return undefined;
    }
  }

  private parseAccessTokenFromHeader(request: any): string | undefined {
    try {
      const header = request.headers.authorization as string | undefined;
      if (header) {
        const accessToken = header.split(' ')[1];
        return accessToken;
      }
      return undefined;
    } catch (e) {
      return undefined;
    }
  }

  private getAccessTokenOrFail(request: any): string {
    const accessToken =
      this.parseAccessTokenFromHeader(request) ||
      this.parseAccessTokenFromCookie(request);
    if (!accessToken) {
      throw new BadRequestException('Authorization not found');
    }
    return accessToken;
  }

  private parseIdOrFail(accessToken: string): number {
    try {
      this.jwtService.verify(accessToken);
      const payload = this.jwtService.decode(accessToken) as { sub: number };
      const id = payload.sub;
      return id;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  public getIdOrFail(request: any): number {
    const accessToken = this.getAccessTokenOrFail(request);
    const id = this.parseIdOrFail(accessToken);
    return id;
  }

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    return !!context;
  }
}
