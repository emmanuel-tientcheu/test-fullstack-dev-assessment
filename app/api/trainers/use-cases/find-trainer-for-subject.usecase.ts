import { Trainer } from "@prisma/client";
import { TrainerRepository } from "../repository/trainners.repository";
import { TrainingSubjectRepository } from "../../training-subjects/repository/training-subject.repository";

export interface FindBestTrainersForSubjectDTO {
  subjectId: number;
}

export class FindBestTrainersForSubjectUseCase {
  constructor(
    private trainerRepository: TrainerRepository,
    private trainingSubjectRepository: TrainingSubjectRepository,
  ) {}

  async execute(data: FindBestTrainersForSubjectDTO): Promise<Trainer[]> {
    console.log(data.subjectId);
    const subject = await this.trainingSubjectRepository.findById(
      data.subjectId,
    );

    if (!subject) {
      throw new Error("Training subject not found");
    }

    const trainers = await this.trainerRepository.findTrainersBySubjectId(
      data.subjectId,
    );

    return trainers;
  }
}
