import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAthleteDto } from './dto/create-athlete.dto';
import { UpdateAthleteDto } from './dto/update-athlete.dto';
import { Athlete } from './entities/athlete.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable() // @Injectable() tells Nest that this is a class, that can have dependencies
export class AthleteService {
  constructor(
    // Injects the Athlete Repository into the Athlete Service
    @InjectRepository(Athlete)
    private athleteRepository: Repository<Athlete>,
  ) {}
  
  /**
   * CRUD Method "CREATE" to create a new athlete
   * @author Steffen Reuter
   * @param createAthleteDto 
   * @returns new created athlete
   */
  create(createAthleteDto: CreateAthleteDto): Promise<Athlete> {
    const newAthlete = this.athleteRepository.create(createAthleteDto); // creates new athlete
    return this.athleteRepository.save(newAthlete);
  }

  /**
   * CRUD Method "findAll (READ)" to read all athletes
   * @author Steffen Reuter
   * @returns all athletes 
   */
  findAll(): Promise<Athlete[]> {
    return this.athleteRepository.find();
  }

  /**
   * CRUD Method "findOne (READ)" to read a specific athlete
   * @author Steffen Reuter
   * @param id 
   * @returns a specific athlete or error if not found
   */
  async findOne(id: number): Promise<Athlete> {
    // searching a specific athelte --> if found, return this athlete / if not found, throw exception error
    const found = await this.athleteRepository.findOneBy({ id });
    if (!found) {
      throw new NotFoundException(`Sportler mit der ID: "${id}" konnte nicht gefunden werden!`);
    } else {
      return found;
    }
  }

  /**
   * CRUD Method "UPDATE" to update an existing athlete
   * @author Steffen Reuter
   * @param id 
   * @param updateAthleteDto 
   * @returns the updated athlete
   */
  async update(id: number, updateAthleteDto: UpdateAthleteDto): Promise<Athlete> {
    // searching a specific athlete by id --> changing one or more properties --> return updated athlete
    const athlete = await this.findOne(id);
    athlete.firstname = updateAthleteDto.firstname;
    athlete.lastname = updateAthleteDto.lastname;
    return this.athleteRepository.save(athlete);
  }

  /**
   * CRUD Method "DELETE" to delete an existing athlete
   * @author Steffen Reuter
   * @param id 
   */
  async remove(id: number): Promise<void> {
    await this.athleteRepository.delete(id);
  }
}
