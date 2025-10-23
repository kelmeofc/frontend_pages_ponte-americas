// src/lib/prisma.ts
import { PrismaClient } from "../../../src/generated/prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaNeon } from "@prisma/adapter-neon";
import dotenv from "dotenv";

dotenv.config();
const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaNeon({ connectionString });

// Instantiate the extended Prisma client to infer its type
const extendedPrisma = new PrismaClient({ adapter }).$extends(withAccelerate());
type ExtendedPrismaClient = typeof extendedPrisma;

// Use globalThis for broader environment compatibility
const globalForPrisma = globalThis as typeof globalThis & {
	prisma?: ExtendedPrismaClient;
};

// Named export with global memoization
export const prisma: ExtendedPrismaClient =
	globalForPrisma.prisma ?? extendedPrisma;

if (process.env.NODE_ENV !== "production") {
	globalForPrisma.prisma = prisma;
}