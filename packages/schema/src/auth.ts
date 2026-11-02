import { z } from "zod";
import { THEMES } from "./constants";

/** Avatar colours a child can pick. The UI shows their initial on a coloured circle. */
export const AVATARS = ["coral", "orange", "gold", "green", "teal", "blue", "purple", "pink"] as const;
export type AvatarId = (typeof AVATARS)[number];

export const themeSchema = z.enum(THEMES);

/** What the browser learns about the signed-in person. Never includes password data. */
export interface SessionUser {
  id: string;
  role: "student" | "admin";
  username: string;
  displayName: string;
  avatar: AvatarId | null;
  theme: (typeof THEMES)[number];
  mustChangePassword: boolean;
}

export const usernameSchema = z
  .string()
  .trim()
  .toLowerCase()
  .regex(/^[a-z0-9]{2,20}$/, "Use 2 to 20 letters or numbers");

export const passwordSchema = z.string().min(6, "Use at least 6 characters").max(100);

export const loginSchema = z.object({
  username: z.string().trim().toLowerCase().min(1).max(40),
  password: z.string().min(1).max(100),
});
export type LoginInput = z.infer<typeof loginSchema>;

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1).max(100),
  newPassword: passwordSchema,
});

export const setThemeSchema = z.object({ theme: themeSchema });

/** Admin creates one student. Username and password are generated when left out. */
export const createStudentSchema = z.object({
  displayName: z.string().trim().min(1).max(40),
  username: usernameSchema.optional(),
  password: passwordSchema.optional(),
  avatar: z.enum(AVATARS).optional(),
  classIds: z.array(z.string()).max(20).optional(),
});
export type CreateStudentInput = z.infer<typeof createStudentSchema>;

export const bulkCreateStudentsSchema = z.object({
  names: z.array(z.string().trim().min(1).max(40)).min(1).max(60),
  classIds: z.array(z.string()).max(20).optional(),
});

export const updateStudentSchema = z.object({
  displayName: z.string().trim().min(1).max(40).optional(),
  avatar: z.enum(AVATARS).nullable().optional(),
  theme: themeSchema.optional(),
  isActive: z.boolean().optional(),
});

/** Returned once, when an account is created or its password reset. The password is never stored in readable form. */
export interface StudentCredentials {
  id: string;
  displayName: string;
  username: string;
  password: string;
}

export interface StudentSummary {
  id: string;
  displayName: string;
  username: string;
  avatar: AvatarId | null;
  theme: (typeof THEMES)[number];
  isActive: boolean;
  createdAt: string;
  classes: { id: string; name: string }[];
}
