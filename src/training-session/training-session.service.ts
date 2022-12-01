import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrainingSessionDto } from './dto/create-training-session.dto';
import { UpdateTrainingSessionDto } from './dto/update-training-session.dto';
import { TrainingSession } from './entities/training-session.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TrainingSessionService {
  constructor(
    @InjectRepository(TrainingSession)
    private trainingSessionRepository: Repository<TrainingSession>,
  ) {}

  create(createTrainingSessionDto: CreateTrainingSessionDto): Promise<TrainingSession> {
    const newTrainingSession = this.trainingSessionRepository.create(createTrainingSessionDto);
    return this.trainingSessionRepository.save(newTrainingSession);
  }

  findAll(): Promise<TrainingSession[]> {
    return this.trainingSessionRepository.find({
      relations: ["athlete", "sport"]
    });
  }

  async findOne(id: number): Promise<TrainingSession> {
    const found = await this.trainingSessionRepository.findOne({
      where: {id},
      relations: ["athlete", "sport"]
    });
    if (!found) {
      throw new NotFoundException(`Trainingseinheit mit der ID: "${id}" konnte nicht gefunden werden!`);
    } else {
      return found;
    }
  }

  async update(id: number, updateTrainingSessionDto: UpdateTrainingSessionDto): Promise<TrainingSession> {
    const trainingSession = await this.findOne(id);
    trainingSession.date = updateTrainingSessionDto.date;
    trainingSession.startTime = updateTrainingSessionDto.startTime;
    trainingSession.endTime = updateTrainingSessionDto.endTime;
    return this.trainingSessionRepository.save(trainingSession);
  }

  async remove(id: number): Promise<void> {
    await this.trainingSessionRepository.delete(id);
  }
}
