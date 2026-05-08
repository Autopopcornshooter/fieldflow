import { UpdateTodayTaskDto } from './dto/update-today-task.dto';
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
  //task 생성
  async create(createTodayTaskDto: CreateTodayTaskDto) {
    const todayTask = this.todayTaskRepository.create(createTodayTaskDto);

    return await this.todayTaskRepository.save(todayTask);
  }
  //task 수정
  async update(id: number, updateTodayTaskDto: UpdateTodayTaskDto) {
    await this.todayTaskRepository.update(id, updateTodayTaskDto);

    return await this.todayTaskRepository.findOne({
      where: {
        id,
      },
    });
  }
  //task 확인
  async findAll() {
    return await this.todayTaskRepository.find({
      order: {
        created_at: 'DESC',
      },
    });
  }
  //task 상태 변경
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
  //task 삭제
  async remove(id: number) {
    await this.todayTaskRepository.delete(id);

    return {
      message: '삭제 완료',
    };
  }
}
