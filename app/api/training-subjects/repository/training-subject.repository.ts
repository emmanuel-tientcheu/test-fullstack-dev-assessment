import { prisma } from "@/lib/prisma";
import { CreateTrainingSubjectDTO } from "../dto/create-training-subject-dto";

export class TrainingSubjectRepository {
  async getAllWithTrainers() {
    return prisma.trainingSubject.findMany();
  }

  async create(data: CreateTrainingSubjectDTO) {
    return prisma.trainingSubject.create({
      data,
    });
  }
}
