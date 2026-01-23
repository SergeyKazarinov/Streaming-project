import type { User } from 'prisma/generated/prisma/client';

export const secureUser = (user: User): Omit<User, 'password'> => {
  const { password: _, ...secureUser } = user;
  return secureUser;
};
