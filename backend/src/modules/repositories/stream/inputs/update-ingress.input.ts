import type { StreamModel } from 'prisma/generated/prisma/models';

export type UpdateThumbnailInput = {
  thumbnailUrl: Nullable<string>;
};

export type UpdateIngressInput = {
  ingressId: string;
  serverUrl: string;
  streamKey: string;
};

export type UpdateIngressIsLiveInput = {
  isLive: boolean;
};

export type ReturnUpdatedStreamModel = Omit<StreamModel, 'user'>;
