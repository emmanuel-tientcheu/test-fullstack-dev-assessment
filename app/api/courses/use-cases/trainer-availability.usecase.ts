import { Course } from "@prisma/client";
import { CourseRepository } from "../repository/courses.repository";
import { TrainerRepository } from "../../trainers/repository/trainners.repository";
import { GetTrainerUseCase } from "../../trainers/use-cases/get-trainer.usecase";

export interface CheckTrainerAvailabilityDTO {
  trainerId: number;
  date: string;
}

export class CheckTrainerAvailabilityUseCase {
  constructor(
    private readonly courseRepository: CourseRepository,
    private readonly trainerRepository: TrainerRepository,
  ) {}

  async execute(data: CheckTrainerAvailabilityDTO): Promise<Course[]> {
    //verify if trainer exist
    const getTrainerUseCase = new GetTrainerUseCase(this.trainerRepository);
    const trainer = await getTrainerUseCase.execute(Number(data.trainerId));

    if (!trainer) {
      throw new Error("Trainer not found");
    }
    return await this.courseRepository.findCoursesByTrainerAndDateRange(data);
  }
}
