import { UserEntity } from "src/containers/user/entities/user.entity";

export interface Broker {
    id: number;
    nombre: string;
    user: UserEntity;
}
