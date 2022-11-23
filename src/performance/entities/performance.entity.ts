import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Performance {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    reachedPerformance: String;
}
