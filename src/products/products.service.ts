import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async updateProduct(id: string, updateDto: Partial<CreateProductDto>): Promise<Product | null> {
    return this.productModel.findByIdAndUpdate(id, updateDto, { new: true });
  }

  async deleteProduct(id: string): Promise<Product | null> {
    return this.productModel.findByIdAndDelete(id);
  }

  async getAllProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }
}
