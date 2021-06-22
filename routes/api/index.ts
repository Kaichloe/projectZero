import {Router} from 'express';
import {getAllProfiles, addOrUpdateProfile, getByHandle, deleteProfileByHandle} from './profiles'
import {getPostsByHandle} from './post';

//Profile-route
const profileRouter = Router();
profileRouter.get('/', getAllProfiles);
profileRouter.get('/:handle', getByHandle);
profileRouter.post('/',addOrUpdateProfile);
profileRouter.delete('/:handle', deleteProfileByHandle);

//Post-route
const postRouter = Router();
postRouter.get('/:handle', getPostsByHandle);
// postRouter.post('/', addPost);
// postRouter.put('/',updatePost);


const rootRouter = Router();
rootRouter.use('/profiles', profileRouter);
rootRouter.use('/posts', postRouter);
export default rootRouter;