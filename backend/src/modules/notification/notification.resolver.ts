import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import type { User } from 'prisma/generated/prisma/client';

import { Authorization } from '@/shared/decorators/auth.decorator';
import { Authorized } from '@/shared/decorators/authorized.decorator';

import { UpdateNotificationInput } from './inputs/update-notification.input';
import { NotificationModel } from './model/notification.model';
import { NotificationSettingModel } from './model/notification-seting.model';
import { NotificationService } from './notification.service';

@Authorization()
@Resolver('Notification')
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Query(() => Number, { name: 'notificationCount' })
  async notificationCount(@Authorized() user: User): Promise<ReturnType<NotificationService['getNotificationCount']>> {
    return await this.notificationService.getNotificationCount(user.id);
  }

  @Query(() => [NotificationModel], { name: 'notificationList' })
  async notificationList(@Authorized() user: User): Promise<ReturnType<NotificationService['getNotificationList']>> {
    return await this.notificationService.getNotificationList(user.id);
  }

  @Query(() => NotificationSettingModel, { name: 'notificationSetting' })
  async notificationSetting(
    @Authorized() user: User,
  ): Promise<ReturnType<NotificationService['getNotificationSetting']>> {
    return await this.notificationService.getNotificationSetting(user.id);
  }

  @Mutation(() => NotificationSettingModel, { name: 'updateNotificationSetting' })
  async updateNotificationSetting(
    @Authorized() user: User,
    @Args('input') input: UpdateNotificationInput,
  ): Promise<ReturnType<NotificationService['changeNotificationSetting']>> {
    return await this.notificationService.changeNotificationSetting(user.id, input);
  }
}
