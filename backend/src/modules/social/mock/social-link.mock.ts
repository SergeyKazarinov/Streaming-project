import { userMock } from '@/shared/test/mock/user.mock';

import type { CreateSocialLinkInput } from '../inputs/create-social-link.input';
import type { RemoveSocialLinkInput } from '../inputs/remove-social.input';
import type { ReorderSocialLinkInput } from '../inputs/reorder-social-link.input';
import type { UpdateSocialLinkInput } from '../inputs/update-social.input';

export const createSocialLinkInputMock: CreateSocialLinkInput = {
  title: 'Facebook',
  url: 'https://www.facebook.com',
};

export const createdSocialLinkMock = {
  id: 'link-1',
  title: createSocialLinkInputMock.title,
  url: createSocialLinkInputMock.url,
  order: 1,
  userId: userMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const updateSocialLinkInputMock: UpdateSocialLinkInput = {
  id: 'link-1',
  title: 'Facebook Updated',
  url: 'https://www.facebook.com/updated',
};

export const updatedSocialLinkMock = {
  id: updateSocialLinkInputMock.id,
  title: updateSocialLinkInputMock.title,
  url: updateSocialLinkInputMock.url,
  order: 1,
  userId: userMock.id,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const removeSocialLinkInputMock: RemoveSocialLinkInput = {
  id: 'link-1',
};

export const reorderSocialLinksInputMock: ReorderSocialLinkInput[] = [
  { id: 'link-1', order: 2 },
  { id: 'link-2', order: 1 },
];

export const reorderedSocialLinksMock = [
  {
    id: 'link-1',
    order: 2,
    title: 'A',
    url: 'https://a.com',
    userId: userMock.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 'link-2',
    order: 1,
    title: 'B',
    url: 'https://b.com',
    userId: userMock.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
