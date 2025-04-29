import { z } from "zod";

export const FindBestTrainersForSubjectSchema = z.object({
  subjectId: z.number().min(1, "Subject ID is required"),
});

export type FindBestTrainersForSubjectDTO = z.infer<
  typeof FindBestTrainersForSubjectSchema
>;
