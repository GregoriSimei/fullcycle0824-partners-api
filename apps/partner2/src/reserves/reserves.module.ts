import { Module } from '@nestjs/common';
import { ReservesCoreModule } from '@app/core/reserves/reserves-core.module';
import { ReservesController } from './reserves.controller';

@Module({
  imports: [ReservesCoreModule],
  controllers: [ReservesController],
})
export class ReservesModule {}
