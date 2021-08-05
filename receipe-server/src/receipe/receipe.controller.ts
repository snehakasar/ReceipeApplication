import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Receipe } from './interfaces/receipe.interface';
import { ReceipeService } from './receipe.service';

@Controller('receipe')
export class ReceipeController {
    constructor(private readonly receipeServices:ReceipeService){}
    @Get(':id')
    findOne(@Param('id') id):Promise<Receipe>{
        return this.receipeServices.findOne(id)
    }
    @Get()
    findAll():Promise<Receipe[]>{
        return this.receipeServices.findAll()
    }
    @Post()
    create(@Body() receipe:Receipe):Promise<Receipe>{
        return this.receipeServices.create(receipe)
    }
    @Put(':id')
    update(@Body() receipe:Receipe, @Param('id') id):Promise<Receipe>{
        return this.receipeServices.update(id,receipe)
    }
    @Delete(':id')
    delete(@Param('id') id):Promise<Receipe>{
        return this.receipeServices.delete(id)
    }
   
}
