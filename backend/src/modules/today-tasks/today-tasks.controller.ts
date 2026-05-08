import {
  Controller,
  Post,
  Body,
  Get,
} from '@nestjs/common';

import { TodayTasksService } from './today-tasks.service';

import { CreateTodayTaskDto } from './dto/create-today-task.dto';

@Controller('today-tasks')
export class TodayTasksController {
  constructor(
    private readonly todayTasksService: TodayTasksService,
  ) {}

  @Post()
  create(
    @Body()
    createTodayTaskDto: CreateTodayTaskDto,
  ) {
    return this.todayTasksService.create(
      createTodayTaskDto,
    );
  }

  @Get()
  findAll() {
    return this.todayTasksService.findAll();
  }
}