import { UserEntity } from "src/containers/user/entities/user.entity";


export interface BrokerRegister {
    id: number;
    razonSocial: string;
    matricula: string;
    tarjeta: string;
    user: UserEntity;
}
