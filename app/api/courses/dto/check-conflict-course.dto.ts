import { z } from "zod";

export const CheckCourseConflictSchema = z.object({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Date must be valid",
  }),
  location: z.string().min(1, "Location is required"),
});

export type CheckCourseConflictDTO = z.infer<typeof CheckCourseConflictSchema>;
