import { z } from "zod";

const Schema = z.object({
    // auto
    id: z.string().uuid(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
    is_active: z.enum(['true', 'false']).nullable(),
    // required
    name: z.string().min(3, 'Name must be at least 3 characters long'),
});


export const LabelSchema = z.array(Schema);
export type Label = z.infer<typeof LabelSchema>;

export const CreateLabelSchema = Schema.omit({ id: true, created_at: true, updated_at: true });
export type CreateLabel = z.infer<typeof CreateLabelSchema>;

export const UpdateLabelSchema = Schema.omit({ id: true, created_at: true, updated_at: true });
export type UpdateLabel = z.infer<typeof UpdateLabelSchema>;