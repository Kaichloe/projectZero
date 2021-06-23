"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ddbDocClient_1 = require("../libs/ddbDocClient");
const lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
const TABLE_NAME = "postbook";
class UserPostDao {
    /**
     * will get all posts by handle, will return no found post if the handle does not exist in the database
     * @param handle
     * @returns
     */
    async getPostsByHandle(handle) {
        const toLower = handle.toLowerCase();
        const params = {
            TableName: TABLE_NAME,
            Key: {
                handle: toLower
            },
        };
        const data = await ddbDocClient_1.ddbDocClient.send(new lib_dynamodb_1.GetCommand(params));
        // console.log(data)
        return data.Item;
    }
    /**
     * Will create a new post given handle, email and the post
     * @param post
     */
    async newPost(userPost) {
        const { handle, email, post } = userPost;
        const toLower = handle.toLowerCase();
        const params = {
            TableName: TABLE_NAME,
            Item: {
                handle: toLower,
                email: email,
                post: post,
            }
        };
        await ddbDocClient_1.ddbDocClient.send(new lib_dynamodb_1.PutCommand(params));
    }
    /**
     * Will look for existing post(s) based on given handle and add the new post(s) to old
     * @param post
     */
    async addPost(userPost) {
        const { handle, email } = userPost;
        const toLower = handle.toLowerCase();
        let { post } = userPost;
        const input = {
            TableName: TABLE_NAME,
            Key: {
                handle: toLower
            }
        };
        const oldData = await ddbDocClient_1.ddbDocClient.send(new lib_dynamodb_1.GetCommand(input));
        // console.log(oldData);
        const update = oldData.Item.post.concat(post);
        // console.log(update);
        const params = {
            TableName: TABLE_NAME,
            Item: {
                handle: toLower,
                email: email,
                post: update
            }
        };
        await ddbDocClient_1.ddbDocClient.send(new lib_dynamodb_1.PutCommand(params));
    }
    /**
     * Will delete all post by handle
     * @param handle
     */
    async deleteAllPostByHandle(handle) {
        const toLower = handle.toLowerCase();
        const params = {
            TableName: TABLE_NAME,
            Key: {
                handle: toLower
            }
        };
        await ddbDocClient_1.ddbDocClient.send(new lib_dynamodb_1.DeleteCommand(params));
    }
}
exports.default = UserPostDao;
