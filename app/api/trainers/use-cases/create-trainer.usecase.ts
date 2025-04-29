import { TrainerRepository } from "../repository/trainners.repository";
import { Trainer } from "@prisma/client";

interface CreateTrainerDTO {
  name: string;
  training_subjects: string[];
  location: string;
  email: string;
}

export class CreateTrainerUseCase {
  private trainerRepository: TrainerRepository;

  constructor(trainerRepository: TrainerRepository) {
    this.trainerRepository = trainerRepository;
  }

  async execute(data: CreateTrainerDTO): Promise<Trainer> {
    if (!data.name || !data.email || !data.training_subjects.length) {
      throw new Error("Invalid data provided");
    }

    const trainer = await this.trainerRepository.createTrainer(data);

    return trainer;
  }
}
