import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, IsOptional } from 'class-validator';

export class CreateServiceDto {
  @ApiProperty({ example: 'Haircut' })
  @IsString()
  name: string;

  @ApiProperty({ example: '1 hour' })
  @IsString()
  duration: string;

  @ApiProperty({ example: 'https://images.unsplash.com/photo-1560066984-138dadb4c035', required: false })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({ example: 20 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 'Basic haircut for men and women', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
