import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sport {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: String;
}
