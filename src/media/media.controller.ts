import { Controller, Post, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiConsumes, ApiTags, ApiBody, ApiOperation } from '@nestjs/swagger';
import { MediaService } from './media.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ResponseFormatter } from 'src/common/response/response';


@ApiBearerAuth()
@ApiTags('Media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Max file size is 20mb' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
    
  })
  async uploadFile(@UploadedFile() file, @Res() res) {
    const data = await this.mediaService.uploadFile(file);
    return ResponseFormatter({ res, data,  message: 'File sucessfully uploaded' })

  }


}


