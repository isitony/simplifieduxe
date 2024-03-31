import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsInt, Min, IsEnum, IsArray, IsUrl, ArrayNotEmpty, ValidateIf } from 'class-validator';
import { QuestionType } from 'src/common/enums/shared-enums';

export class CreateQuestionDto {
  @ApiProperty({ enum: QuestionType, description: 'The type of the question', example: QuestionType.Choice })
  @IsNotEmpty()
  @IsEnum(QuestionType)
  readonly questionType: QuestionType;

  @ApiProperty({ description: 'The text of the question', example: 'What is 2 + 2?' })
  @IsNotEmpty()
  @IsString()
  readonly questionText: string;

  @ApiProperty({ description: 'The text of the answer', example: '4' })
  @IsNotEmpty()
  @IsString()
  readonly AnswerText: string;

  @ApiProperty({ description: 'The timer for answering the question in seconds', example: 30 })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly timer: number;

  @ApiProperty({ description: 'The points awarded for answering the question', example: 10 })
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly points: number;

  @ApiProperty({ type: [String], description: 'An optional array of URLs', example: ['www.example.com'] })
  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true, message: 'Each file must be a valid URL' })
  readonly files?: string[];
}
