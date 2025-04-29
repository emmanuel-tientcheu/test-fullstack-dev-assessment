import { NextRequest, NextResponse } from "next/server";
import { CreateCourseSchema } from "./dto/create-course.dto";
import { formatResponse } from "@/core/responseFormatter";
import { CourseRepository } from "./repository/courses.repository";
import { CreateCourseUseCase } from "./use-cases/create-course.usecase";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = CreateCourseSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        formatResponse("Invalid data provided.", parsed.error.format(), 400),
      );
    }

    const repo = new CourseRepository();
    const useCase = new CreateCourseUseCase(repo);

    const course = await useCase.execute(parsed.data);

    return NextResponse.json(
      formatResponse("Course created successfully.", course, 201),
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    return NextResponse.json(formatResponse(errorMessage, null, 500));
  }
}
