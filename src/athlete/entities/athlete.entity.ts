import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Athlete {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    firstname: String;

    @Column({ length: 500 })
    lastname: String;
}
