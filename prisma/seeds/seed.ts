import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();
  // Your seed script goes here
  await prisma.$disconnect();
}

void main();
