import { DynamoDBClient, PutItemCommand, GetItemCommand, ScanCommand, DeleteItemCommand} from '@aws-sdk/client-dynamodb';
import IProfile from '../models/profile';
import Profile from '../models/profile';

const REGION:string = "us-east-1";
const dynamoClient = new DynamoDBClient({region: REGION})
const TABLE_NAME:string = "databook";

export interface IProfileDao {
  getProfiles: () => Promise<IProfile[]>;
  addOrUpdateProfile: (user:IProfile) => Promise<void>;
  getProfileByHandle: (handle:string) => Promise<IProfile | null >;
  deleteProfileByHandle: (handle:string) => Promise<void>;
}

class ProfileDao implements IProfileDao{
  
  public async getProfiles():Promise<IProfile[]> {
    const params = {
      TableName: TABLE_NAME
    };

    const profiles = await dynamoClient.send(new ScanCommand(params));
    let filteredProfiles = [];

    for(const values of profiles.Items){
      filteredProfiles.push(values.email.S);
    }

    return filteredProfiles as Profile[];
  }

  public async addOrUpdateProfile(user:{handle:string; age:string; email: string}):Promise<void> {
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
    await dynamoClient.send(new PutItemCommand(body));
  }

  public async getProfileByHandle(handle:string):Promise<IProfile | null > {
    const lowerCase = handle.toLowerCase();
    const params = {
      TableName: TABLE_NAME,
      Key: {
        handle: {S: lowerCase}
      }
    }
    const profile = await dynamoClient.send(new GetItemCommand(params));
    return profile.Item as Profile;
  }

  public async deleteProfileByHandle(handle:string):Promise<void> {
    const params = {
    TableName: TABLE_NAME,
      Key: {
        handle: {S: handle},
      }
    }
    await dynamoClient.send(new DeleteItemCommand(params));
  }
}

export default ProfileDao;