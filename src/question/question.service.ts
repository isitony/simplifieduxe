import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Question, QuestionDocument } from './schema/question.schema';
import { Model } from 'mongoose';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private questionModel: Model<QuestionDocument>) {}
    
  async create(createQuestionDto: CreateQuestionDto) {
    const question = new this.questionModel(createQuestionDto);

    await question.save()

    return question
  }

  async findAll() {
    return await this.questionModel.find()
  }

  async findById(id: string) {
    return await this.questionModel.findById(id)
  }

  async update(id: string, payload: UpdateQuestionDto) {
    const updatedQuestion = await this.questionModel.findByIdAndUpdate(id, payload, {
      runValidators: true,
      omitUndefined: true,
      new: true,
      useFindAndModify: false,
    })

    if (!updatedQuestion) {
      throw new NotFoundException()
    }

    return updatedQuestion
  }

  async remove(id: string) {
    const result = await this.questionModel.deleteOne({ _id: id }).exec();
    console.log('result ', result)
    if (result.deletedCount === 0) {
      throw new NotFoundException(`Question with ID "${id}" not found`);
    }
    return;
  }
}
