import { z } from "zod";

export const CreateTrainingSubjectSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type CreateTrainingSubjectDTO = z.infer<
  typeof CreateTrainingSubjectSchema
>;
