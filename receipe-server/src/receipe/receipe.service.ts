import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Receipe } from './interfaces/receipe.interface';

@Injectable()
export class ReceipeService {
    constructor(@InjectModel('Receipe') private readonly receipeModel:Model<Receipe>){}

     async findAll():Promise<Receipe[]>{
      return await this.receipeModel.find();
      
    }
    async create(receipe:Receipe){
        const newReceipe=new this.receipeModel(receipe);
        return await newReceipe.save()
    }
    async update(id:string,receipe:Receipe):Promise<Receipe>{
        return await this.receipeModel.findByIdAndUpdate(id,receipe,{new:true})
    }
    async delete(id:string){
        return await this.receipeModel.findByIdAndDelete(id)
    }
    async findOne(id:string){
        return await this.receipeModel.findById(id)
    }

}
