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

  create(createSportDto: CreateSportDto) {
    const newSport = this.sportRepository.create({
      title: createSportDto.title,
    });
    return this.sportRepository.save(newSport);
  }

  findAll() {
    return this.sportRepository.find();
  }

  async findOne(id: number) {
    const found = await this.sportRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Sport mit der ID: "${id}" konnte nicht gefunden werden!`)
    } else {
      return found;
    }
  }
  
  async update(id: number, updateSportDto: UpdateSportDto) {
    const sport = await this.findOne(id);
    return this.sportRepository.save({ ...sport, ...updateSportDto});
  }

  async remove(id: number) {
    const sport = await this.findOne(id);
    return this.sportRepository.remove(sport);
  }
}
