"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { createSession, destroySession } from "@/lib/auth/session";
import { toSafeUser, type SafeUser } from "@/lib/auth/current-user";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type AuthActionResult =
  | { ok: true; user: SafeUser }
  | { ok: false; error: string };

export async function signUpAction(input: {
  email: string;
  password: string;
  confirmPassword: string;
  agreedToTerms: boolean;
}): Promise<AuthActionResult> {
  const email = input.email.trim().toLowerCase();

  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }
  if (input.password.length < 8) {
    return { ok: false, error: "Password must be at least 8 characters." };
  }
  if (input.password !== input.confirmPassword) {
    return { ok: false, error: "Passwords do not match." };
  }
  if (!input.agreedToTerms) {
    return { ok: false, error: "You must confirm you're 21+ and agree to the terms." };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { ok: false, error: "An account with this email already exists." };
  }

  const passwordHash = await bcrypt.hash(input.password, 12);
  const user = await prisma.user.create({ data: { email, passwordHash } });

  await createSession(user.id);
  return { ok: true, user: toSafeUser(user) };
}

export async function signInAction(input: {
  identifier: string;
  password: string;
}): Promise<AuthActionResult> {
  const identifier = input.identifier.trim();

  if (!identifier || !input.password) {
    return { ok: false, error: "Enter your email/username and password." };
  }

  const isEmail = identifier.includes("@");
  const user = await prisma.user.findUnique({
    where: isEmail ? { email: identifier.toLowerCase() } : { username: identifier },
  });

  if (!user) {
    return { ok: false, error: "Invalid credentials." };
  }

  const valid = await bcrypt.compare(input.password, user.passwordHash);
  if (!valid) {
    return { ok: false, error: "Invalid credentials." };
  }

  await createSession(user.id);
  return { ok: true, user: toSafeUser(user) };
}

export async function signOutAction(): Promise<void> {
  await destroySession();
}
