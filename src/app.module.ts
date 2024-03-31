import { Module } from '@nestjs/common';
import { QuestionModule } from './question/question.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MediaModule } from './media/media.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DATABASE_URI),
    QuestionModule,
    MediaModule
  ],
  controllers: [],
})
export class AppModule {}
