import { DynamoDBClient, PutItemCommand, GetItemCommand, ScanCommand, DeleteItemCommand} from '@aws-sdk/client-dynamodb';
import Post from '../models/post';

const REGION:string = "us-east-1";
const dynamoClient = new DynamoDBClient({region: REGION})
const TABLE_NAME:string = "databook";

export default class PostDao {
  

  public getProfiles = async() => {
    const params = {
      TableName: TABLE_NAME
      
    };
  }
}

