// routes/fake.ts
import { Router } from "express";
import { nanoid } from "nanoid";

import prisma from "../util/prisma";

const artificialDelayMs = 2000;

const router = Router();

router.use(async (req, res, next) => {
  await new Promise(resolve => setTimeout(resolve, artificialDelayMs));
  return next();
});

router.get("/posts", async (req, res) => {
  const posts = await prisma.post.findMany({ include: { reactions: true } });
  const data: Client.Post[] = posts.map(
    ({ id, title, content, date, userId, reactions }) => ({
      id,
      title,
      content,
      date,
      user: userId,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      reactions: reactions!,
    })
  );

  return res.json(data);
});

router.post("/posts", async (req, res) => {
  const body: Client.InitialPost = req.body;
  const post = await prisma.post.create({
    data: {
      id: nanoid(),
      title: body.title,
      content: body.content,
      date: new Date().toISOString(),
      userId: body.user,
      reactions: { create: {} },
    },
    include: {
      reactions: true,
    },
  });

  const data: Client.Post = {
    id: post.id,
    title: post.title,
    content: post.content,
    date: post.date,
    user: post.userId,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    reactions: post.reactions!,
  };

  return res.json(data);
});

router.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  const data: Client.User[] = users.map(({ id, firstName, lastName }) => ({
    id,
    name: `${firstName} ${lastName}`,
  }));

  return res.json(data);
});

router.get("/notifications", async (req, res) => {
  const numNotifications = 1;
  return res.json(numNotifications);
});

export default router;
