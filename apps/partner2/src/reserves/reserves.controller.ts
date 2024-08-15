import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ReservesService } from '@app/core/reserves/reserves.service';
import { CreateReserveRequest } from './request/create-reserve.request';
import { UpdateReserveRequest } from './request/update-reserve.request';
import { AuthGuard } from '@app/core/auth/auth.guard';

@Controller('partner2/events/:id/reserves')
export class ReservesController {
  constructor(private readonly reservesService: ReservesService) {}

  @UseGuards(AuthGuard)
  @Post('')
  create(
    @Body() createReserveRequest: CreateReserveRequest,
    @Param('id') eventId: string,
  ) {
    return this.reservesService.create({ ...createReserveRequest, eventId });
  }

  @Get()
  findAll() {
    return this.reservesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reservesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReserveRequest: UpdateReserveRequest,
  ) {
    return this.reservesService.update(+id, updateReserveRequest);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reservesService.remove(+id);
  }
}
