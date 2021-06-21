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
    res.status(200).json(profile);
  } catch(error){
    res.status(500).json({err:"something went wrong"})
  }
}

export async function addOrUpdateProfile(req: Request, res: Response){
  try {
    const user = await profileDao.addOrUpdateProfile(req.body)
    res.json(user);
  } catch(error){
    res.status(500).json({err:"something went wrong"})
  }
}

export async function deleteProfileByEmail(req: Request, res: Response){
  try {
    const { email } = req.params
    const profile = await profileDao.deleteProfileByEmail(email);
    res.json(profile);
  } catch(error){
    res.status(500).json({err:"something went wrong"})
  }
}