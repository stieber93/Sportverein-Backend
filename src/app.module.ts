import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PerformanceModule } from './performance/performance.module';
import { AthleteModule } from './athlete/athlete.module';
import { SportModule } from './sport/sport.module';
import { TrainingSessionModule } from './training-session/training-session.module';
import { Athlete } from './athlete/entities/athlete.entity';
import { Performance } from './performance/entities/performance.entity';
import { Sport } from './sport/entities/sport.entity';
import { TrainingSession } from './training-session/entities/training-session.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'sportverein',
      entities: [
        Athlete,
        Performance,
        Sport,
        TrainingSession,
      ],
      synchronize: true, //Setting synchronize: true shouldn't be used in production - otherwise you can lose production data. 
      autoLoadEntities: true,
    }),
    PerformanceModule,
    AthleteModule,
    SportModule,
    TrainingSessionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
