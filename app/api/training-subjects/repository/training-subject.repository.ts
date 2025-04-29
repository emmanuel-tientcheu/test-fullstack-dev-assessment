import { prisma } from "@/lib/prisma";

export class TrainingSubjectRepository {
  async getAllWithTrainers() {
    return prisma.trainingSubject.findMany();
  }
}
