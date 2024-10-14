import { User } from "./user";

export interface Comment {
    id: number;
    ticketId: number;
    authorId: string;
    message: string;
    date: Date;
    author: User;
}
