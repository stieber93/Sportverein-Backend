import { Athlete } from 'src/athlete/entities/athlete.entity';
import { Performance } from 'src/performance/entities/performance.entity';
import { Sport } from 'src/sport/entities/sport.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class TrainingSession {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: String;

    @Column()
    startTime: String;

    @Column()
    endTime: String;

    //Relations
    @ManyToOne(() => Athlete, (athlete) => athlete.id, {onDelete: "SET NULL"})
    athlete: Athlete

    @ManyToOne(() => Sport, (sport) => sport.id, {onDelete: "SET NULL"})
    sport: Sport

    @OneToMany(() => Performance, (performance) => performance.trainingSession)
    performances: Performance[]
}
