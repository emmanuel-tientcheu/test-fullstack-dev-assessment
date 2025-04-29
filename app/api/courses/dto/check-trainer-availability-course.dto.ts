import { z } from "zod";

export const CheckTrainerAvailabilitySchema = z.object({
  trainerId: z.number().int().min(1, "Trainer ID is required"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
});

export type CheckTrainerAvailabilityDTO = z.infer<
  typeof CheckTrainerAvailabilitySchema
>;
