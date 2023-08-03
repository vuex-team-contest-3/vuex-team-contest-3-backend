import { Controller, Get, Param, Res } from '@nestjs/common';
import { ImageService } from './image.service';
import { Response } from 'express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Image')
@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @ApiOperation({ summary: 'Get Image by file name' })
  @ApiResponse({ status: 200 })
  @Get(':fileName')
  async findOne(@Param('fileName') fileName: string, @Res() res: Response) {
    return this.imageService.findOne(fileName, res);
  }
}
