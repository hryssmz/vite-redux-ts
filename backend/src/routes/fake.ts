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

router.get("/posts/:postId", async (req, res) => {
  const post = await prisma.post.findUnique({
    where: { id: req.params.postId },
  });

  return res.json(post);
});

router.patch("/posts/:postId", async (req, res) => {
  const {
    id,
    ...data
  }: {
    id: string;
    title?: string;
    content?: string;
    date?: string;
  } = req.body;

  const post = await prisma.post.update({
    where: { id },
    data,
  });

  return res.json(post);
});

router.get("/posts/:postId/comments", async (req, res) => {
  const post = await prisma.post.findUnique({
    where: { id: req.params.postId },
  });
  const comments =
    post === null
      ? []
      : await prisma.comment.findMany({ where: { postId: post.id } });

  return res.json(comments);
});

router.post("/posts/:postId/reactions", async (req, res) => {
  const { postId } = req.params;
  const reaction: string = req.body.reaction;
  await prisma.reaction.update({
    where: { id: postId },
    data: { [reaction]: { increment: 1 } },
  });

  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  return res.json(post);
});

router.get("/notifications", async (req, res) => {
  const numNotifications = 1;
  return res.json(numNotifications);
});

router.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  const data: Client.User[] = users.map(({ id, firstName, lastName }) => ({
    id,
    name: `${firstName} ${lastName}`,
  }));

  return res.json(data);
});

export default router;
