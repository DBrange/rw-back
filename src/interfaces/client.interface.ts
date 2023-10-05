import { User } from "../containers/users/entities/user.entity";

export interface Client {
    id: number;
    nombre: string;
    user: User;
}
