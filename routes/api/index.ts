import {Router} from 'express';
import {getAllProfiles, addOrUpdateProfile, getByHandle, deleteProfileByHandle} from './profiles'

//Profile-route
const profileRouter = Router();
profileRouter.get('/', getAllProfiles);
profileRouter.get('/:handle', getByHandle);
profileRouter.post('/',addOrUpdateProfile);
profileRouter.delete('/:handle', deleteProfileByHandle);

const rootRouter = Router();
rootRouter.use('/profiles', profileRouter);
export default rootRouter;