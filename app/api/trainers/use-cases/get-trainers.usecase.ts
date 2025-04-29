import { TrainerRepository } from "../repository/trainners.repository";

export class GetAllTrainersUseCase {
  constructor(private trainerRepo: TrainerRepository) {}

  async execute() {
    return this.trainerRepo.findAll();
  }
}
