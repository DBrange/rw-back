import { Controller, Get, Post } from '@nestjs/common';
import { SubscriptionService } from '../services/subscription.service';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('')
  public async createSubscription() {
    return await this.subscriptionService.createSubscripion()
  }
}
