import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interfaces/users.intefaces';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private readonly userModel:Model<User>){}

    async create(data: any): Promise<User> {
        const newUser=new this.userModel(data);
        return await newUser.save();
    }

    async findOne(condition: any): Promise<User> {
        return await this.userModel.findOne(condition);
    }
}
