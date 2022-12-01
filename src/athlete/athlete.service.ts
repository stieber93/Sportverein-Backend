import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAthleteDto } from './dto/create-athlete.dto';
import { UpdateAthleteDto } from './dto/update-athlete.dto';
import { Athlete } from './entities/athlete.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AthleteService {
  constructor(
    @InjectRepository(Athlete)
    private athleteRepository: Repository<Athlete>,
  ) {}
  
  create(createAthleteDto: CreateAthleteDto): Promise<Athlete> {
    const newAthlete = this.athleteRepository.create(createAthleteDto);
    return this.athleteRepository.save(newAthlete);
  }

  findAll(): Promise<Athlete[]> {
    return this.athleteRepository.find();
  }

  async findOne(id: number): Promise<Athlete> {
    const found = await this.athleteRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Sportler mit der ID: "${id}" konnte nicht gefunden werden!`);
    } else {
      return found;
    }
  }

  async update(id: number, updateAthleteDto: UpdateAthleteDto): Promise<Athlete> {
    const athlete = await this.findOne(id);
    athlete.firstname = updateAthleteDto.firstname;
    athlete.lastname = updateAthleteDto.lastname;
    return this.athleteRepository.save(athlete);
  }

  async remove(id: number): Promise<void> {
    await this.athleteRepository.delete(id);
  }
}
