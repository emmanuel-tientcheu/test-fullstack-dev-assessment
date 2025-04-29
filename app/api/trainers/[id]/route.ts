import { NextRequest, NextResponse } from "next/server";
import { TrainerRepository } from "../trainners.repository";
import { GetTrainerUseCase } from "../use-cases/get-trainer.usecase";
import { formatResponse } from "@/core/responseFormatter";
import { UpdateTrainerSchema } from "../dto/update-trainer.dto";
import { UpdateTrainerUseCase } from "../use-cases/update-trainer.usecase";
import { DeleteTrainerUseCase } from "../use-cases/delete-trainer.usecase";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const repo = new TrainerRepository();
    const useCase = new GetTrainerUseCase(repo);

    const trainer = await useCase.execute(Number(params.id));

    if (!trainer) {
      return NextResponse.json(formatResponse("Trainer not found", null, 404));
    }

    return NextResponse.json(
      formatResponse("Trainer retrieved successfully", trainer, 200),
    );
  } catch (error) {
    return NextResponse.json(
      formatResponse("Failed to retrieve trainer", null, 500),
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const body = await request.json();
    const parsed = UpdateTrainerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        formatResponse("Invalid data", parsed.error.format(), 400),
      );
    }

    const validatedData = parsed.data;

    const repo = new TrainerRepository();
    const useCase = new UpdateTrainerUseCase(repo);

    const updatedTrainer = await useCase.execute({
      id: Number(params.id),
      ...validatedData,
    });

    return NextResponse.json(
      formatResponse("Trainer updated successfully", updatedTrainer, 200),
    );
  } catch (error) {
    return NextResponse.json(
      formatResponse("Failed to update trainer", null, 500),
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const repo = new TrainerRepository();
    const useCase = new DeleteTrainerUseCase(repo);

    await useCase.execute(Number(params.id));

    return NextResponse.json(
      formatResponse("Trainer deleted successfully.", null, 200),
    );
  } catch (error) {
    return NextResponse.json(
      formatResponse("Failed to delete trainer.", null, 500),
    );
  }
}
