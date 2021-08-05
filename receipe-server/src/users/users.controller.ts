import { BadRequestException, Body, Controller, Get, Param, Post, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { User } from './interfaces/users.intefaces';
import * as bcrypt from 'bcrypt'

@Controller('users')
export class UsersController {
    constructor(private readonly userService:UsersService,private jwtService:JwtService){}
    @Post('register')
    async register(@Body() user:User):Promise<User>{
        const hashedPassword=await bcrypt.hash(user.password,12);
        const newuser=await this.userService.create({
            name:user.name,
            username:user.username,
            password:hashedPassword,
            role:user.role
        })
        delete newuser.password;
        return newuser
    }
    @Post("login")
    async login(@Body() user:User){
        const user1 = await this.userService.findOne({username:user.username});

        if (!user1) {
            throw new BadRequestException('invalid credentials');
        }

        if (!await bcrypt.compare(user.password, user1.password)) {
            throw new BadRequestException('invalid credentials');
        }

        const jwt = await this.jwtService.signAsync({id: user1.id});
        const res={
            username:user1.username,
            token:jwt,
            role:user1.role
        }
        return res
    }
    // @Post()
    // async user(@Body('token') token:string) {
    //     try {
    //         const data = await this.jwtService.verifyAsync(token);

    //         if (!data) {
    //             throw new UnauthorizedException();
    //         }

    //         const user = await this.userService.findOne({_id: data.id});

    //         const {password, ...result} = user;

    //         return result;
    //     } catch (e) {
    //         throw new UnauthorizedException();
    //     }
    // }
}
