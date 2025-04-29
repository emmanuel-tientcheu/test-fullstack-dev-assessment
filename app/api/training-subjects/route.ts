import { NextResponse } from "next/server";
import { TrainingSubjectRepository } from "./repository/training-subject.repository";
import { GetAllTrainingSubjectsUseCase } from "./use-cases/get-training-subjects.useases";
import { formatResponse } from "@/core/responseFormatter";

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
