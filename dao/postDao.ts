import { ddbDocClient } from '../libs/ddbDocClient';
import {GetCommand,PutCommand, DeleteCommand} from '@aws-sdk/lib-dynamodb';
import Post from '../models/post';
import IPost from '../models/post';

const TABLE_NAME:string = "postbook";

export interface IPostDao {
  getPostsByHandle: (handle:string) => Promise<IPost | null>;
  newPost: (post:IPost) => Promise<void>;
  addPost: (post:IPost) => Promise<void>;
  deleteAllPostByHandle: (handle:string) => Promise<void>;
}

class PostDao implements IPostDao{

  public async getPostsByHandle(handle:string):Promise<IPost | null> {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        handle: handle
      },
    };
    const data = await ddbDocClient.send(new GetCommand(params));
    console.log(data)
    return data.Item as Post;    
  }

  public async newPost(post:IPost):Promise<void> {
    const {handle, email, body} = post;
    const params = {
      TableName: TABLE_NAME,
      Item: {
        handle: handle,  
        email: email,
        body: body,
      } 
    };
    await ddbDocClient.send(new PutCommand(params));
  }

  public async addPost(post:IPost):Promise<void> {
    const {handle, email} = post;
    let { body } = post;
    const input = {
      TableName: TABLE_NAME,
      Key: {
        handle: handle
      }
    }

    const oldData = await ddbDocClient.send(new GetCommand(input));
    console.log(oldData);
    const update:string[] = oldData.Item.body.concat(body);
    console.log(update);
    const params = {
      TableName: TABLE_NAME,
      Item: {
        handle: handle,  
        email: email,
        body: update
      } 
    }
    await ddbDocClient.send(new PutCommand(params))
  }
  
  public async deleteAllPostByHandle(handle:string):Promise<void> {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        handle: handle
      }
    }
    await ddbDocClient.send(new DeleteCommand(params));
  }
}

export default PostDao;

