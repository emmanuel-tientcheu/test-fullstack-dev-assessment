import { TrainerRepository } from "../repository/trainners.repository";

export class DeleteTrainerUseCase {
  constructor(private trainerRepository: TrainerRepository) {}

  async execute(id: number): Promise<void> {
    if (!id || isNaN(id)) {
      throw new Error("A valid trainer ID must be provided.");
    }

    await this.trainerRepository.deleteTrainer(id);
  }
}
