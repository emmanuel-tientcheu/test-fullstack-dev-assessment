import { NextRequest, NextResponse } from "next/server";
import { TrainingSubjectRepository } from "./repository/training-subject.repository";
import { GetAllTrainingSubjectsUseCase } from "./use-cases/get-training-subjects.usecase";
import { formatResponse } from "@/core/responseFormatter";
import { CreateTrainingSubjectSchema } from "./dto/create-training-subject-dto";
import { CreateTrainingSubjectUseCase } from "./use-cases/create-training-subject.usecase";

export async function GET() {
  try {
    const repo = new TrainingSubjectRepository();
    const useCase = new GetAllTrainingSubjectsUseCase(repo);
    const data = await useCase.execute();

    return NextResponse.json(formatResponse("Subjects fetched", data, 200));
  } catch (error) {
    return NextResponse.json(formatResponse("Server error", null, 500));
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = CreateTrainingSubjectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        formatResponse("Validation failed", parsed.error.format(), 400),
      );
    }

    const useCase = new CreateTrainingSubjectUseCase(
      new TrainingSubjectRepository(),
    );
    const subject = await useCase.execute(parsed.data);

    return NextResponse.json(formatResponse("Subject created", subject, 201));
  } catch (e) {
    return NextResponse.json(formatResponse("Server error", null, 500));
  }
}
