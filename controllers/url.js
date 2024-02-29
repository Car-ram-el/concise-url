import {nanoid} from 'nanoid';
import { Url } from '../models/url.js';

export async function generate(req,res){
  const body=req.body;
  if(!body.url) return res.status(400).json({error: 'Make sure you pass Url.'});
  const shortID=nanoid(8);
  await Url.create({
    shortId:shortID,
    redirectUrl:body.url,
    visitHistory:[]
  });
  return res.json({id:shortID})
}

export async function analytics(req,res){
  const shortId=req.params.shortId;
  const result=await Url.findOne({shortId});
  return res.json({
    totalClicks:result.visitHistory.length,
    analytics:result.visitHistory
  })
}