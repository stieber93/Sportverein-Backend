import { Module } from '@nestjs/common';
import { TrainingSessionService } from './training-session.service';
import { TrainingSessionController } from './training-session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainingSession } from './entities/training-session.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TrainingSession])],
  controllers: [TrainingSessionController],
  providers: [TrainingSessionService]
})
export class TrainingSessionModule {}
