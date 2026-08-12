import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { GqlAuthGuard } from '@/shared/guards/gql-auth.guard';
import { userMock } from '@/shared/test/mock/user.mock';

import {
  createdSocialLinkMock,
  createSocialLinkInputMock,
  removeSocialLinkInputMock,
  reorderedSocialLinksMock,
  reorderSocialLinksInputMock,
  updatedSocialLinkMock,
  updateSocialLinkInputMock,
} from './mock/social-link.mock';
import { SocialResolver } from './social.resolver';
import { SocialService } from './social.service';

describe('SocialResolver', () => {
  let resolver: SocialResolver;
  let createSocialLinkMock: jest.Mock;
  let updateSocialLinkMock: jest.Mock;
  let deleteSocialLinkMock: jest.Mock;
  let findSocialLinksByUserMock: jest.Mock;
  let reorderSocialLinksMock: jest.Mock;

  beforeEach(async () => {
    createSocialLinkMock = jest.fn().mockResolvedValue(createdSocialLinkMock);
    updateSocialLinkMock = jest.fn().mockResolvedValue(updatedSocialLinkMock);
    deleteSocialLinkMock = jest.fn().mockResolvedValue(true);
    findSocialLinksByUserMock = jest.fn().mockResolvedValue([createdSocialLinkMock]);
    reorderSocialLinksMock = jest.fn().mockResolvedValue(reorderedSocialLinksMock);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SocialResolver,
        {
          provide: SocialService,
          useValue: {
            createSocialLink: createSocialLinkMock,
            updateSocialLink: updateSocialLinkMock,
            deleteSocialLink: deleteSocialLinkMock,
            findSocialLinksByUser: findSocialLinksByUserMock,
            reorderSocialLinks: reorderSocialLinksMock,
          },
        },
      ],
    })
      .overrideGuard(GqlAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    resolver = module.get<SocialResolver>(SocialResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createSocialLink', () => {
    it('должен вызвать сервис с user и data и вернуть созданную ссылку', async () => {
      const result = await resolver.createSocialLink(userMock, createSocialLinkInputMock);

      expect(result).toEqual(createdSocialLinkMock);
      expect(createSocialLinkMock).toHaveBeenCalledTimes(1);
      expect(createSocialLinkMock).toHaveBeenCalledWith(userMock, createSocialLinkInputMock);
    });
  });

  describe('updateSocialLink', () => {
    it('должен вызвать сервис с user и data и вернуть обновлённую ссылку', async () => {
      const result = await resolver.updateSocialLink(userMock, updateSocialLinkInputMock);

      expect(result).toEqual(updatedSocialLinkMock);
      expect(updateSocialLinkMock).toHaveBeenCalledTimes(1);
      expect(updateSocialLinkMock).toHaveBeenCalledWith(userMock, updateSocialLinkInputMock);
    });
  });

  describe('removeSocialLink', () => {
    it('должен вызвать сервис с user и data и вернуть true', async () => {
      const result = await resolver.removeSocialLink(userMock, removeSocialLinkInputMock);

      expect(result).toBe(true);
      expect(deleteSocialLinkMock).toHaveBeenCalledTimes(1);
      expect(deleteSocialLinkMock).toHaveBeenCalledWith(userMock, removeSocialLinkInputMock);
    });
  });

  describe('findSocialLinksByUser', () => {
    it('должен вызвать сервис с user и вернуть массив ссылок', async () => {
      const result = await resolver.findSocialLinksByUser(userMock);

      expect(result).toEqual([createdSocialLinkMock]);
      expect(findSocialLinksByUserMock).toHaveBeenCalledTimes(1);
      expect(findSocialLinksByUserMock).toHaveBeenCalledWith(userMock);
    });
  });

  describe('reorderSocialLinks', () => {
    it('должен вызвать сервис с user и массивом и вернуть обновлённые ссылки', async () => {
      const result = await resolver.reorderSocialLinks(userMock, reorderSocialLinksInputMock);

      expect(result).toEqual(reorderedSocialLinksMock);
      expect(reorderSocialLinksMock).toHaveBeenCalledTimes(1);
      expect(reorderSocialLinksMock).toHaveBeenCalledWith(userMock, reorderSocialLinksInputMock);
    });
  });
});
