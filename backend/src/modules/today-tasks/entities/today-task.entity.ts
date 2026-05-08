import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TodayTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({
    default: 'pending',
  })
  status: string;

  @Column({
    nullable: true,
  })
  location: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}