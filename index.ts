import express from 'express';
import {getProfiles} from './dynamo';
const app = express();
const port = process.env.port || 3000;

app.get('/', (req, res) => {
  res.send("Hello World, I am Kai's creation!")
});

// app.get('/profiles', async(req, res) => {
//   try {
//     const profiles = await getProfiles();
//   } catch(error){
//     console.error(error);
//     res.status(500).json({err:"something went wrong"})
//   }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});