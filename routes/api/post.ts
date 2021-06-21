import express from 'express';
import {getProfiles, getProfileByHandle, deleteProfileByHandle, addOrUpdateProfile} from './dynamo';
import { Request, Response } from 'express';

const router = express.Router();

router.get('/posts', (req: Request, res: Response) => {
  
})
