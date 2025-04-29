import { Course } from "@prisma/client";
import { CourseRepository } from "../repository/courses.repository";
import { TrainerRepository } from "../../trainers/repository/trainners.repository";
import { GetTrainerUseCase } from "../../trainers/use-cases/get-trainer.usecase";
import { NextResponse } from "next/server";
import { formatResponse } from "@/core/responseFormatter";

interface CreateCourseDTO {
  name: string;
  date: string;
  subject: string;
  location: string;
  participants: number;
  notes?: string;
  price: number;
  trainer_price: number;
  trainerId: number; // ID du formateur
}

export class CreateCourseUseCase {
  private courseRepository: CourseRepository;

  constructor(courseRepository: CourseRepository) {
    this.courseRepository = courseRepository;
  }

  async execute(data: CreateCourseDTO): Promise<Course> {
    if (
      !data.name ||
      !data.subject ||
      !data.location ||
      !data.date ||
      !data.trainerId
    ) {
      throw new Error("Invalid data provided");
    }

    const repo = new TrainerRepository();
    const useCase = new GetTrainerUseCase(repo);

    const trainer = await useCase.execute(Number(data.trainerId));

    if (!trainer) {
      throw new Error("Trainer not found");
    }

    const course = await this.courseRepository.createCourse(data);

    return course;
  }
}
