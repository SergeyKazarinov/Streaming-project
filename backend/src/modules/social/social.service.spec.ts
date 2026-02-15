import { BadRequestException } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { userMock } from '@/shared/test/mock/user.mock';

import { SocialLinksRepository } from '../repositories/social/social-links.repository';

import {
  createdSocialLinkMock,
  createSocialLinkInputMock,
  removeSocialLinkInputMock,
  reorderedSocialLinksMock,
  reorderSocialLinksInputMock,
  updatedSocialLinkMock,
  updateSocialLinkInputMock,
} from './mock/social-link.mock';
import { SocialService } from './social.service';

describe('SocialService', () => {
  let service: SocialService;
  let createSocialLinkMock: jest.Mock;
  let updateSocialLinkMock: jest.Mock;
  let deleteSocialLinkMock: jest.Mock;
  let findManySocialLinksMock: jest.Mock;
  let reorderSocialLinksMock: jest.Mock;

  beforeEach(async () => {
    createSocialLinkMock = jest.fn().mockResolvedValue(createdSocialLinkMock);
    updateSocialLinkMock = jest.fn().mockResolvedValue(updatedSocialLinkMock);
    deleteSocialLinkMock = jest.fn().mockResolvedValue(true);
    findManySocialLinksMock = jest.fn().mockResolvedValue([createdSocialLinkMock]);
    reorderSocialLinksMock = jest.fn().mockResolvedValue(reorderedSocialLinksMock);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SocialService,
        {
          provide: SocialLinksRepository,
          useValue: {
            createSocialLink: createSocialLinkMock,
            updateSocialLink: updateSocialLinkMock,
            deleteSocialLink: deleteSocialLinkMock,
            findManySocialLinks: findManySocialLinksMock,
            reorderSocialLinks: reorderSocialLinksMock,
          },
        },
      ],
    }).compile();

    service = module.get<SocialService>(SocialService);
  });

  describe('createSocialLink', () => {
    it('должен вызвать репозиторий с user.id и инпутом и вернуть созданную ссылку', async () => {
      const result = await service.createSocialLink(userMock, createSocialLinkInputMock);

      expect(result).toEqual(createdSocialLinkMock);
      expect(createSocialLinkMock).toHaveBeenCalledTimes(1);
      expect(createSocialLinkMock).toHaveBeenCalledWith(userMock.id, createSocialLinkInputMock);
    });
  });

  describe('updateSocialLink', () => {
    it('должен вызвать репозиторий с user.id и инпутом и вернуть обновлённую ссылку', async () => {
      const result = await service.updateSocialLink(userMock, updateSocialLinkInputMock);

      expect(result).toEqual(updatedSocialLinkMock);
      expect(updateSocialLinkMock).toHaveBeenCalledTimes(1);
      expect(updateSocialLinkMock).toHaveBeenCalledWith(userMock.id, updateSocialLinkInputMock);
    });
  });

  describe('deleteSocialLink', () => {
    it('должен вызвать репозиторий с user.id и id ссылки и вернуть true', async () => {
      const result = await service.deleteSocialLink(userMock, removeSocialLinkInputMock);

      expect(result).toBeTruthy();
      expect(deleteSocialLinkMock).toHaveBeenCalledTimes(1);
      expect(deleteSocialLinkMock).toHaveBeenCalledWith(userMock.id, removeSocialLinkInputMock.id);
    });
  });

  describe('findSocialLinksByUser', () => {
    it('должен вызвать репозиторий с user.id и вернуть массив ссылок', async () => {
      const result = await service.findSocialLinksByUser(userMock);

      expect(result).toEqual([createdSocialLinkMock]);
      expect(findManySocialLinksMock).toHaveBeenCalledTimes(1);
      expect(findManySocialLinksMock).toHaveBeenCalledWith(userMock.id);
    });
  });

  describe('reorderSocialLinks', () => {
    it('должен выбросить BadRequestException, если передан пустой массив', async () => {
      await expect(service.reorderSocialLinks(userMock, [])).rejects.toThrow(BadRequestException);
      await expect(service.reorderSocialLinks(userMock, [])).rejects.toThrow('Список ссылок не может быть пустым');
      expect(reorderSocialLinksMock).not.toHaveBeenCalled();
    });

    it('должен вызвать репозиторий с user.id и массивом и вернуть обновлённые ссылки', async () => {
      const result = await service.reorderSocialLinks(userMock, reorderSocialLinksInputMock);

      expect(result).toEqual(reorderedSocialLinksMock);
      expect(reorderSocialLinksMock).toHaveBeenCalledTimes(1);
      expect(reorderSocialLinksMock).toHaveBeenCalledWith(userMock.id, reorderSocialLinksInputMock);
    });
  });
});
