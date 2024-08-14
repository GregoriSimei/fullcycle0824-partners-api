import { Module } from '@nestjs/common';
import { EventsModule } from './events/events.module';
import { SpotsModule } from './spots/spots.module';
import { ReservesModule } from './reserves/reserves.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env.partner2' }),
    EventsModule,
    SpotsModule,
    ReservesModule,
  ],
})
export class Partner2Module {}
