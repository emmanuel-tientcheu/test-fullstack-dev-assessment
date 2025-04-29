import { formatResponse } from "@/core/responseFormatter";
import { NextRequest, NextResponse } from "next/server";
import { UpdateTrainingSubjectSchema } from "../dto/update-training-subject.dto";
import { UpdateTrainingSubjectUseCase } from "../use-cases/update-training-subject.usecase";
import { TrainingSubjectRepository } from "../repository/training-subject.repository";
import { DeleteTrainingSubjectUseCase } from "../use-cases/delete-trainig-subject.usecase";
import { GetTrainingSubjectByIdUseCase } from "../use-cases/get-training-subject.usecase";

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

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const subjectId = parseInt(params.id);

    if (isNaN(subjectId)) {
      return NextResponse.json(
        formatResponse("Invalid subject ID.", null, 400),
      );
    }

    const repo = new TrainingSubjectRepository();
    const useCase = new DeleteTrainingSubjectUseCase(repo);

    await useCase.execute(subjectId);

    return NextResponse.json(
      formatResponse("Training subject deleted successfully.", null, 200),
    );
  } catch (error) {
    return NextResponse.json(
      formatResponse("Failed to delete training subject.", null, 500),
    );
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const subjectId = parseInt(params.id);

    if (isNaN(subjectId)) {
      return NextResponse.json(
        formatResponse("Invalid training subject ID.", null, 400),
      );
    }

    const repo = new TrainingSubjectRepository();
    const useCase = new GetTrainingSubjectByIdUseCase(repo);

    const subject = await useCase.execute(subjectId);

    if (!subject) {
      return NextResponse.json(
        formatResponse("Training subject not found.", null, 404),
      );
    }

    return NextResponse.json(
      formatResponse("Training subject retrieved successfully.", subject, 200),
    );
  } catch (error) {
    return NextResponse.json(
      formatResponse("Failed to retrieve training subject.", null, 500),
    );
  }
}
