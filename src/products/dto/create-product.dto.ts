import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Min, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Shampoo' })
  @IsString()
  name: string;

  @ApiProperty({ example: 15 })
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ example: 'Cleans and nourishes hair', required: false })
  @IsString()
  @IsOptional()
  description?: string;
}
