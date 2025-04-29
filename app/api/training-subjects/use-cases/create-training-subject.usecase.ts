import { TrainingSubject } from "@prisma/client";
import { TrainingSubjectRepository } from "../repository/training-subject.repository";
import { CreateTrainingSubjectDTO } from "../dto/create-training-subject-dto";

export class CreateTrainingSubjectUseCase {
  constructor(private repo: TrainingSubjectRepository) {}

  async execute(data: CreateTrainingSubjectDTO): Promise<TrainingSubject> {
    return await this.repo.create(data);
  }
}
