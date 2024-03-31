import { PartialType, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsInt, Min, IsEnum, IsArray, IsUrl, ValidateIf, IsString } from 'class-validator';
import { CreateQuestionDto } from './create-question.dto';
import { QuestionType } from 'src/common/enums/shared-enums';

export class UpdateQuestionDto extends PartialType(CreateQuestionDto) {
  @ApiPropertyOptional({ enum: QuestionType, description: 'The type of the question' })
  @IsOptional()
  @IsEnum(QuestionType)
  readonly questionType?: QuestionType;

  @ApiPropertyOptional({ description: 'The text of the question' })
  @IsOptional()
  @IsString()
  readonly questionText?: string;

  @ApiPropertyOptional({ description: 'The text of the answer', example: '4' })
  @IsOptional()
  @IsString()
  readonly AnswerText: string;

  @ApiPropertyOptional({ description: 'The timer for answering the question in seconds' })
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly timer?: number;

  @ApiPropertyOptional({ description: 'The points awarded for answering the question' })
  @IsOptional()
  @IsInt()
  @Min(1)
  readonly points?: number;

  @ApiPropertyOptional({ type: [String], description: 'An optional array of URLs', example: ['www.example.com'] })
  @IsOptional()
  @IsArray()
  @ValidateIf((o) => o.files !== undefined)
  @IsUrl({}, { each: true, message: 'Each file must be a valid URL' })
  readonly files?: string[];
}
