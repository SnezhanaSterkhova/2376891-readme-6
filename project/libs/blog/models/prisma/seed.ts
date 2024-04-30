import { PrismaClient } from '@prisma/client';

const FIRST_POST_UUID = '6d308040-06a2-4162-bea6-2398e9976540';
const SECOND_POST_UUID = '6g308045-98a2-4162-iea6-2338e9906540';

const FIRST_USER_ID = '658170cbb974e9f5b946pcf4';
const SECOND_USER_ID = '6841762309c030b503e37622';

function getPosts() {
  return [
    {
      id: FIRST_POST_UUID,
      originalId: FIRST_POST_UUID,
      tags: ['#aggd', '#oooo'],
      userId: FIRST_USER_ID,
      originalUserId: FIRST_USER_ID,
      isRepost: false,
    },
    {
      id: SECOND_POST_UUID,
      originalId: SECOND_POST_UUID,
      tags: ['#affd', '#ordfd'],
      userId: SECOND_USER_ID,
      originalUserId: SECOND_USER_ID,
      isRepost: false,
      comments: [
        {
          text: 'Это действительно отличная книга!',
          userId: FIRST_USER_ID,
        },
        {
          text: 'Надо будет обязательно перечитать. Слишком много информации.',
          userId: SECOND_USER_ID,
        }
      ],
      likes: [
        { userId: FIRST_USER_ID },
        { userId: SECOND_USER_ID },
      ],
    }
  ]
}

async function seedDb(prismaClient: PrismaClient) {
  const mockPosts = getPosts();

  for (const post of mockPosts) {
    await prismaClient.post.upsert({
      where: { id: post.id },
      update: {},
      create: {
        id: post.id,
        originalId: post.originalId,
        tags: post.tags,
        userId: post.userId,
        originalUserId: post.originalUserId,
        isRepost: post.isRepost,
        comments: post.comments ? {
          create: post.comments
        } : undefined,
        // likes: post.likes ? {
        //   create: post.likes
        // } : undefined,
      }
    })
  }
  console.info('🤘️ Database was filled');
}

async function bootstrap() {
  const prismaClient = new PrismaClient();

  try {
    await seedDb(prismaClient);
    globalThis.process.exit(0);
  } catch (error: unknown) {
    console.error(error);
    globalThis.process.exit(1);
  } finally {
    await prismaClient.$disconnect();
  }
}

bootstrap();
