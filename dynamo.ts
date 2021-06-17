import { DynamoDBClient, PutItemCommand, GetItemCommand, ScanCommand, DeleteItemCommand} from '@aws-sdk/client-dynamodb';
const REGION:string = "us-east-1";
const dynamoClient = new DynamoDBClient({region: REGION})
const TABLE_NAME:string = "projectZero";

export const getProfiles = async() => {
  const params = {
    TableName: TABLE_NAME
  };
  const profiles = await dynamoClient.send(new ScanCommand(params))
  console.log(profiles);
  return profiles
};

export const addOrUpdateProfile = async (profile) =>{
  const params = {
    TableName: TABLE_NAME,
    Item: profile
  }
  return await dynamoClient.send(new PutItemCommand(params));
}

export const getProfileByName = async(id:string) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id: {S: id}
    }
  }
  const profile = dynamoClient.send(new GetItemCommand(params));
  return await profile;
}

export const deleteProfileById = async(id:string) => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      id: {S: id}
    }
  }
  return await dynamoClient.send(new DeleteItemCommand(params));
}

const profile = {
  id: "1",
  fullName: "Kaiyip Ho",
  height: 67,
  Gender: "Male",
  Hobbies: ["Working out", "playing video games", "traveling"]
}

// addOrUpdateProfile(profile);
// deleteProfileById("1");
// getProfiles();
// getProfileById("1")

