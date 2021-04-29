import { Ticket } from "./ticket";

export class Account {
  id: number;
  login: string;
  password: string;
  tickets: Ticket[];

  // constructor(id: number, login: string, password: string, tickets: Set<Ticket>) {
  //   this.id = id;
  //   this.login = login;
  //   this.password = password;
  //   this.tickets = tickets;
  // }
}
