import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-product.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @Roles('admin')
  @UseGuards(RolesGuard)
  async addProduct(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.createProduct(createServiceDto);
  }

  @Get()
  async getAllServices() {
    return this.servicesService.getAllServices();
  }
}
