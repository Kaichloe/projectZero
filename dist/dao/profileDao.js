"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const REGION = "us-east-1";
const dynamoClient = new client_dynamodb_1.DynamoDBClient({ region: REGION });
const TABLE_NAME = "databook";
class ProfileDao {
    /**
     * Will get all profiles but filtered to show only their emails
     * @returns
     */
    async getProfiles() {
        const params = {
            TableName: TABLE_NAME
        };
        const profiles = await dynamoClient.send(new client_dynamodb_1.ScanCommand(params));
        let filteredProfiles = [];
        for (const values of profiles.Items) {
            filteredProfiles.push(values.email.S);
        }
        return filteredProfiles;
    }
    /**
     * Will add or update profile based on given params. Will make sure handle is all lowerCased
     * @param user
     */
    async addOrUpdateProfile(user) {
        const { handle, age, email } = user;
        const lowerCase = handle.toLowerCase();
        const body = {
            TableName: TABLE_NAME,
            Item: {
                handle: { S: lowerCase },
                age: { N: age },
                email: { S: email }
            }
        };
        await dynamoClient.send(new client_dynamodb_1.PutItemCommand(body));
    }
    /**
     * Will get profile based on handle. Will show handle, email and age
     * @param handle
     * @returns
     */
    async getProfileByHandle(handle) {
        const lowerCase = handle.toLowerCase();
        const params = {
            TableName: TABLE_NAME,
            Key: {
                handle: { S: lowerCase }
            }
        };
        const profile = await dynamoClient.send(new client_dynamodb_1.GetItemCommand(params));
        return profile.Item;
    }
    /**
     * will delete profile by handle
     * from the database
     * @param handle
     */
    async deleteProfileByHandle(handle) {
        const toLower = handle.toLowerCase();
        const params = {
            TableName: TABLE_NAME,
            Key: {
                handle: { S: toLower },
            }
        };
        await dynamoClient.send(new client_dynamodb_1.DeleteItemCommand(params));
    }
}
exports.default = ProfileDao;
