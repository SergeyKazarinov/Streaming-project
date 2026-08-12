import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { SocialLink } from 'prisma/generated/prisma/client';

import { CreateSocialLinkInput } from '@/modules/social/inputs/create-social-link.input';
import { RemoveSocialLinkInput } from '@/modules/social/inputs/remove-social.input';
import { ReorderSocialLinkInput } from '@/modules/social/inputs/reorder-social-link.input';
import { UpdateSocialLinkInput } from '@/modules/social/inputs/update-social.input';

import { PrismaService } from '@/core/prisma/prisma.service';

type PrismaTransaction = Parameters<Parameters<PrismaService['$transaction']>[0]>[0];

@Injectable()
export class SocialLinksRepository {
  constructor(private readonly prismaService: PrismaService) {}

  private checkPermissions(userId: string, socialLink: SocialLink) {
    if (socialLink.userId !== userId) {
      throw new ForbiddenException('У вас нет прав на редактирование данной ссылки');
    }
  }

  private async findUniqueSocialLink(id: string, prisma?: PrismaTransaction): Promise<SocialLink> {
    const socialLink = await (prisma ?? this.prismaService).socialLink.findUnique({
      where: {
        id,
      },
    });

    if (!socialLink) {
      throw new NotFoundException('Социальная ссылка не найдена');
    }

    return socialLink;
  }

  async createSocialLink(userId: string, input: CreateSocialLinkInput): Promise<SocialLink> {
    const lastSocialLink = await this.prismaService.socialLink.findFirst({
      where: {
        userId,
      },
      orderBy: {
        order: 'desc',
      },
    });

    const order = lastSocialLink ? lastSocialLink.order + 1 : 1;

    const newSocialLink = await this.prismaService.socialLink.create({
      data: {
        ...input,
        order,
        userId,
      },
      include: {
        user: true,
      },
    });

    return newSocialLink;
  }

  async updateSocialLink(
    userId: string,
    input: UpdateSocialLinkInput,
    prisma?: PrismaTransaction,
  ): Promise<SocialLink> {
    const { id, ...data } = input;

    const socialLink = await this.findUniqueSocialLink(id, prisma);

    this.checkPermissions(userId, socialLink);

    const updatedSocialLink = await (prisma ?? this.prismaService).socialLink.update({
      where: {
        id,
      },
      data,
    });

    return updatedSocialLink;
  }

  async deleteSocialLink(userId: string, id: RemoveSocialLinkInput['id']): Promise<boolean> {
    const socialLink = await this.findUniqueSocialLink(id);

    this.checkPermissions(userId, socialLink);

    await this.prismaService.socialLink.delete({
      where: {
        id,
      },
    });

    return true;
  }

  async findManySocialLinks(userId: string): Promise<SocialLink[]> {
    return await this.prismaService.socialLink.findMany({
      where: {
        userId,
      },
      orderBy: {
        order: 'asc',
      },
    });
  }

  async reorderSocialLinks(userId: string, input: ReorderSocialLinkInput[]): Promise<SocialLink[]> {
    const updatedSocialLinks = await this.prismaService.$transaction<SocialLink[]>(async (prisma) => {
      const links: SocialLink[] = [];
      for (const socialLinkInput of input) {
        const updatedSocialLink = await this.updateSocialLink(userId, socialLinkInput, prisma);

        links.push(updatedSocialLink);
      }

      return links;
    });

    return updatedSocialLinks;
  }
}
