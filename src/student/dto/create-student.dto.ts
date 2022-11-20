import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { IsDate } from '@app/utils/decorators/validators';

export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  whatsapp: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty()
  bornDate: Date;
}
