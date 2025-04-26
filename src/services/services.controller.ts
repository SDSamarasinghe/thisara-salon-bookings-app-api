import { Controller, Post, Body, UseGuards, Get, Delete, Patch, Param } from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-product.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Post()
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async addService(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.createProduct(createServiceDto);
  }

  @Get()
  async getAllServices() {
    return this.servicesService.getAllServices();
  }

  @Patch(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateService(
    @Param('id') id: string,
    @Body() updateDto: Partial<CreateServiceDto>,
  ) {
    return this.servicesService.updateService(id, updateDto);
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteService(@Param('id') id: string) {
    return this.servicesService.deleteService(id);
  }
}
