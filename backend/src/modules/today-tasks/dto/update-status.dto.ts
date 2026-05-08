import { IsString, IsIn } from 'class-validator';

export class UpdateStatusDto {
  @IsString()
  @IsIn(['pending', 'in_progress', 'completed', 'cancelled', 'issue'])
  status: string;
}
