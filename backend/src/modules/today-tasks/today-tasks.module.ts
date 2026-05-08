import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TodayTasksController } from './today-tasks.controller';
import { TodayTasksService } from './today-tasks.service';

import { TodayTask } from './entities/today-task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodayTask])],

  controllers: [TodayTasksController],

  providers: [TodayTasksService],
})
export class TodayTasksModule {}
