import { Module } from '@nestjs/common';
import { AthleteService } from './athlete.service';
import { AthleteController } from './athlete.controller';

@Module({
  controllers: [AthleteController],
  providers: [AthleteService]
})
export class AthleteModule {}
