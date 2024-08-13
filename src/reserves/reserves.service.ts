import { Injectable } from '@nestjs/common';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { UpdateReserveDto } from './dto/update-reserve.dto';
import { Prisma, SpotStatus, TicketStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReservesService {
  constructor(private prismaService: PrismaService) {}

  async create(createReserveDto: CreateReserveDto) {
    const spots = await this.prismaService.spot.findMany({
      where: {
        name: {
          in: createReserveDto.spots,
        },
      },
    });

    if (spots.length != createReserveDto.spots.length) {
      const notFoundSpots = createReserveDto.spots.filter((spotName) => {
        const spotWasFound = spots.some((spot) => spot.name == spotName);
        return !spotWasFound;
      });

      throw new Error(`Spots ${notFoundSpots.join(',')} not found`);
    }

    try {
      const tickets = await this.prismaService.$transaction(
        async (prisma) => {
          await prisma.reservationHistory.createMany({
            data: spots.map((spot) => {
              return {
                spotId: spot.id,
                ticketKind: createReserveDto.ticket_kind,
                email: createReserveDto.email,
                status: TicketStatus.reserved,
              };
            }),
          });

          await prisma.spot.updateMany({
            where: {
              id: {
                in: spots.map((spot) => spot.id),
              },
            },
            data: {
              status: SpotStatus.reserved,
            },
          });

          const tickets = await Promise.all(
            spots.map(async (spot) => {
              return await prisma.ticket.create({
                data: {
                  spotId: spot.id,
                  ticketKind: createReserveDto.ticket_kind,
                  email: createReserveDto.email,
                },
              });
            }),
          );
          return tickets;
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted },
      );
      return tickets;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2002': // unique cconstraint violation
          case 'P2034': // transaction conflict
            throw new Error('Some spots are already reserved');
        }
        throw e;
      }
    }
  }

  findAll(eventId: string) {
    return this.prismaService.reservationHistory.findMany({});
  }

  findOne(id: number) {
    return `This action returns a #${id} reserve`;
  }

  update(id: number, updateReserveDto: UpdateReserveDto) {
    return `This action updates a #${id} reserve`;
  }

  remove(id: number) {
    return `This action removes a #${id} reserve`;
  }
}
