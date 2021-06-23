"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ddbClient = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
// Set the AWS Region.
const REGION = "us-east-1"; //e.g. "us-east-1"
// Create an Amazon DynamoDB service client object.
const ddbClient = new client_dynamodb_1.DynamoDBClient({ region: REGION });
exports.ddbClient = ddbClient;
