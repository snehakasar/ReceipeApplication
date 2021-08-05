import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ReceipeController } from "./receipe.controller";
import { ReceipeService } from "./receipe.service";
import { ReceipeSchema } from "./schemas/receipe.schema";

@Module({
    imports:[MongooseModule.forFeature([{name:'Receipe',schema:ReceipeSchema}])],
    controllers:[ReceipeController],
    providers:[ReceipeService],
})

export class ReceipeModule {}