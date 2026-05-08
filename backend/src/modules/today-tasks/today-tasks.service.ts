import { UpdateStatusDto } from './dto/update-status.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { TodayTask } from './entities/today-task.entity';

import { CreateTodayTaskDto } from './dto/create-today-task.dto';

@Injectable()
export class TodayTasksService {
  constructor(
    @InjectRepository(TodayTask)
    private todayTaskRepository: Repository<TodayTask>,
  ) {}

  async create(createTodayTaskDto: CreateTodayTaskDto) {
    const todayTask = this.todayTaskRepository.create(createTodayTaskDto);

    return await this.todayTaskRepository.save(todayTask);
  }

  async findAll() {
    return await this.todayTaskRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
  }

  async updateStatus(id: number, updateStatusDto: UpdateStatusDto) {
    await this.todayTaskRepository.update(id, {
      status: updateStatusDto.status,
    });

    return await this.todayTaskRepository.findOne({
      where: {
        id,
      },
    });
  }
}
