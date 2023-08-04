import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateQueueDto } from './dto/create-queue.dto';
import { UpdateQueueDto } from './dto/update-queue.dto';
import { QueueService } from './queue.service';

@ApiTags('Queue')
@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @ApiOperation({ summary: 'Create a queue' })
  @Post()
  create(@Body() createQueueDto: CreateQueueDto) {
    return this.queueService.create(createQueueDto);
  }

  @ApiOperation({ summary: 'Get all queue' })
  @Get()
  findAll() {
    return this.queueService.findAll();
  }

  @ApiOperation({ summary: 'Get all queue' })
  @Get('today/:doctor_id')
  findAllToday(@Param('doctor_id') doctor_id: number) {
    return this.queueService.findAllToday(+doctor_id);
  }

  @ApiOperation({ summary: 'Get queue' })
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.queueService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update queue' })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateQueueDto: UpdateQueueDto,
  ) {
    return await this.queueService.update(+id, updateQueueDto);
  }

  @ApiOperation({ summary: 'Delete queue' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.queueService.delete(id);
  }
}
