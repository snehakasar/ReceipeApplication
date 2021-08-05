import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReceipeModule } from './receipe/receipe.module.';
import  config  from './config/db.keys'
import { UserModule } from './users/user.module';

@Module({
  imports: [ReceipeModule,UserModule, MongooseModule.forRoot(config.mongoUrl)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
