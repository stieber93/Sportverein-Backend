import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePerformanceDto } from './dto/create-performance.dto';
import { UpdatePerformanceDto } from './dto/update-performance.dto';
import { Performance } from './entities/performance.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PerformanceService {
  constructor(
    @InjectRepository(Performance)
    private performanceRepository: Repository<Performance>,
  ) {}

  create(createPerformanceDto: CreatePerformanceDto) {
    const newPerformance = this.performanceRepository.create({
      reachedPerformance: createPerformanceDto.reachedPerformance,
      trainingSession: {
        id: createPerformanceDto.trainingSessionId,
      },
    });
    return this.performanceRepository.save(newPerformance);
  }

  findAll() {
    return this.performanceRepository.find({
      relations: {
        trainingSession: true,
      }
    });
  }

  async findOne(id: number) {
    const found = await this.performanceRepository.findOne({
      where: {id},
      relations: {
        trainingSession: true,
      }
    });
    if (!found) {
      throw new NotFoundException(`Leistung mit der ID: "${id}" konnte nicht gefunden werden!`);
    } else {
      return found;
    }
  }
  
  async update(id: number, updatePerformanceDto: UpdatePerformanceDto) {
    const performance = await this.findOne(id);
    return this.performanceRepository.save({ ...performance, ...updatePerformanceDto});
  }

  async remove(id: number) {
    const performance = await this.findOne(id);
    return this.performanceRepository.remove(performance);
  }
}
