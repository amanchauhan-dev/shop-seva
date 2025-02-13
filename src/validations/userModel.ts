import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes
const IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg", "image/webp"];

const Schema = z.object({
    // auto
    id: z.string().uuid(),
    created_at: z.string().datetime(),
    // required
    full_name: z.string().min(5, 'Full Name must be at least 5 characters long'),
    email: z.string().email('Invalid email format'),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
    // options
    phone_number: z.string().nullable(),
    date_of_birth: z.string().date("Formate: yyyy-mm-dd or null").nullable(),
    gender: z.enum(["male", "female", "other"]).nullable(),
    avatar: z
        .union([
            z.instanceof(File)
                .refine((file) => file.size <= MAX_FILE_SIZE, "Image size must be less than 2MB")
                .refine((file) => IMAGE_TYPES.includes(file.type), "Invalid image format"),
            z.null(), // Allow null values
        ])
        .optional(),
    role: z.enum(["customer", "admin"]).default('customer').nullable(),
    // after creation
    last_login: z.string().datetime().nullable(),
    last_password: z.string().nullable(),
    email_verified: z.boolean().default(false),
    email_verify_token: z.string().nullable(),
    forgot_password_token: z.string().nullable(),
    //   email callback url -- server use
    email_callback_url: z.string().url("Url or empty").nullable(),
});


export const PrivateFields = ["password", 'forgot_password_token', 'email_verify_token', 'last_password'];

export const PublicUserFieldNames = ['id', 'created_at', 'full_name', 'email', 'phone_number', 'date_of_birth', 'gender', 'avatar', 'role', 'last_login', 'email_verified']

export const FilterUserSchema = z.object({
    role: z.enum(["customer", "admin", "owner"]).optional(),
    email_verified: z.preprocess((v) => v === "true", z.boolean()).optional(),
    search: z.string().optional(),
    page: z.preprocess((v) => Number(v), z.number().int().positive().default(1)),
    limit: z.preprocess((v) => Number(v), z.number().int().positive().max(100).default(10)),
});

// Actual Schema

export const UserSchema = z.array(Schema);
export type User = z.infer<typeof UserSchema>;

// Users Schema without Password

export const UsersSchema = Schema.omit({ password: true, email_callback_url: true })
export type Users = z.infer<typeof UsersSchema>;

// Add User
export const AddUserSchema = Schema.pick({
    full_name: true,
    email: true,
    password: true,
    phone_number: true,
    role: true,
    gender: true,
    date_of_birth: true,
    avatar: true
});
export type AddUser = z.infer<typeof AddUserSchema>;

// Update User
export const UpdateUserSchema = Schema.pick({
    full_name: true,
    email: true,
    phone_number: true,
    role: true,
    gender: true,
    date_of_birth: true,
    avatar: true
});
export type UpdateUser = z.infer<typeof UpdateUserSchema>;


// Sign-up

export const SignUpUserSchema = Schema.pick({
    full_name: true,
    email: true,
    password: true,
    email_callback_url: true,
    phone_number: true,
});
export type SignUpUser = z.infer<typeof SignUpUserSchema>;



// login
export const LoginUserSchema = Schema.pick({
    email: true,
    password: true,
});
export type LoginUser = z.infer<typeof LoginUserSchema>;


// forget pass
export const ForgotPasswordSchema = Schema.pick({
    email: true,
    email_callback_url: true
})

export type ForgotPassword = z.infer<typeof ForgotPasswordSchema>;

// change pass
export const ChangePasswordSchema = Schema.pick({
    password: true,
})
export type ChangePassword = z.infer<typeof ChangePasswordSchema>;