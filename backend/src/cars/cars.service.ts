import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CarsService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return this.prisma.car.findMany({
      orderBy: { id: 'desc' },
    });
  }

  findOne(id: number) {
    return this.prisma.car.findUnique({ where: { id } });
  }

  create(data: {
    title: string;
    make: string;
    model: string;
    year: number;
    price: number;
    mileage: string;
    fuel: string;
    transmission: string;
    condition: string;
    location: string;
    description: string;
    image: string;
    sellerName: string;
    sellerPhone: string;
    sellerEmail: string;
  }) {
    return this.prisma.car.create({ data });
  }
  remove(id: number) {
    return this.prisma.car.delete({ where: { id } });
  }
}