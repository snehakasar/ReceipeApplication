import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./schemas/users.schema";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";


@Module({
    imports:[JwtModule.register({secret: 'secret',
    signOptions: {expiresIn: '24h'}}), MongooseModule.forFeature([{name:'User',schema:UserSchema}])],
    controllers:[UsersController],
    providers:[UsersService],
})

export class UserModule {}