import { formatResponse } from "@/core/responseFormatter";
import { NextRequest, NextResponse } from "next/server";
import { FindBestTrainersForSubjectSchema } from "../dto/find-trainer-subject.dto";
import { TrainerRepository } from "../repository/trainners.repository";
import { TrainingSubjectRepository } from "../../training-subjects/repository/training-subject.repository";
import { FindBestTrainersForSubjectUseCase } from "../use-cases/find-trainer-for-subject.usecase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = FindBestTrainersForSubjectSchema.safeParse(body);

    if (!parsed.success)
      return NextResponse.json(
        formatResponse(
          "Failed to load best trainer.",
          parsed.error.format(),
          400,
        ),
      );
    const trainerRepository = new TrainerRepository();
    const trainingSubjectRepository = new TrainingSubjectRepository();

    const useCase = new FindBestTrainersForSubjectUseCase(
      trainerRepository,
      trainingSubjectRepository,
    );

    const result = await useCase.execute(parsed.data);

    return NextResponse.json(
      formatResponse("Load best Trainer successfully.", result, 200),
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    return NextResponse.json(formatResponse(errorMessage, null, 500));
  }
}
