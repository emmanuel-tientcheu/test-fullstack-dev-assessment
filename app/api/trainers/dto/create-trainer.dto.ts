import { z } from "zod";

export const CreateTrainerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  location: z.string().min(1, "Location is required"),
  training_subjects: z
    .array(z.string())
    .min(1, "At least one subject is required"),
});

export type CreateTrainerDTO = z.infer<typeof CreateTrainerSchema>;
