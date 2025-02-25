export interface User {
    // Auto
    id: string;
    created_at: string;
    // Required
    full_name: string;
    email: string;
    // Optional Fields
    phone_number: string | null;
    date_of_birth: string | null;
    gender: "male" | "female" | "other" | null;
    avatar: string | null;
    role: "customer" | "admin" | null;
}
