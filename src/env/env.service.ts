import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EnvService {
  public constructor(private readonly configService: ConfigService) {}

  public get NODE_ENV() {
    return this.configService.get<'localhost' | 'development' | 'production'>(
      'NODE_ENV'
    ) as string;
  }

  public get DNS() {
    return this.configService.get<string>('DNS') as string;
  }

  public get PORT() {
    return this.configService.get<number>('PORT') as number;
  }

  public get JWT_SECRET() {
    return this.configService.get<string>('JWT_SECRET') as string;
  }

  public get PASSWORD_SECRET() {
    return this.configService.get<string>('PASSWORD_SECRET') as string;
  }

  public get SQS_QUEUE_ENDPOINT() {
    return this.configService.get<string>('SQS_QUEUE_ENDPOINT') as string;
  }

  public get SQS_REGION() {
    return this.configService.get<string>('SQS_REGION') as string;
  }

  public get SQS_ACCESS_KEY_ID() {
    return this.configService.get<string>('SQS_ACCESS_KEY_ID') as string;
  }

  public get SQS_SECRET_ACCESS_KEY() {
    return this.configService.get<string>('SQS_SECRET_ACCESS_KEY') as string;
  }
}
