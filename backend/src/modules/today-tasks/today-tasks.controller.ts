import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  ParseIntPipe,
} from '@nestjs/common';

import { UpdateStatusDto } from './dto/update-status.dto';

import { TodayTasksService } from './today-tasks.service';

import { CreateTodayTaskDto } from './dto/create-today-task.dto';

@Controller('today-tasks')
export class TodayTasksController {
  constructor(private readonly todayTasksService: TodayTasksService) {}

  @Post()
  create(
    @Body()
    createTodayTaskDto: CreateTodayTaskDto,
  ) {
    return this.todayTasksService.create(createTodayTaskDto);
  }

  @Get()
  findAll() {
    return this.todayTasksService.findAll();
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    updateStatusDto: UpdateStatusDto,
  ) {
    return this.todayTasksService.updateStatus(id, updateStatusDto);
  }
}
