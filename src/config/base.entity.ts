import { CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export abstract class BaseEntity {
     @PrimaryGeneratedColumn('uuid')
     id: string;

     @CreateDateColumn({
          type: 'timestamp',
          name: 'created_at',
     })
     creater_at: Date;

     @UpdateDateColumn({
          type: 'timestamp',
          name: 'updated_at',
     })
     updated_at: Date;

     

     
};