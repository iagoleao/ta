import { GroupModality } from '@prisma/client';
import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateGroupDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  @IsNotEmpty()
  date: Date;

  @IsNumber()
  @IsNotEmpty()
  weekDay: number;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @IsUUID()
  @IsNotEmpty()
  subjectId: string | null;

  @IsDateString()
  startDate: Date | null;

  @IsDateString()
  startTime: Date | null;

  @IsString()
  whatsappHash: string | null;

  @IsEnum(GroupModality)
  modality: GroupModality | null;

  @IsString()
  teacher: string | null;
}
