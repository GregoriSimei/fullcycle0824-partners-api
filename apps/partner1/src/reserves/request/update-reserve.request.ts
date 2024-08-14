import { PartialType } from '@nestjs/mapped-types';
import { CreateReserveRequest } from './create-reserve.request';

export class UpdateReserveRequest extends PartialType(CreateReserveRequest) {}
