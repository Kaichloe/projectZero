import express from 'express';
import {getProfiles, getProfileByName, deleteProfileById} from './dynamo';
import { Request, Response } from 'express';
const app = express();
const port = process.env.port || 3000;

app.get('/', (req, res) => {
  res.send("Hello World, I am Kai's creation!")
});

app.get('/profiles', async(req: Request, res: Response) => {
  try {
    const profiles = await getProfiles();
    res.json(profiles);
  } catch(error){
    console.error(error);
    res.status(500).json({err:"something went wrong"})
  }
})

app.get('/profiles/:id', async(req: Request, res: Response) => {
  try {
    const { id } = req.params
    const profile = await getProfileByName(id);
    res.json(profile);
  } catch(error){
    console.error(error);
    res.status(500).json({err:"something went wrong"})
  }
})

app.delete('/profiles/:id', async(req: Request, res: Response) => {
  try {
    const { id } = req.params
    const profile = await deleteProfileById(id);
    res.json(profile);
    console.log("its been deleted!");
  } catch(error){
    console.error(error);
    res.status(500).json({err:"something went wrong"})
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});