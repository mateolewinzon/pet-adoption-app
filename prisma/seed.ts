import { PrismaClient, Prisma } from "@prisma/client";
import species from "./data";

const prisma = new PrismaClient();

async function main() {
  try {
    for (let animal in species) {
      await prisma.animal.create({ data: { name: animal } });
      for (let breed in species[animal]) {
        const name = species[animal][breed];
        await prisma.breed.create({
          data: { name, animal: { connect: { name: animal } } },
        });
      }
    }
    console.log("DB seeded successfully");
  } catch (error) {
    console.log("An error occurred when seeding:", error);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
