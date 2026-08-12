import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'prisma/generated/prisma/client';

import { SocialLinksRepository } from '../repositories/social/social-links.repository';

import { CreateSocialLinkInput } from './inputs/create-social-link.input';
import { RemoveSocialLinkInput } from './inputs/remove-social.input';
import { ReorderSocialLinkInput } from './inputs/reorder-social-link.input';
import { UpdateSocialLinkInput } from './inputs/update-social.input';

@Injectable()
export class SocialService {
  constructor(private readonly socialLinksRepository: SocialLinksRepository) {}

  async createSocialLink(user: User, input: CreateSocialLinkInput) {
    return await this.socialLinksRepository.createSocialLink(user.id, input);
  }

  async updateSocialLink(user: User, input: UpdateSocialLinkInput) {
    return await this.socialLinksRepository.updateSocialLink(user.id, input);
  }

  async deleteSocialLink(user: User, input: RemoveSocialLinkInput) {
    return await this.socialLinksRepository.deleteSocialLink(user.id, input.id);
  }

  async findSocialLinksByUser(user: User) {
    return await this.socialLinksRepository.findManySocialLinks(user.id);
  }

  async reorderSocialLinks(user: User, input: ReorderSocialLinkInput[]) {
    if (input.length === 0) {
      throw new BadRequestException('Список ссылок не может быть пустым');
    }

    return await this.socialLinksRepository.reorderSocialLinks(user.id, input);
  }
}
