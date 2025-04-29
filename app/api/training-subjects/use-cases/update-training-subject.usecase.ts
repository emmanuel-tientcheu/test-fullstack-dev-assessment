import { UpdateTrainingSubjectDTO } from "../dto/update-training-subject.dto";
import { TrainingSubject } from "@prisma/client";
import { TrainingSubjectRepository } from "../repository/training-subject.repository";

export class UpdateTrainingSubjectUseCase {
  constructor(private readonly repo: TrainingSubjectRepository) {}

  async execute(
    id: number,
    data: UpdateTrainingSubjectDTO,
  ): Promise<TrainingSubject> {
    return this.repo.update(id, data);
  }
}
