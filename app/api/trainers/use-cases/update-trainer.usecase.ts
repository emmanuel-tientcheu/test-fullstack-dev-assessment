import { Trainer } from "@prisma/client";
import { TrainerRepository } from "../repository/trainners.repository";

interface UpdateTrainerDTO {
  id: number;
  name?: string;
  email?: string;
  location?: string;
  training_subjects?: string[];
}

export class UpdateTrainerUseCase {
  private trainerRepository: TrainerRepository;

  constructor(trainerRepository: TrainerRepository) {
    this.trainerRepository = trainerRepository;
  }

  async execute(data: UpdateTrainerDTO): Promise<Trainer> {
    if (!data.id) {
      throw new Error("Trainer ID is required");
    }

    const trainer = await this.trainerRepository.updateTrainer(data, data.id);

    if (!trainer) {
      throw new Error("Trainer not found");
    }

    return trainer;
  }
}
