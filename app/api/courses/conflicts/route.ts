import { NextRequest, NextResponse } from "next/server";
import { CourseRepository } from "../repository/courses.repository";
import { CheckCourseConflictUseCase } from "../use-cases/get-conflicts-courses.usecase";
import { CheckCourseConflictSchema } from "../dto/check-conflict-course.dto";
import { formatResponse } from "@/core/responseFormatter";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const courseRepo = new CourseRepository();
    const useCase = new CheckCourseConflictUseCase(courseRepo);

    const parsed = CheckCourseConflictSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        formatResponse("Invalid data provided.", parsed.error.format(), 400),
      );
    }

    const result = await useCase.execute(parsed.data);

    const message =
      result && result?.length > 1
        ? "Conflict detected: multiple courses are scheduled at the same time and place."
        : "No conflict detected.";

    return NextResponse.json(formatResponse(message, result, 200));
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(formatResponse(errorMessage, null, 500));
  }
}
