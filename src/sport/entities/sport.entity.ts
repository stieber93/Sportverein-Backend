import { TrainingSession } from 'src/training-session/entities/training-session.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Sport {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: String;

    //Relations
    @OneToMany(() => TrainingSession, (trainingSession) => trainingSession.sport)
    trainingSessions: TrainingSession[]
}
