import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+94 123 456 789' })
  @IsString()
  phoneNumber: string;

  @ApiProperty({ example: 'Haircut' })
  @IsString()
  service: string;

  @ApiProperty({ example: '2025-04-26' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: '10:00 AM' })
  @IsString()
  timeSlot: string;

  @ApiProperty({ example: 'Please be gentle with my hair.', required: false })
  @IsOptional()
  @IsString()
  specialNotes?: string;
}
