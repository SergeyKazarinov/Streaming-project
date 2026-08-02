import { Injectable } from '@nestjs/common';
import { NotificationType, TokenType } from 'prisma/generated/prisma/enums';

import { generateToken } from '@/shared/lib/generate-token.util';

import type { SecureUserModel } from '../auth/account/models/user.model';
import { NotificationRepository } from '../repositories/notification/notification.repository';
import type { StreamModel } from '../stream/model/stream.model';

import { UpdateNotificationInput } from './inputs/update-notification.input';
import type { UpdatedNotificationSettingModel } from './model/updated-notification-setting.model';

@Injectable()
export class NotificationService {
  constructor(private readonly notificationRepository: NotificationRepository) {}

  async getNotificationSetting(userId: string): Promise<ReturnType<NotificationRepository['getNotificationSetting']>> {
    return await this.notificationRepository.getNotificationSetting(userId);
  }

  async changeNotificationSetting(
    userId: string,
    input: UpdateNotificationInput,
  ): Promise<UpdatedNotificationSettingModel> {
    const updatedNotificationSetting = await this.notificationRepository.changeNotificationSetting(userId, input);

    let token: Nullable<string> = null;
    if (updatedNotificationSetting.telegramNotificationEnabled) {
      const generatedToken = await generateToken({
        user: updatedNotificationSetting.user,
        type: TokenType.TELEGRAM_VERIFY,
      });
      token = generatedToken.token;
    }
    return {
      updated: true,
      telegramToken: token,
    };
  }

  async getNotificationCount(userId: string): Promise<ReturnType<NotificationRepository['getNotificationCount']>> {
    return await this.notificationRepository.getNotificationCount(userId);
  }

  async getNotificationList(userId: string): Promise<ReturnType<NotificationRepository['getNotificationList']>> {
    const notificationList = await this.notificationRepository.getNotificationList(userId);

    await this.notificationRepository.updateIsReadNotificationByUserId(userId);

    return notificationList;
  }

  async createStreamNotification(
    userId: string,
    stream: Pick<StreamModel, 'title'> & { user: Pick<SecureUserModel, 'username'> },
  ): Promise<ReturnType<NotificationRepository['createNotification']>> {
    return await this.notificationRepository.createNotification(
      userId,
      NotificationType.STREAM_START,
      `Начался стрим на канале ${stream.user.username}: ${stream.title}`,
    );
  }

  async createFollowNotification(
    followingId: string,
    follower: SecureUserModel,
  ): Promise<ReturnType<NotificationRepository['createNotification']>> {
    return await this.notificationRepository.createNotification(
      followingId,
      NotificationType.NEW_FOLLOWER,
      `У вас новый подписчик: ${follower.username}`,
    );
  }

  async createTotpNotification(userId: string): Promise<ReturnType<NotificationRepository['createNotification']>> {
    return await this.notificationRepository.createNotification(
      userId,
      NotificationType.ENABLE_TWO_FACTOR,
      'Вы включили двухфакторную аутентификацию',
    );
  }
}
