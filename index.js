import express from 'express';
import dotenv from 'dotenv'; dotenv.config();
import router from './routes/url.js';
import mongoose from 'mongoose';
import { Url } from './models/url.js';

const app=express();
const PORT=8001;

async function connect(){
  try {
    await mongoose.connect(process.env.CONNECTION_URL)
    console.log('connected.');
  } catch (error) {
    console.error(error);
  }
} connect(); app.use(express.json());

app.use('/url',router)

app.get('/:shortId',async (req,res)=>{
  const shortId=req.params.shortId;
  const entry=await Url.findOneAndUpdate({shortId},{$push:{visitHistory:{timestamp:Date.now()}}})
  res.redirect(entry.redirectUrl)
})

app.get('/',(req,res)=>res.send('hello'));
app.listen(PORT,()=>console.log(`http://localhost:${PORT}`))