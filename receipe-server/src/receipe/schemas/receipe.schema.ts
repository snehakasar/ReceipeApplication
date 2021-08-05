import * as mongoose from 'mongoose';

export const ReceipeSchema=new mongoose.Schema({
    type:String,
    name:String,
    img:String,
    steps:String,
    ingredient:String,
    description:String
   
})