"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const profiles_1 = require("./profiles");
const userPost_1 = require("./userPost");
//Profile-route
const profileRouter = express_1.Router();
profileRouter.get('/', profiles_1.getAllProfiles);
profileRouter.get('/:handle', profiles_1.getByHandle);
profileRouter.post('/', profiles_1.addOrUpdateProfile);
profileRouter.put('/', profiles_1.addOrUpdateProfile);
profileRouter.delete('/:handle', profiles_1.deleteProfileByHandle);
//Post-route
const postRouter = express_1.Router();
postRouter.get('/:handle', userPost_1.getPostsByHandle);
postRouter.post('/', userPost_1.newPost);
postRouter.put('/', userPost_1.addPost);
postRouter.delete('/:handle', userPost_1.deleteAllPostByHandle);
//Root-router
const rootRouter = express_1.Router();
rootRouter.use('/profiles', profileRouter);
rootRouter.use('/posts', postRouter);
exports.default = rootRouter;
