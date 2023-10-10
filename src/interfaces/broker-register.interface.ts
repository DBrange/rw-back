import { UserEntity } from "src/containers/users/entities/user.entity";


export interface BrokerRegister {
    id: number;
    razonSocial: string;
    matricula: string;
    tarjeta: string;
    user: UserEntity;
}
