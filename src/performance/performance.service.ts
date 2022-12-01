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

  create(createPerformanceDto: CreatePerformanceDto): Promise<Performance> {
    const newPerformance = this.performanceRepository.create(createPerformanceDto);
    return this.performanceRepository.save(newPerformance);
  }

  findAll(): Promise<Performance[]> {
    return this.performanceRepository.find({
      relations: ["trainingSession"]
    });
  }

  async findOne(id: number): Promise<Performance> {
    const found = await this.performanceRepository.findOne({
      where: {id},
      relations: ["trainingSession"]
    });
    if (!found) {
      throw new NotFoundException(`Leistung mit der ID: "${id}" konnte nicht gefunden werden!`);
    } else {
      return found;
    }
  }

  async update(id: number, updatePerformanceDto: UpdatePerformanceDto): Promise<Performance> {
    const performance = await this.findOne(id);
    performance.reachedPerformance = updatePerformanceDto.reachedPerformance;
    return this.performanceRepository.save(performance);
  }

  async remove(id: number): Promise<void> {
    await this.performanceRepository.delete(id);
  }
}
