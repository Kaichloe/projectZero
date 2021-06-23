import {Router} from 'express';
import {getAllProfiles, addOrUpdateProfile, getByHandle, deleteProfileByHandle} from './profiles'
import {getPostsByHandle, addPost, newPost, deleteAllPostByHandle} from './userPost';

//Profile-route
const profileRouter = Router();
profileRouter.get('/', getAllProfiles);
profileRouter.get('/:handle', getByHandle);
profileRouter.post('/',addOrUpdateProfile);
profileRouter.put('/', addOrUpdateProfile);
profileRouter.delete('/:handle', deleteProfileByHandle);

//Post-route
const postRouter = Router();
postRouter.get('/:handle', getPostsByHandle);
postRouter.post('/', newPost);
postRouter.put('/', addPost);
postRouter.delete('/:handle', deleteAllPostByHandle);


//Root-router
const rootRouter = Router();
rootRouter.use('/profiles', profileRouter);
rootRouter.use('/posts', postRouter);
export default rootRouter;