import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class TrainingSession {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column()
    startTime: String;

    @Column()
    endTime: String;
}
