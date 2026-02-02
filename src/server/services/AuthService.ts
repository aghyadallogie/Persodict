import { prisma } from "@/server/utils/prisma";
import bcrypt from "bcryptjs";

export class AuthService {
  /**
   * Registers a new user with email and password.
   *
   * This method checks if a user with the given email already exists.
   * If the user exists, it throws an error. Otherwise, it creates a new user
   * with a hashed password.
   *
   * @param {string} email - The email address of the user to register.
   * @param {string} password - The plain text password to be hashed and stored.
   * @returns {Promise<{ id: string; email: string }>} A promise resolving to the created user's id and email.
   * @throws Will throw an error if the user already exists or if registration fails.
   */
  static async register(email: string, password: string): Promise<{ id: string; email: string }> {
    try {
      // Check if user already exists
      const existingUser = await prisma.user.findUnique({ where: { email } });
      
      if (existingUser) {
        throw new Error("User with this email already exists");
      }

      // Hash password and create user
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await prisma.user.create({
        data: {
          email,
          name: "unnamed",
          hashedPassword,
        },
      });

      return { id: newUser.id, email: newUser.email };
    } catch (error) {
      console.error("Error registering user:", error);
      throw error instanceof Error ? error : new Error("Failed to register user");
    }
  }
}
