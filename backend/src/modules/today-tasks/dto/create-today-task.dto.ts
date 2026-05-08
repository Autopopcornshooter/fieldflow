import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateTodayTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  location?: string;
}
