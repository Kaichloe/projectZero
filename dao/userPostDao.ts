import { ddbDocClient } from '../libs/ddbDocClient';
import {GetCommand,PutCommand, DeleteCommand} from '@aws-sdk/lib-dynamodb';
import UserPost from '../models/userPost';
import IUserPost from '../models/userPost';

const TABLE_NAME:string = "postbook";


export interface IUserPostDao {
  getPostsByHandle: (handle:string) => Promise<IUserPost | null>;
  newPost: (post:IUserPost) => Promise<void>;
  addPost: (post:IUserPost) => Promise<void>;
  deleteAllPostByHandle: (handle:string) => Promise<void>;
}

class UserPostDao implements IUserPostDao{

  /**
   * will get all posts by handle, will return no found post if the handle does not exist in the database
   * @param handle 
   * @returns 
   */
  public async getPostsByHandle(handle:string):Promise<IUserPost | null> {
    const toLower = handle.toLowerCase();
    const params = {
      TableName: TABLE_NAME,
      Key: {
        handle: toLower
      },
    };
    const data = await ddbDocClient.send(new GetCommand(params));
    
    return data.Item as UserPost;    
  }

  /**
   * Will create a new post given handle, email and the post
   * @param post 
   */
  public async newPost(userPost:IUserPost):Promise<void> {
    const {handle, email, post} = userPost;
    const toLower = handle.toLowerCase();
    const params = {
      TableName: TABLE_NAME,
      Item: {
        handle: toLower,  
        email: email,
        post: post,
      } 
    };
    await ddbDocClient.send(new PutCommand(params));
  }

  /**
   * Will look for existing post(s) based on given handle and add the new post(s) to old 
   * @param post 
   */
  public async addPost(userPost:IUserPost):Promise<void> {
    const {handle, email} = userPost;
    const toLower = handle.toLowerCase();
    let { post } = userPost;
    const input = {
      TableName: TABLE_NAME,
      Key: {
        handle: toLower
      }
    }

    const oldData = await ddbDocClient.send(new GetCommand(input));

    const update:string[] = oldData.Item.post.concat(post);
    
    const params = {
      TableName: TABLE_NAME,
      Item: {
        handle: toLower,  
        email: email,
        post: update
      } 
    }
    await ddbDocClient.send(new PutCommand(params))
  }
  
  /**
   * Will delete all post by handle
   * @param handle 
   */
  public async deleteAllPostByHandle(handle:string):Promise<void> {
    const toLower = handle.toLowerCase();
    const params = {
      TableName: TABLE_NAME,
      Key: {
        handle: toLower
      }
    }
    await ddbDocClient.send(new DeleteCommand(params));
  }
}

export default UserPostDao;

