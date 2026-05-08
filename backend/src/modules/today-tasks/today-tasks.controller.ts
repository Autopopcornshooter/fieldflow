import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Param,
  ParseIntPipe,
  Delete,
} from '@nestjs/common';

import { UpdateTodayTaskDto } from './dto/update-today-task.dto';

import { UpdateStatusDto } from './dto/update-status.dto';

import { TodayTasksService } from './today-tasks.service';

import { CreateTodayTaskDto } from './dto/create-today-task.dto';

@Controller('today-tasks')
export class TodayTasksController {
  constructor(private readonly todayTasksService: TodayTasksService) {}

  @Post() //task 추가
  create(
    @Body()
    createTodayTaskDto: CreateTodayTaskDto,
  ) {
    return this.todayTasksService.create(createTodayTaskDto);
  }

  @Get() //task 확인(id)
  findAll() {
    return this.todayTasksService.findAll();
  }

  @Patch(':id/status') //task 상태 변경
  updateStatus(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    updateStatusDto: UpdateStatusDto,
  ) {
    return this.todayTasksService.updateStatus(id, updateStatusDto);
  }

  @Patch(':id') //task 수정
  update(
    @Param('id', ParseIntPipe)
    id: number,

    @Body()
    updateTodayTaskDto: UpdateTodayTaskDto,
  ) {
    return this.todayTasksService.update(id, updateTodayTaskDto);
  }

  @Delete(':id') //task 삭제
  remove(
    @Param('id', ParseIntPipe)
    id: number,
  ) {
    return this.todayTasksService.remove(id);
  }
}
