import { IsOptional, IsString } from 'class-validator';

export class UpdateTodayTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  location?: string;
}
