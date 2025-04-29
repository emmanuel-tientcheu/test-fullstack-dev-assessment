import { NextRequest, NextResponse } from "next/server";
import { TrainerRepository } from "./repository/trainners.repository";
import { GetAllTrainersUseCase } from "./use-cases/get-trainers.usecase";
import { formatResponse } from "@/core/responseFormatter";
import { CreateTrainerUseCase } from "./use-cases/create-trainer.usecase";
import { CreateTrainerSchema } from "./dto/create-trainer.dto";

export async function GET(request: Request) {
  try {
    const repo = new TrainerRepository();
    const useCase = new GetAllTrainersUseCase(repo);

    const trainers = await useCase.execute();

    return NextResponse.json(
      formatResponse("Trainers fetched successfully", trainers, 200),
    );
  } catch (error) {
    return NextResponse.json(
      formatResponse("Failed to fetch trainers", null, 500),
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = CreateTrainerSchema.safeParse(body);

    if (!parsed.success)
      return NextResponse.json(
        formatResponse("Failed to create trainer.", parsed.error.format(), 400),
      );

    const repo = new TrainerRepository();
    const useCase = new CreateTrainerUseCase(repo);

    const validatedData = parsed.data;

    const trainer = await useCase.execute(validatedData);

    return NextResponse.json(
      formatResponse("Trainer created successfully.", trainer, 201),
    );
  } catch (error) {
    return NextResponse.json(
      formatResponse("Failed to create trainer.", null, 500),
    );
  }
}
