import { DynamoDBClient, PutItemCommand, GetItemCommand, ScanCommand, DeleteItemCommand} from '@aws-sdk/client-dynamodb';
import IProfile from '../models/profile';

const REGION:string = "us-east-1";
const dynamoClient = new DynamoDBClient({region: REGION})
const TABLE_NAME:string = "databook";

export interface IProfileDao {
  // getProfiles: () => Promise<IProfile[]>;
  // getProfileByHandle: (handle:string) => Promise<IProfile | null >;
  // addOrUpdateProfile: (user:IProfile) => Promise<void>;
  // deleteProfileByEmail: (email:string) => Promise<void>;
}

class ProfileDao {
  
  // public async getProfiles():Promise<IProfile[]> {
  //   const params = {
  //     TableName: TABLE_NAME
  //   };

  //   const profiles = await dynamoClient.send(new ScanCommand(params))
  //   return profiles;
  // }

  public addOrUpdateProfile = async(user:{handle:string; age:string; email: string}) => {
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
    const profile = await dynamoClient.send(new PutItemCommand(body));
    return profile;
  }

  public getProfileByHandle = async(handle:string) => {
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

  public deleteProfileByEmail = async(email:string) => {
    const params = {
    TableName: TABLE_NAME,
      Key: {
        email: {S: email}
      }
    }
    const profile = await dynamoClient.send(new DeleteItemCommand(params));
    return profile;
  }
}

export default ProfileDao;