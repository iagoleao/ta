import { DbModule } from '@app/db/db.module';
import { SubscriptionController } from '@app/subscription/subscription.controller';
import { SubscriptionService } from '@app/subscription/subscription.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [DbModule],
  controllers: [SubscriptionController],
  providers: [SubscriptionService],
})
export class SubscriptionModule {}
