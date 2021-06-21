import express from 'express';
import rootRouter from './routes/api/index';

const app = express();
const port = process.env.port || 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', rootRouter);
// app.get('/profiles', async(req: Request, res: Response) => {
//   try {
//     const profiles = await getProfiles();
//     res.json(profiles);
//   } catch(error){
//     console.error(error);
//     res.status(500).json({err:"something went wrong"})
//   }
// })

// app.get('/profiles/:handle', async(req: Request, res: Response) => {
//   try {
//     const { handle } = req.params
//     const profile = await profileDao.getProfileByHandle(handle)
//     res.status(200).json(profile);
//     console.log("this works!")
//   } catch(error){
//     console.error(error);
//     res.status(500).json({err:"something went wrong"})
//   }
// })

// app.post('/profiles', async(req: Request, res: Response) => {
//   try {
//     console.log(req)
//     const user = await addOrUpdateProfile(req.body)
//     res.json(user);
//     console.log("successfully created!")
//   } catch(error){
//     console.error(error);
//     res.status(500).json({err:"something went wrong"})
//   }
// })

// app.delete('/profiles/:email', async(req: Request, res: Response) => {
//   try {
//     const { email } = req.params
//     const profile = await deleteProfileByEmail(email);
//     res.json(profile);
//     console.log("its been deleted!");
//   } catch(error){
//     console.error(error);
//     res.status(500).json({err:"something went wrong"})
//   }
// })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});