import { TrainingSession } from 'src/training-session/entities/training-session.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class Athlete {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 500 })
    firstname: String;

    @Column({ length: 500 })
    lastname: String;

    //Relations
    @OneToMany(() => TrainingSession, (trainingSession) => trainingSession.athlete)
    trainingSessions: TrainingSession[]
}
