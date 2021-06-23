"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllPostByHandle = exports.newPost = exports.addPost = exports.getPostsByHandle = void 0;
const userPostDao_1 = __importDefault(require("../../dao/userPostDao"));
const userPostDao = new userPostDao_1.default();
/**
 * api route that calls function that
 * returns post by handle
 * if there is not post found by handle will return custom comment
 * @param req
 * @param res
 */
async function getPostsByHandle(req, res) {
    try {
        const { handle } = req.params;
        const post = await userPostDao.getPostsByHandle(handle);
        post !== undefined ? res.status(200).json(post) : res.status(200).json("There are no post for that handle");
    }
    catch (error) {
        res.status(500).json({ err: "something went wrong" });
    }
}
exports.getPostsByHandle = getPostsByHandle;
/**
 * api route that calls function
 * that will add more to your post
 * @param req
 * @param res
 */
async function addPost(req, res) {
    try {
        const post = await userPostDao.addPost(req.body);
        res.status(200).json("You were successful in adding the post!");
        res.status(200).json(post);
    }
    catch (error) {
        res.status(500).json({ err: "something went wrong" });
    }
}
exports.addPost = addPost;
/**
 * api route that calls function
 * that will create a new post
 * @param req
 * @param res
 */
async function newPost(req, res) {
    try {
        const post = await userPostDao.newPost(req.body);
        res.status(200).json("You were successful in creating a new post!");
        res.status(200).json(post);
    }
    catch (error) {
        res.status(500).json({ err: "something went wrong" });
    }
}
exports.newPost = newPost;
/**
 * api route that calls function
 * that will delete post based on handle
 * @param req
 * @param res
 */
async function deleteAllPostByHandle(req, res) {
    try {
        const { handle } = req.params;
        const post = await userPostDao.deleteAllPostByHandle(handle);
        res.status(200).json(`All of ${handle}'s posts were successfully deleted`);
        res.status(200).json(post);
    }
    catch (error) {
        res.status(500).json({ err: "something went wrong" });
    }
}
exports.deleteAllPostByHandle = deleteAllPostByHandle;
