import { DynamoDBClient, PutItemCommand, GetItemCommand, ScanCommand, DeleteItemCommand} from '@aws-sdk/client-dynamodb';

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

export const addOrUpdateProfile = async (user: {handle:string; age:string;email: string}) =>{
  const body = {
    TableName: TABLE_NAME,
    Item: {
      handle: {S: user.handle},  
      age: {N: user.age},
      email: {S: user.email}
    } 
  }
  return await dynamoClient.send(new PutItemCommand(body));
}

export const getProfileByHandle = async(handle:string) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      handle: {S: handle}
    }
  }
  const profile = dynamoClient.send(new GetItemCommand(params));
  return await profile;
}

export const deleteProfileByHandle = async(handle:string) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      handle: {S: handle}
    }
  }
  return await dynamoClient.send(new DeleteItemCommand(params));
}




