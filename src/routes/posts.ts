import express, { Request, Response } from "express";
import controller from "../controllers/posts";
import { News } from "../models/post";
const router = express.Router();

router.get("/posts", controller.getNews);

router.post("/posts", async (req: Request, res: Response) => {
  const { title, body } = req.body;
  const newPost = News.build({ title, body });
  await newPost.save();
  return res.status(201).send(newPost);
});

export = router;
