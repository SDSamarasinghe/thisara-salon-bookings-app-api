import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterAdminDto {
  @ApiProperty({ example: 'admin@example.com' })
  @IsEmail()
  readonly email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  readonly password: string;
}
