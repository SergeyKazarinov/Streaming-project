import { BadRequestException, Logger } from '@nestjs/common';

import { hashPassword } from '../../shared/lib/hash-password.util';
import { prisma } from '../../shared/lib/prisma';

import { CATEGORIES } from './category.entries';
import { STREAMS_TITLE } from './stream.entries';
import { USERNAMES } from './user.entries';

async function main() {
  try {
    Logger.log('Заполнение базы данных');
    await prisma.$transaction([
      prisma.user.deleteMany(),
      prisma.socialLink.deleteMany(),
      prisma.stream.deleteMany(),
      prisma.category.deleteMany(),
    ]);

    await prisma.category.createMany({
      data: CATEGORIES,
    });

    Logger.log('Категории заполнены');

    const categoriesBySlug = Object.groupBy(CATEGORIES, ({ slug }) => slug);
    await prisma.$transaction(async (tx) => {
      for (const username of USERNAMES) {
        const keysOfSlug = Object.keys(categoriesBySlug);
        const randomCategory = categoriesBySlug[keysOfSlug[Math.floor(Math.random() * keysOfSlug.length)]];

        const userExists = await tx.user.findUnique({
          where: {
            username,
          },
        });

        if (!userExists) {
          const createdUser = await tx.user.create({
            data: {
              username,
              displayName: username,
              avatar: `/channels/${username}.webp`,
              email: `${username}@example.com`,
              password: await hashPassword('12345678'),
              isEmailVerified: true,
              socialLinks: {
                createMany: {
                  data: [
                    {
                      title: 'Telegram',
                      url: `https://t.me/${username}`,
                      order: 1,
                    },
                    {
                      title: 'YouTube',
                      url: `https://www.youtube.com/${username}`,
                      order: 2,
                    },
                  ],
                },
              },
            },
          });

          const randomTitles = STREAMS_TITLE[randomCategory![0].slug];
          const randomTitle = randomTitles[Math.floor(Math.random() * randomTitles.length)];

          const category = await tx.category.findUnique({
            where: {
              slug: randomCategory![0].slug,
            },
          });

          await tx.stream.create({
            data: {
              title: randomTitle,
              thumbnailUrl: `/streams/${createdUser.username}.webp`,
              user: {
                connect: {
                  id: createdUser.id,
                },
              },
              category: {
                connect: {
                  id: category!.id,
                },
              },
            },
          });

          Logger.log(`Пользователь ${createdUser.username} создан`);
        }
      }
    });

    Logger.log('Заполнение базы данных завершено');
  } catch (error) {
    Logger.error(error);
    throw new BadRequestException('Ошибка при заполнении базы данных');
  } finally {
    Logger.log('Отключение от базы данных');
    await prisma.$disconnect();
    Logger.log('Заполнение базы данных завершено');
  }
}

main();
