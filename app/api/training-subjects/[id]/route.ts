import { formatResponse } from "@/core/responseFormatter";
import { NextRequest, NextResponse } from "next/server";
import { UpdateTrainingSubjectSchema } from "../dto/update-training-subject.dto";
import { UpdateTrainingSubjectUseCase } from "../use-cases/update-training-subject.usecase";
import { TrainingSubjectRepository } from "../repository/training-subject.repository";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const id = parseInt(params.id, 10);
    if (isNaN(id)) {
      return NextResponse.json(formatResponse("Invalid ID", null, 400));
    }

    const body = await req.json();
    const parsed = UpdateTrainingSubjectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        formatResponse("Validation failed", parsed.error.format(), 400),
      );
    }

    const useCase = new UpdateTrainingSubjectUseCase(
      new TrainingSubjectRepository(),
    );

    const updated = await useCase.execute(id, parsed.data);

    return NextResponse.json(
      formatResponse("Training subject updated", updated, 200),
    );
  } catch (error) {
    return NextResponse.json(
      formatResponse("Failed to update training subject", null, 500),
    );
  }
}
