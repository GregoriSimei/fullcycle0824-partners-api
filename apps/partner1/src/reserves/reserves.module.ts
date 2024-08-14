import { Module } from '@nestjs/common';
import { ReservesService } from '@app/core/reserves/reserves.service';
import { ReservesController } from './reserves.controller';

@Module({
  controllers: [ReservesController],
  providers: [ReservesService],
})
export class ReservesModule {}
