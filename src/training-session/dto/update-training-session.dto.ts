import { PartialType } from '@nestjs/mapped-types';
import { CreateTrainingSessionDto } from './create-training-session.dto';

export class UpdateTrainingSessionDto extends PartialType(CreateTrainingSessionDto) {
    date?: Date;
    startTime?: String;
    endTime?: String;

    athleteId?: number;
    sportId?: number;
}
