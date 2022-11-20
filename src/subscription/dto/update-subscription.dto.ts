import { SubscriptionDropReason } from '@prisma/client';
import { IsBoolean, IsEnum } from 'class-validator';

export class UpdateSubscriptionDto {
  @IsBoolean()
  isActive: boolean | undefined;

  @IsEnum(SubscriptionDropReason)
  dropReason: SubscriptionDropReason | undefined;
}
