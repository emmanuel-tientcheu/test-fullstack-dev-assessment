import { prisma } from "@/lib/prisma";
import { Trainer } from "@prisma/client";
import { UpdateTrainerDTO } from "./dto/update-trainer.dto";

export class TrainerRepository {
  async findAll() {
    return prisma.trainer.findMany({
      include: {
        trainingSubjects: true,
      },
    });
  }

  async createTrainer(data: {
    name: string;
    training_subjects: string[];
    location: string;
    email: string;
  }): Promise<Trainer> {
    const trainer = await prisma.trainer.create({
      data: {
        name: data.name,
        email: data.email,
        location: data.location,
        trainingSubjects: {
          connectOrCreate: data.training_subjects.map((subject) => ({
            where: { name: subject },
            create: { name: subject },
          })),
        },
      },
    });

    return trainer;
  }

  async getTrainerById(id: number) {
    return await prisma.trainer.findUnique({
      where: {
        id: id,
      },
      include: {
        trainingSubjects: true,
      },
    });
  }

  async updateTrainer(
    data: UpdateTrainerDTO,
    id: number,
  ): Promise<Trainer | null> {
    const { name, email, location, training_subjects } = data;

    // Mettre à jour le formateur
    const updatedTrainer = await prisma.trainer.update({
      where: {
        id: id,
      },
      data: {
        name: name ?? undefined,
        email: email ?? undefined,
        location: location ?? undefined,
        trainingSubjects: {
          set: training_subjects
            ? training_subjects.map((subject) => ({ name: subject }))
            : undefined,
        },
      },
    });

    return updatedTrainer;
  }

  async deleteTrainer(id: number): Promise<boolean> {
    const deleted = await prisma.trainer.delete({
      where: { id },
    });

    return !!deleted;
  }
}
