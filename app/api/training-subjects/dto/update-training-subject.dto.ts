import { z } from "zod";

export const UpdateTrainingSubjectSchema = z.object({
  name: z.string().min(1, "Name must not be empty").optional(),
});

export type UpdateTrainingSubjectDTO = z.infer<
  typeof UpdateTrainingSubjectSchema
>;
