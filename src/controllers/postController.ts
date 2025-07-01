import { RequestHandler } from "express";
import { posts, Post } from "../models/postModel";

export const getPosts: RequestHandler = (req, res) => {
  res.json(posts);
}
export const createPost: RequestHandler = (req, res) => {
  const {title, content} = req.body;

  const newPost:Post = {
    id: posts.length + 1,
    title: title,
    content: content
  }

  posts.push(newPost);
  res.status(201).json(newPost);
}

export const deletePost: RequestHandler = (req, res) => {
  const id = parseInt(req.params.id);
  const index = posts.findIndex(post => post.id === id);

  if (index === -1) {
    res.status(404).json({ message: "Post not found" });
    return;
  }

  const deletedPost = posts.splice(index, 1)[0];
  res.json({ message: "Post deleted", deletedPost });
}