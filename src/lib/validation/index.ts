import { z } from "zod";

export const SignUpValidation = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" }),
  username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const SignInValidation = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

export const PostValidation = z.object({
  caption: z
    .string()
    .min(5, { message: "Caption must be at least 5 characters long" })
    .max(2200, { message: "Caption must be shorter than 2200 characters" }),
  file: z.custom<File[]>(),
  location: z
    .string()
    .min(2, { message: "Location must be at least 2 characters long" })
    .max(100, { message: "Location must be shorter than 100 characters" }),
  tags: z.string(),
});
