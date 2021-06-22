import { Request, Response } from 'express';
import ProfileDao from '../../dao/profileDao';

const profileDao =new ProfileDao();

export async function getAllProfiles(req: Request, res: Response){
  try {
    const profiles = await profileDao.getProfiles();
    res.json(profiles);
  } catch(error){
    console.error(error);
    res.status(500).json({err:"something went wrong"})
  }
} 

export async function getByHandle(req: Request, res: Response){
  try {
    const { handle } = req.params
    const profile = await profileDao.getProfileByHandle(handle)
    profile !== undefined ? res.status(200).json(profile) : res.json(`${handle} does not exist`);
  } catch(error){
    res.status(500).json({err:"something went wrong"})
  }
}

export async function addOrUpdateProfile(req: Request, res: Response){
  try {
    const user = await profileDao.addOrUpdateProfile(req.body)
    res.json("You were successful!")
    res.json(user);
  } catch(error){
    res.status(500).json({err:"something went wrong"})
  }
}

export async function deleteProfileByHandle(req: Request, res: Response){
  try {
    const { handle } = req.params
    const profile = await profileDao.deleteProfileByHandle(handle);
    res.json(`${handle}'s profile was successfully deleted`);
    res.json(profile);
  } catch(error){
    res.status(500).json({err:"something went wrong"})
  }
}