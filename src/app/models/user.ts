import { Role } from "./role";

export interface User {
    googleId: string;
    username: string;
    pfp: string;
    roleId?: number;
    role?: Role;
}
