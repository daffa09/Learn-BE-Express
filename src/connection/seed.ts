import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function main() {
  // clear data
  await prisma.order.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  // create users
  const users = await prisma.user.createMany({
    data: [
      {name: "Alice", email: "alice@gmail.com" },
      {name: "Bob", email: "bob@gmail.com" },
      {name: "Charlie", email: "charlie@gmail.com" }
    ],
  });

  // create Products
  const products = await prisma.product.createMany({
    data: [
      {name: "Keyboard", price: 350_000, stock: 12 },
      {name: "Mouse", price: 150_000, stock: 30 },
      {name: "Monitor", price: 1_500_000, stock: 5 },
      {name: "Laptop", price: 8_000_000, stock: 3 },
      {name: "USB Hub", price: 100_000, stock: 50 },
    ],
  });

  // create Orders
  const orders = await prisma.order.createMany({
    data: [
      {userId: 1, productId: 1, quantity: 2 },
      {userId: 1, productId: 2, quantity: 1 },
      {userId: 2, productId: 3, quantity: 1 },
      {userId: 2, productId: 4, quantity: 2 },
      {userId: 3, productId: 2, quantity: 4 },
      {userId: 3, productId: 5, quantity: 3 },
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