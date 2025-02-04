import { v4 as uuidv4 } from "uuid";

export function generateVerificationToken(): string {
  return uuidv4(); // Generates a unique token
}