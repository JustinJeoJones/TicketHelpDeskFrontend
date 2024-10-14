import { Category } from "./category";
import { User } from "./user";

export interface Ticket {
    id: number;
    problem: string;
    resolution: string;
    completed: boolean;
    priority: string;
    authorId: string;
    resolverId: string;
    date: Date;
    categoryId: number;
    author: User;
    resolver: User;
    category: Category;
}
