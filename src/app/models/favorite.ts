import { Ticket } from "./ticket";
import { User } from "./user";

export interface Favorite {
    id: number;
    ticketId: number;
    userId: string;
    ticket: Ticket;
    user: User;
}
