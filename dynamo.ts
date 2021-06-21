import { DynamoDBClient, PutItemCommand, GetItemCommand, ScanCommand, DeleteItemCommand} from '@aws-sdk/client-dynamodb';
import IProfile from './models/profile';
const REGION:string = "us-east-1";
const dynamoClient = new DynamoDBClient({region: REGION})
const TABLE_NAME:string = "databook";

export const getProfiles = async() => {
  const params = {
    TableName: TABLE_NAME
  };
  const profiles = await dynamoClient.send(new ScanCommand(params))
  console.log(profiles);
  return profiles
};

export const addOrUpdateProfile = async(user:{handle:string; age:string; email: string}) => {
  const {handle, age, email} = user;
  const lowerCase = handle.toLowerCase();
  const body = {
    TableName: TABLE_NAME,
    Item: {
      handle: {S: lowerCase},  
      age: {N: age},
      email: {S: email}
    } 
  }
  return await dynamoClient.send(new PutItemCommand(body));
}

export const getProfileByHandle = async(handle:string) => {
  const lowerCase = handle.toLowerCase();
  const params = {
    TableName: TABLE_NAME,
    Key: {
      handle: {S: lowerCase}
    }
  }
  const profile = dynamoClient.send(new GetItemCommand(params));
  return await profile;
}

export const deleteProfileByEmail = async(email:string) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      email: {S: email}
    }
  }
  return await dynamoClient.send(new DeleteItemCommand(params));
}




