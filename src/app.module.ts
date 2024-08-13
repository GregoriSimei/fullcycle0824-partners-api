import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsModule } from './events/events.module';
import { PrismaModule } from './prisma/prisma.module';
import { SpotsModule } from './spots/spots.module';
import { ReservesModule } from './reserves/reserves.module';

@Module({
  imports: [EventsModule, PrismaModule, SpotsModule, ReservesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
