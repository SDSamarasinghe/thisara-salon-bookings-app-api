import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServicesController } from './services.controller';
import { ServicesService } from './services.service';
import { Services, ServicesSchema } from './services.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Services.name, schema: ServicesSchema }])],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule {}
