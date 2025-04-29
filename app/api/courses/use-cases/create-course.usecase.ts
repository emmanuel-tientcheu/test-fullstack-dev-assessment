import { Course } from "@prisma/client";
import { CourseRepository } from "../repository/courses.repository";
import { TrainerRepository } from "../../trainers/repository/trainners.repository";
import { GetTrainerUseCase } from "../../trainers/use-cases/get-trainer.usecase";
import { TrainingSubjectRepository } from "../../training-subjects/repository/training-subject.repository";
import { GetTrainingSubjectByIdUseCase } from "../../training-subjects/use-cases/get-training-subject.usecase";
import { CheckTrainerAvailabilityUseCase } from "./trainer-availability.usecase";

interface CreateCourseDTO {
  name: string;
  date: string;
  location: string;
  participants: number;
  notes?: string;
  price: number;
  trainer_price: number;
  trainerId: number; // ID du formateur
  trainingSubjectIds: number[]; // Tableau d'IDs des subjects associés au cours
}

export class CreateCourseUseCase {
  private courseRepository: CourseRepository;
  private trainerRepository: TrainerRepository;
  private trainingSubjectRepository: TrainingSubjectRepository;

  constructor(
    courseRepository: CourseRepository,
    trainerRepository: TrainerRepository,
    trainingSubjectRepository: TrainingSubjectRepository,
  ) {
    this.courseRepository = courseRepository;
    this.trainerRepository = trainerRepository;
    this.trainingSubjectRepository = trainingSubjectRepository;
  }

  async execute(data: CreateCourseDTO): Promise<Course> {
    if (
      !data.name ||
      !data.trainingSubjectIds ||
      !data.location ||
      !data.date ||
      !data.trainerId
    ) {
      throw new Error("Invalid data provided");
    }

    //verify if trainer exist
    const getTrainerUseCase = new GetTrainerUseCase(this.trainerRepository);
    const trainer = await getTrainerUseCase.execute(Number(data.trainerId));

    if (!trainer) {
      throw new Error("Trainer not found");
    }

    //check if the trainer is already assigned to another course
    const checkTrainerAvailabilityUseCase = new CheckTrainerAvailabilityUseCase(
      this.courseRepository,
      this.trainerRepository,
    );

    const checkCourse = await checkTrainerAvailabilityUseCase.execute({
      trainerId: data.trainerId,
      date: data.date,
    });

    if(checkCourse.length >= 1) throw new Error("This trainer is already assigned to a course today");

    //verify if subject exist
    const getTrainingSubjectByIdUseCase = new GetTrainingSubjectByIdUseCase(
      this.trainingSubjectRepository,
    );

    for (const trainerSubjectId of data.trainingSubjectIds) {
      const subject =
        await getTrainingSubjectByIdUseCase.execute(trainerSubjectId);
      if (!subject) {
        throw new Error(`Subject with ID ${trainerSubjectId} not found`);
      }
    }

    const course = await this.courseRepository.createCourse(data);

    return course;
  }
}
