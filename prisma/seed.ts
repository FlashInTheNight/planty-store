import { prisma } from "./prisma-client";
import * as argon from "argon2";
import {
  categories,
  descriptions,
  characteristics,
  products,
} from "./constants";

async function up() {
  await prisma.user.createMany({
    data: [
      {
        fullName: "User Test",
        email: "user@test.ru",
        password: await argon.hash("111111"),
        verified: new Date(),
        role: "USER",
      },
      {
        fullName: "Admin Admin",
        email: "admin@test.ru",
        password: await argon.hash("222222"),
        verified: new Date(),
        role: "ADMIN",
      },
    ],
  });

  await prisma.category.createMany({
    data: categories,
  });
  await prisma.description.createMany({
    data: descriptions,
  });
  await prisma.characteristic.createMany({
    data: characteristics,
  });

  await prisma.product.createMany({
    data: products,
  });
}
async function main() {
  try {
    // await down();
    await up();
  } catch (e) {
    console.error(e);
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
