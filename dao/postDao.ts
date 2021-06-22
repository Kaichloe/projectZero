import { ddbDocClient } from '../libs/ddbDocClient';
import {GetCommand, UpdateCommand, PutCommand, DeleteCommand} from '@aws-sdk/lib-dynamodb';
import Post from '../models/post';
import IPost from '../models/post';


const TABLE_NAME:string = "postbook";

export interface IPostDao {
  getPostsByHandle: (handle:string) => Promise<IPost | null>;
  // addPost: (post:IPost) => Promise<void>;
  // updatePost: (post:IPost) => Promise<void>;
}

class PostDao implements IPostDao{

  public async getPostsByHandle(handle:string):Promise<IPost | null> {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        handle: handle
      },
    };
    const data = await ddbDocClient.send(new GetCommand(params))
    console.log(data.Item);
    return data.Item as Post;    
  }

  public async addPost(post:IPost):Promise<void> {
    // const {handle, email} = post;
    // let { body } = post;
    // const get = {
    //   TableName: TABLE_NAME,
    //   Key: {
    //     handle: handle
    //   }
    // }

    // const data = await ddbDocClient.send(new GetCommand(get));
  
    // let params:{ TableName: string, Item:{ handle: string, email: string, body:string[]}}

    // if (data !== undefined){
    //   params = {
    //     TableName: TABLE_NAME,
    //     Item: {
    //       handle: handle,  
    //       email: email,
    //       body: body
    //     } 
    //   }
    // } else {
    //   const update = data.Item.body.push(body);
    //   console.log(update);
    //   params = {
    //     TableName: TABLE_NAME,
    //     Item: {
    //       handle: handle,  
    //       email: email,
    //       body: update
    //     } 
    //   }
    // }
    // await ddbDocClient.send(new PutCommand(params));
  }
  
  public async updatePost(post:IPost):Promise<void> {
    // const {handle, body} = post;

    // const params = {
    //   TableName: TABLE_NAME,
    //   Key: {
    //     handle: handle
    //   },
    //   UpdateExpression: 'set body = :l',
    //   ExpressionsAttributeValues: {
    //     ':l': body
    //   }
    // }
    // await ddbDocClient.send(new UpdateCommand(params));
  }

}

export default PostDao;

