import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { QueueService } from './queue.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from '../pipes/image-validation.pipe';

@ApiTags('Queue')
@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @ApiOperation({ summary: 'Create a queue' })
  @Post()
  async create(@Body() createQueueDto: CreateQueueDto) {
    return this.queueService.create(createQueueDto);
  }

  @ApiOperation({ summary: 'Get all queue' })
  @Get()
  async findAll() {
    return this.queueService.findAll();
  }

  @ApiOperation({ summary: 'Get all queue today' })
  @Get('today/:doctor_id')
  async findAllToday(@Param('doctor_id') doctor_id: number) {
    return this.queueService.findAllToday(+doctor_id);
  }

  @ApiOperation({ summary: 'Get all queue by day' })
  @Get('date/:doctor_id/:date')
  async findAllByDate(
    @Param('doctor_id') doctor_id: number,
    @Param('date') date: string,
  ) {
    return this.queueService.findAllByDate(+doctor_id, date);
  }

  @ApiOperation({ summary: 'Get queue' })
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.queueService.findOne(+id);
  }

  @ApiOperation({ summary: 'Check client' })
  @Post('check')
  async checkClient(@Body() createQueueDto: CreateQueueDto) {
    return this.queueService.checkClient(createQueueDto);
  }

  @ApiOperation({ summary: 'Update queue' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
          description: 'Image file to upload',
        },
        is_active: {
          type: 'boolean',
          example: false,
          description: 'The status of the Queu',
        },
        started_at: {
          type: 'string',
          example: '2023-08-03T10:14:40.492Z',
          description: 'The started time of the Queue',
        },
        finished_at: {
          type: 'string',
          example: '2023-08-03T10:14:50.492Z',
          description: 'The finished time of the Queue',
        },
        diagnosis_id: {
          type: 'number',
          example: 1,
          description: 'The diagnosis of the Queue',
        },
      },
    },
  })
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: number,
    @Body() updateQueueDto: UpdateQueueDto,
    @UploadedFile(new ImageValidationPipe()) image: Express.Multer.File,
  ) {
    return this.queueService.update(+id, updateQueueDto, image);
  }

  @ApiOperation({ summary: 'Delete queue' })
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.queueService.delete(id);
  }
}
