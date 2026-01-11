import type { Request, Response } from 'express';
import type { User } from 'prisma/generated/prisma/client';

export interface GqlContext {
  req: Request & { user: User | null };
  res: Response;
}
