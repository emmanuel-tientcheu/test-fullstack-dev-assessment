import { prisma } from "@/lib/prisma";
import { Course } from "@prisma/client";
import { CreateCourseDTO } from "../dto/create-course.dto";
import { CheckCourseConflictDTO } from "../dto/check-conflict-course.dto";
import { startOfDay, endOfDay } from "date-fns";

export class CourseRepository {
  async createCourse(data: CreateCourseDTO): Promise<Course> {
    return prisma.course.create({
      data: {
        name: data.name,
        date: new Date(data.date),
        location: data.location,
        participants: data.participants,
        notes: data.notes,
        price: data.price,
        trainer_price: data.trainer_price,
        trainerId: data.trainerId,
        trainingSubjects: {
          connect: data.trainingSubjectIds.map((id) => ({ id })),
        },
      },
      include: {
        trainer: true,
        trainingSubjects: true,
      },
    });
  }

  async findByDateAndLocation(data: CheckCourseConflictDTO): Promise<Course[]> {
    const date = new Date(data.date);
    return prisma.course.findMany({
      where: {
        date: {
          gte: startOfDay(date),
          lte: endOfDay(date),
        },
        location: data.location,
      },
    });
  }
}
