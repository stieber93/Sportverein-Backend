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
  
  create(createTrainingSessionDto: CreateTrainingSessionDto) {
    const newTrainingSession = this.trainingSessionRepository.create({
      date: createTrainingSessionDto.date,
      startTime: createTrainingSessionDto.startTime,
      endTime: createTrainingSessionDto.endTime,
      athlete: {
        id: createTrainingSessionDto.athleteId,
      },
      sport: {
        id: createTrainingSessionDto.sportId,
      },
    });
    return this.trainingSessionRepository.save(newTrainingSession);
  }

  findAll() {
    return this.trainingSessionRepository.find({
      relations: {
        athlete: true,
        sport: true,
      }
    });
  }

  findOne(id: number) {
    const found = this.trainingSessionRepository.findOne({
      where: {id},
      relations: {
        athlete: true,
        sport: true,
      }
    });
    if (!found) {
      throw new NotFoundException(`Trainingseinheit mit der ID: "${id}" konnte nicht gefunden werden!`);
    } else {
      return found;
    }
  }

  async update(id: number, updateTrainingSessionDto: UpdateTrainingSessionDto) {
    const trainingSession = await this.findOne(id);
    return this.trainingSessionRepository.save({ ...trainingSession, ...updateTrainingSessionDto});
  }

  async remove(id: number) {
    const trainingSession = await this.findOne(id);
    return this.trainingSessionRepository.remove(trainingSession);
  }
}
