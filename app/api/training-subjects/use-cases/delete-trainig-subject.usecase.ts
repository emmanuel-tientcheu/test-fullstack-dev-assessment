import { TrainingSubjectRepository } from "../repository/training-subject.repository";

export class DeleteTrainingSubjectUseCase {
  constructor(private readonly repo: TrainingSubjectRepository) {}

  async execute(id: number): Promise<void> {
    await this.repo.deleteById(id);
  }
}
