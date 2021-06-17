import * as AWS from '@aws-sdk/client-dynamodb';
import { DynamoDBClient, PutItemCommand, GetItemCommand, ScanCommand} from '@aws-sdk/client-dynamodb';
// require('dotenv').config();
// import * as AWS from 'aws-sdk';
// import dotenv from 'dotenv';
// dotenv.config();

// AWS.config.update({
//   region: process.env.AWS_DEFAULT_REGION,
//   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// })
const REGION = "us-east-1";

// const dynamoClient = new AWS.DynamoDB.DocumentClient();
const dynamoClient = new DynamoDBClient({region: REGION})
const TABLE_NAME = "projectZero";

export const getProfiles = async() => {
  const params = {
    TableName: TABLE_NAME
  };
  return await dynamoClient.send(new ScanCommand(params));
};

const addOrUpdateProfile = async (profile) =>{
  const params = {
    TableName: TABLE_NAME,
    Item: profile
  }
  return await dynamoClient.send(new PutItemCommand(params));
}

// const getProfileById = async(id) => {
//   const params = {
//     TableName: TABLE_NAME,
//     Key: {
//       id,
//     }
//   }
//   const profile = dynamoClient.send(new GetItemCommand(params));
//   return await profile;
// }

// const deleteProfileById = async(id) => {
//   const params = {
//     TableName: TABLE_NAME,
//     Key: {
//       id,
//     }
//   }
//   return await dynamoClient.delete(params).promise();
// }

const profile = {
  id: "1",
  fullName: "Kaiyip Ho",
  height: 67,
  Gender: "Male",
  Hobbies: ["Working out", "playing video games", "traveling"]
}

// addOrUpdateProfile(profile);
// deleteProfileById("1");
getProfiles();

