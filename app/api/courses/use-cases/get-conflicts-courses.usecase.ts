import { Course } from "@prisma/client";
import { CourseRepository } from "../repository/courses.repository";

export interface CheckCourseConflictDTO {
  date: string;
  location: string;
}

export class CheckCourseConflictUseCase {
  private courseRepository: CourseRepository;

  constructor(courseRepository: CourseRepository) {
    this.courseRepository = courseRepository;
  }

  async execute(data: CheckCourseConflictDTO): Promise<Course[] | null> {
    if (!data.date || !data.location) {
      throw new Error("Date and location must be provided");
    }

    const conflictingCourses =
      await this.courseRepository.findByDateAndLocation(data);

    return conflictingCourses;
  }
}
