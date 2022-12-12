import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'User'})
export class UserEntity {

    @PrimaryGeneratedColumn({name: 'id_user', type: 'int'})
    id: number;

    @Column({name: 'first_name', length: 40, nullable: false})
    name: string;

    @Column({name: 'last_name', length: 40, nullable: false})
    lastName: string;

    @Column({name: 'email', length: 100, unique: true, nullable: false})
    email: string;

    @Column({name: 'phone_number', length:11, unique: true, nullable: false})
    phoneNumber: string;

    @Column({name: 'password'})
    password: string;
}
