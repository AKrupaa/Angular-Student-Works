import { Event } from "./event";

export class Ticket {
  id: number;
  taken: boolean;
  price: number;
  event: Event;
}
