import { TrainerRepository } from "../repository/trainners.repository";
import { Trainer } from "@prisma/client";

export class GetTrainerUseCase {
  private trainerRepository: TrainerRepository;

  constructor(trainerRepository: TrainerRepository) {
    this.trainerRepository = trainerRepository;
  }

  async execute(id: number): Promise<Trainer | null> {
    const trainer = await this.trainerRepository.getTrainerById(id);
    if (!trainer) {
      throw new Error("Trainer not found");
    }

    return trainer;
  }
}
