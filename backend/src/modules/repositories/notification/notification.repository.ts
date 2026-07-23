import { Injectable } from '@nestjs/common';
import type { NotificationSetting, NotificationType } from 'prisma/generated/prisma/client';
import type { BatchPayload } from 'prisma/generated/prisma/internal/prismaNamespace';
import type { NotificationModel } from 'prisma/generated/prisma/models';

import type { UpdateNotificationInput } from '@/modules/notification/inputs/update-notification.input';

import { PrismaService } from '@/core/prisma/prisma.service';

@Injectable()
export class NotificationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getNotificationSetting(userId: string): Promise<Nullable<NotificationSetting>> {
    return await this.prismaService.notificationSetting.findUnique({
      where: { userId },
    });
  }

  async changeNotificationSetting(userId: string, input: UpdateNotificationInput): Promise<NotificationSetting> {
    const { siteNotificationEnabled } = input;

    return await this.prismaService.notificationSetting.upsert({
      where: { userId },
      create: {
        userId,
        siteNotificationEnabled: siteNotificationEnabled,
      },
      update: {
        siteNotificationEnabled: siteNotificationEnabled,
      },
      include: {
        user: true,
      },
    });
  }

  async getNotificationCount(userId: string): Promise<number> {
    return await this.prismaService.notification.count({
      where: { userId, isRead: false },
    });
  }

  async getNotificationList(userId: string): Promise<NotificationModel[]> {
    return await this.prismaService.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateIsReadNotificationByUserId(userId: string): Promise<BatchPayload> {
    return await this.prismaService.notification.updateMany({
      where: { userId },
      data: { isRead: true },
    });
  }

  async createNotification(userId: string, type: NotificationType, text: string): Promise<NotificationModel> {
    const notification = await this.prismaService.notification.create({
      data: {
        userId,
        type,
        text,
      },
    });

    return notification;
  }
}
