import { z } from "zod";

export const UpdateTrainerSchema = z.object({
  name: z.string().min(1, "Name must be at least 1 character").optional(),
  email: z.string().email("Invalid email format").optional(),
  location: z
    .string()
    .min(1, "Location must be at least 1 character")
    .optional(),
  training_subjects: z
    .array(z.string())
    .min(1, "At least one subject is required")
    .optional(),
});

export type UpdateTrainerDTO = z.infer<typeof UpdateTrainerSchema>;
