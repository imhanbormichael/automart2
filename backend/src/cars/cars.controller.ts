import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CarsService } from './cars.service';

@Controller('cars')
export class CarsController {
  constructor(private cars: CarsService) {}

  @Get()
  findAll() {
    return this.cars.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cars.findOne(Number(id));
  }

  @Post()
  create(@Body() body: any) {
    return this.cars.create({
      title: body.title,
      make: body.make,
      model: body.model,
      year: Number(body.year),
      price: Number(body.price),
      mileage: String(body.mileage),
      fuel: body.fuel,
      transmission: body.transmission,
      condition: body.condition,
      location: body.location,
      description: body.description,
      image: body.image,
      sellerName: body.sellerName,
      sellerPhone: body.sellerPhone,
      sellerEmail: body.sellerEmail,
    });
    
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cars.remove(Number(id));
  }
}