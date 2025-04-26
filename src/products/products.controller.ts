import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Delete,
  Param,
  G,
  e,
  t,
} from '@nestjs/common';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles('admin')
  @UseGuards(RolesGuard)
  async addProduct(@Body() createProductDto: CreateProductDto) {
    return this.productsService.createProduct(createProductDto);
  }

  @Patch(':id')
  @Roles('admin')
  @UseGuards(RolesGuard)
  async updateProduct(
    @Param('id') id: string,
    @Body() updateDto: Partial<CreateProductDto>,
  ) {
    return this.productsService.updateProduct(id, updateDto);
  }

  @Get()
  async getAllProducts() {
    return this.productsService.getAllProducts();
  }

  @Delete(':id')
  @Roles('admin')
  @UseGuards(RolesGuard)
  async deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }
}
