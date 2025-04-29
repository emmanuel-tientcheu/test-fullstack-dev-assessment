import { prisma } from "@/lib/prisma";
import { CreateTrainingSubjectDTO } from "../dto/create-training-subject-dto";
import { UpdateTrainingSubjectDTO } from "../dto/update-training-subject.dto";

export class TrainingSubjectRepository {
  async getAllWithTrainers() {
    return prisma.trainingSubject.findMany();
  }

  async create(data: CreateTrainingSubjectDTO) {
    return prisma.trainingSubject.create({
      data,
    });
  }

  async update(id: number, data: UpdateTrainingSubjectDTO) {
    return prisma.trainingSubject.update({
      where: { id },
      data,
    });
  }

  async deleteById(id: number): Promise<void> {
    await prisma.trainingSubject.delete({
      where: { id },
    });
  }

  async findById(id: number) {
    return prisma.trainingSubject.findUnique({
      where: { id },
    });
  }
}
