const { PrismaClient } = require("@prisma/client");

const seed_data = require("./seed_data");
const { animals, breeds } = seed_data;

const { prismaClinet } = new PrismaClient();

function populate<A, R>(input: A, fn: (seed: A) => Promise<R>) {
  return fn(input)
    .then((result: R) =>
      console.info("[SEED] Succussfully created records", result)
    )
    .catch((e) => console.error("[SEED] Failed to create records", e));
}

async function main() {
  populate(animals, (seed) => {
    return Promise.all(
      seed.map((animal: any) =>
      prismaClinet.animal.create({ data: { name: animal.name } })
      )
    );
  });

  for (let animal in breeds) {
    populate(breeds[animal], (seed) => {
      return Promise.all(
        seed.map((breed: any) =>
        prismaClinet.breed.create({
            data: {
              name: breed,
              animal: { connect: { name: animal } },
            },
          })
        )
      );
    });
  }
}

main()
  .then(async () => {
    await prismaClinet.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prismaClinet.$disconnect();
    process.exit(1);
  });