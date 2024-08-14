import { Module } from '@nestjs/common';
import { ReservesService } from './reserves.service';

@Module({
  providers: [ReservesService],
  exports: [ReservesService],
})
export class ReservesCoreModule {}
