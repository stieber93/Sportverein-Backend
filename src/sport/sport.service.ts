import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSportDto } from './dto/create-sport.dto';
import { UpdateSportDto } from './dto/update-sport.dto';
import { Sport } from './entities/sport.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SportService {
  constructor(
    @InjectRepository(Sport)
    private sportRepository: Repository<Sport>,
  ) {}

  create(createSportDto: CreateSportDto): Promise<Sport> {
    const newSport = this.sportRepository.create(createSportDto);
    return this.sportRepository.save(newSport);;
  }

  findAll(): Promise<Sport[]> {
    return this.sportRepository.find();
  }

  async findOne(id: number): Promise<Sport> {
    const found = await this.sportRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Sport mit der ID: "${id}" konnte nicht gefunden werden!`)
    } else {
      return found;
    }
  }

  async update(id: number, updateSportDto: UpdateSportDto): Promise<Sport> {
    const sport = await this.findOne(id);
    sport.title = updateSportDto.title;
    return this.sportRepository.save(sport);
  }

  async remove(id: number): Promise<void> {
    await this.sportRepository.delete(id);
  }
}
