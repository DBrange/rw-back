import { AssetEntity } from "src/containers/asset/entities/asset.entity";
import { BrokerRegister } from "./broker-register.interface";
import { Client } from "./client.interface";

export interface IUser {
    
     name: string;
     lastName: string;
     birthDate: Date;
     phoneNumber: string;
     email: string;
     altEmail: string;
     password: string;
     gender: string;
     dni: string;
     address: string;
     role: string;
    //  asset: AssetEntity[];
    //  clients: Client[];
    //  brokerRegisters: BrokerRegister[];
};
 