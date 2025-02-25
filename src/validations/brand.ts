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



export const BrandSchema = z.array(Schema);
export type Brand = z.infer<typeof BrandSchema>;

export const CreateBrandSchema = Schema.omit({ id: true, created_at: true, updated_at: true });
export type CreateBrand = z.infer<typeof CreateBrandSchema>;

export const UpdateBrandSchema = Schema.omit({ id: true, created_at: true, updated_at: true });
export type UpdateBrand = z.infer<typeof UpdateBrandSchema>;