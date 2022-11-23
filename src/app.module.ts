import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PerformanceModule } from './performance/performance.module';
import { AthleteModule } from './athlete/athlete.module';
import { SportModule } from './sport/sport.module';
import { TrainingSessionModule } from './training-session/training-session.module';

@Module({
  imports: [PerformanceModule, AthleteModule, SportModule, TrainingSessionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
