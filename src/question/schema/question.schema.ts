import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, } from 'mongoose';
import { QuestionType } from 'src/common/enums/shared-enums';

export type QuestionDocument = Question & Document;

@Schema({
  timestamps: true,
  strict: "throw",
  strictQuery: false,
  id: false
})

export class Question {
    @Prop({
        type: String,
        enum: QuestionType,
        required: true
    })
    questionType: string;
  
  @Prop({ type: String, required: true })
  questionText: string;

  @Prop({ type: String, required: true })
  AnswerText: string;

  @Prop({ type: Number, required: true })
  timer: number;

  @Prop({ type: Number, required: true })
  points: number;

  @Prop({ type: [String], required: false, default: [] })
  files: string[];
  
  }
  
  export const QuestionSchema = SchemaFactory.createForClass(Question);