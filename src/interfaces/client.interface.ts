import { UserEntity } from "src/containers/user/entities/user.entity";

export interface Client {
    id: number;
    nombre: string;
    user: UserEntity;
}
