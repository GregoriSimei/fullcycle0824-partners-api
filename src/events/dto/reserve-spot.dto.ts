import { TicketKind } from '@prisma/client';

export class ReserveSpotDTO {
  spots: string[]; // ['A1','A2']
  ticket_kind: TicketKind;
  email: string;
}
