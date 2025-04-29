import { TrainingSubject } from "@prisma/client";
import { TrainingSubjectRepository } from "../repository/training-subject.repository";

export class GetTrainingSubjectByIdUseCase {
  private repository: TrainingSubjectRepository;

  constructor(repository: TrainingSubjectRepository) {
    this.repository = repository;
  }

  async execute(id: number): Promise<TrainingSubject | null> {
    if (!id || isNaN(id)) {
      throw new Error("Invalid training subject ID");
    }

    const subject = await this.repository.findById(id);
    return subject;
  }
}
