import { z } from "zod";

const Schema = z.object({
    // auto
    id: z.string().uuid(),
    created_at: z.string().datetime(),
    updated_at: z.string().datetime(),
    is_active: z.enum(['true', 'false']).nullable(),
    // required
    parent: z.string().nullable(),
    name: z.string().min(3, 'Name must be at least 3 characters long'),
});

export const CategorySchema = z.array(Schema);
export type Category = z.infer<typeof CategorySchema>;

export const CreateCategorySchema = Schema.omit({ id: true, created_at: true, updated_at: true });
export type CreateCategory = z.infer<typeof CreateCategorySchema>;

export const UpdateCategorySchema = Schema.omit({ id: true, created_at: true, updated_at: true });
export type UpdateCategory = z.infer<typeof UpdateCategorySchema>;