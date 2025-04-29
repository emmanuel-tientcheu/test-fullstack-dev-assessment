import { prisma } from "@/lib/prisma";
import { Course } from "@prisma/client";
import { CreateCourseDTO } from "../dto/create-course.dto";

export class CourseRepository {
  async createCourse(data: CreateCourseDTO): Promise<Course> {
    return prisma.course.create({
      data: {
        name: data.name,
        date: new Date(data.date),
        subject: data.subject,
        location: data.location,
        participants: data.participants,
        notes: data.notes,
        price: data.price,
        trainer_price: data.trainer_price,
        trainerId: data.trainerId,
      },
      include: {
        trainer: true,
      },
    });
  }
}
