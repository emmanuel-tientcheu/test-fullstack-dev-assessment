import { NextRequest, NextResponse } from "next/server";
import { CheckTrainerAvailabilitySchema } from "../dto/check-trainer-availability-course.dto";
import { CourseRepository } from "../repository/courses.repository";
import { CheckTrainerAvailabilityUseCase } from "../use-cases/trainer-availability.usecase";
import { formatResponse } from "@/core/responseFormatter";
import { TrainerRepository } from "../../trainers/repository/trainners.repository";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = CheckTrainerAvailabilitySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { errors: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const courseRepository = new CourseRepository();
    const trainerRepository = new TrainerRepository();

    const useCase = new CheckTrainerAvailabilityUseCase(
      courseRepository,
      trainerRepository,
    );

    const result = await useCase.execute(parsed.data);

    return NextResponse.json(
      formatResponse(
        "Recovery of courses that a trainer is assigned",
        result,
        200,
      ),
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    return NextResponse.json(formatResponse(errorMessage, null, 500));
  }
}
