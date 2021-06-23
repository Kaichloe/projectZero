"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ddbDocClient = void 0;
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const ddbClient_1 = require("./ddbClient");
// Set the AWS Region.
const REGION = "us-east-1"; //e.g. "us-east-1"
const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: false,
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: false,
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: false, // false, by default.
};
const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    wrapNumbers: false, // false, by default.
};
const translateConfig = { marshallOptions, unmarshallOptions };
// Create the DynamoDB Document client.
const ddbDocClient = lib_dynamodb_1.DynamoDBDocumentClient.from(ddbClient_1.ddbClient, translateConfig);
exports.ddbDocClient = ddbDocClient;
