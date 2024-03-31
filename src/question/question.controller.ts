import { Controller, Get, Post, Body, Param, Delete, Res, Put } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiTags } from '@nestjs/swagger';
import { ResponseFormatter } from 'src/common/response/response';
import { ValidateObjectIdPipe } from 'src/common/pipes/objectid.pipe';


@ApiTags('Questions')
@Controller('question')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  async create(@Body() createQuestionDto: CreateQuestionDto, @Res() res) {
    const data = await this.questionService.create(createQuestionDto);

    return ResponseFormatter({ res, data })
  }

  @Get()
  async findAll(@Res() res) {
    const data = await this.questionService.findAll();
    return ResponseFormatter({ res, data })
  }

  @Get(':id')
  async findOne(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Res() res,
  ) {
    const data = await this.questionService.findById(id);
    return ResponseFormatter({ res, data })
  }

  @Put(':id')
  async update(
    @Param('id', ValidateObjectIdPipe) id: string,
    @Res() res,
    @Body() updateQuestionDto: UpdateQuestionDto
    ) {
    const data = await this.questionService.update(id, updateQuestionDto);
    return ResponseFormatter({ res, data, message: "Question sucessfully updated"})
  }

  @Delete(':id')
  async remove(@Param('id', ValidateObjectIdPipe) id: string,
  @Res() res,
  ) {
    await this.questionService.remove(id);
    return ResponseFormatter({ res, message: "Question has been deleted" })
  }
}
