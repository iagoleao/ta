import { AuthGuard } from '@app/auth/guard/auth.guard';
import {
  CreateSubscriptionDto,
  UpdateSubscriptionDto,
} from '@app/subscription/dto';
import { SubscriptionService } from '@app/subscription/subscription.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

@Controller('subscription')
@UseGuards(AuthGuard)
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post()
  create(@Body() data: CreateSubscriptionDto) {
    return this.subscriptionService.create(data);
  }

  @Get()
  findAll() {
    return this.subscriptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateParticipantDto: UpdateSubscriptionDto,
  ) {
    return this.subscriptionService.update(id, updateParticipantDto);
  }
}
