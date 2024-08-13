import { Injectable } from '@nestjs/common';
import { CreateSpotDto } from './dto/create-spot.dto';
import { UpdateSpotDto } from './dto/update-spot.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SpotStatus } from '@prisma/client';

@Injectable()
export class SpotsService {
  constructor(private prismaService: PrismaService) {}

  async create(eventId: string, createSpotDto: CreateSpotDto) {
    const event = await this.prismaService.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!event) {
      throw new Error('Invalid event');
    }

    return this.prismaService.spot.create({
      data: {
        ...createSpotDto,
        eventId,
        status: SpotStatus.available,
      },
    });
  }

  findAll(eventId: string) {
    return this.prismaService.spot.findMany({
      where: {
        eventId,
      },
    });
  }

  findOne(eventId: string, spotId: string) {
    return this.prismaService.spot.findUnique({
      where: {
        eventId,
        id: spotId,
      },
    });
  }

  update(eventId: string, spotId: string, updateSpotDto: UpdateSpotDto) {
    return this.prismaService.spot.update({
      data: updateSpotDto,
      where: {
        eventId,
        id: spotId,
      },
    });
  }

  remove(eventId: string, spotId: string) {
    return this.prismaService.spot.delete({
      where: {
        id: spotId,
        eventId: eventId,
      },
    });
  }
}
