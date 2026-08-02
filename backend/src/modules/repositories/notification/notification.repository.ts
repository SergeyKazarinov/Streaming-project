import { Injectable } from '@nestjs/common';
import type { NotificationType } from 'prisma/generated/prisma/client';

import type { UpdateNotificationInput } from '@/modules/notification/inputs/update-notification.input';

import { PrismaService } from '@/core/prisma/prisma.service';

@Injectable()
export class NotificationRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async getNotificationSetting(userId: string) {
    return await this.prismaService.notificationSetting.findUnique({
      where: { userId },
    });
  }

  async changeNotificationSetting(userId: string, input: UpdateNotificationInput) {
    return await this.prismaService.notificationSetting.upsert({
      where: { userId },
      create: {
        userId,
        ...input,
      },
      update: {
        ...input,
      },
      include: {
        user: true,
      },
    });
  }

  async getNotificationCount(userId: string) {
    return await this.prismaService.notification.count({
      where: { userId, isRead: false },
    });
  }

  async getNotificationList(userId: string) {
    return await this.prismaService.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async updateIsReadNotificationByUserId(userId: string) {
    return await this.prismaService.notification.updateMany({
      where: { userId },
      data: { isRead: true },
    });
  }

  async createNotification(userId: string, type: NotificationType, text: string) {
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
