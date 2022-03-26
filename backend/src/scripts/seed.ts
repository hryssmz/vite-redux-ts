// scripts/seed.ts
import { faker } from "@faker-js/faker";
import { nanoid } from "nanoid";

import prisma from "../util/prisma";

export const NUM_USERS = 3;
export const POSTS_PER_USER = 2;
export const RECENT_NOTIFICATIONS_DAYS = 7;

export async function seed() {
  await prisma.comment.deleteMany();
  await prisma.reaction.deleteMany();
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  for (let i = 0; i < NUM_USERS; i++) {
    const author = await prisma.user.create({
      data: {
        id: nanoid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
      },
    });

    for (let j = 0; j < POSTS_PER_USER; j++) {
      await prisma.post.create({
        data: {
          id: nanoid(),
          title: faker.lorem.words(),
          content: faker.lorem.paragraphs(),
          date: faker.date.recent(RECENT_NOTIFICATIONS_DAYS).toISOString(),
          userId: author.id,
          reactions: { create: {} },
        },
      });
    }
  }
}

seed();
