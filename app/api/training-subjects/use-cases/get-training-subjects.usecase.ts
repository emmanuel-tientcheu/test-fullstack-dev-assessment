import { TrainingSubjectRepository } from "../repository/training-subject.repository";

export class GetAllTrainingSubjectsUseCase {
  constructor(private repo: TrainingSubjectRepository) {}

  async execute() {
    const subjects = await this.repo.getAllWithTrainers();
    return subjects;
  }
}
