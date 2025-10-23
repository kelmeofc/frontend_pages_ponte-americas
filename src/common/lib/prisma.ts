// src/lib/prisma.ts
import { PrismaClient } from "../../../generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import dotenv from "dotenv";

dotenv.config();
const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaNeon(
	{ connectionString },
	{ schema: "myPostgresSchema" }
);

const prisma = new PrismaClient({ adapter });

console.log((prisma as any)._engineType);

export { prisma };
