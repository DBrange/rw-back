import { UserEntity } from "src/containers/users/entities/user.entity";

export interface Broker {
    id: number;
    nombre: string;
    user: UserEntity;
}