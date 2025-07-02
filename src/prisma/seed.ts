import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // clear data
  await prisma.productss.deleteMany();
  await prisma.user.deleteMany();

  // create users
  const users = await prisma.user.createMany({
    data: [
      {email: "alice@gmail.com", password: "12345" },
      {email: "bob@gmail.com", password: "12345" },
      {email: "charlie@gmail.com", password: "12345" }
    ],
  });

  // create Products
  const products = await prisma.productss.createMany({
    data: [
      {name: "Keyboard", price: 350_000, stock: 12 },
      {name: "Mouse", price: 150_000, stock: 30 },
      {name: "Monitor", price: 1_500_000, stock: 5 },
      {name: "Laptop", price: 8_000_000, stock: 3 },
      {name: "USB Hub", price: 100_000, stock: 50 },
    ],
  });
}

main()
  .then(() => {
    console.log("Seeding Completed");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  })