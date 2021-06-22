import PostDao from '../../dao/postDao';
import { Request, Response } from 'express';

const postDao = new PostDao();


export async function getPostsByHandle(req: Request, res: Response){
  try {
    const {handle} = req.params;
    const post = await postDao.getPostsByHandle(handle);
    post !== undefined ? res.json(post) : res.json("There are no post for that handle");
  } catch(error){
    res.status(500).json({err:"something went wrong"})
  }
}

export async function addPost(req: Request, res: Response){
  try {
    const post = await postDao.addPost(req.body)
    res.json("You were successful in adding the post!")
    res.json(post);
  } catch(error){
    res.status(500).json({err:"something went wrong"})
  }
}

export async function newPost(req: Request, res: Response){
  try {
    const post = await postDao.newPost(req.body)
    res.json("You were successful in creating a new post!")
    res.json(post);
  } catch(error){
    res.status(500).json({err:"something went wrong"})
  }
}

export async function deleteAllPostByHandle(req: Request, res: Response){
  try {
    const {handle} = req.params;
    const post = await postDao.deleteAllPostByHandle(handle)
    res.json(`All of ${handle}'s posts were successfully deleted`);
    res.json(post);
  } catch(error){
    res.status(500).json({err:"something went wrong"})
  }
}









