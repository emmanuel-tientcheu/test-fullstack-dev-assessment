import { z } from "zod";

export const CreateCourseSchema = z.object({
  name: z.string().min(1, "Course name is required"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format",
  }),
  location: z.string().min(1, "Location is required"),
  participants: z.number().min(1, "There must be at least one participant"),
  notes: z.string().optional(),
  price: z.number().min(0, "Price must be a positive number"),
  trainer_price: z.number().min(0, "Trainer price must be a positive number"),
  trainerId: z.number().min(1, "Trainer ID is required"), // ID du formateur
  trainingSubjectIds: z
    .array(z.number().min(1))
    .min(1, "At least one subject ID is required"),
});

export type CreateCourseDTO = z.infer<typeof CreateCourseSchema>;
