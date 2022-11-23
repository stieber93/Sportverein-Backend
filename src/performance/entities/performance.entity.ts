import { TrainingSession } from 'src/training-session/entities/training-session.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

@Entity()
export class Performance {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    reachedPerformance: String;

    //Relations
    @ManyToOne(() => TrainingSession, (trainingSession) => trainingSession.id)
    trainingSession: TrainingSession
}
