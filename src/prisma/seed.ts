import { prisma } from "./prisma-client";
import * as argon from "argon2";
import {
  categories,
  descriptions,
  characteristics,
  products,
  filters,
} from "./constants";

const randomDecimalNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10;
};

const generateDiscountPrice = (price: number, percent: number) => {
  return Math.floor((price * (100 - percent)) / 100);
};

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
  await prisma.filter.createMany({
    data: filters,
  });

  const productsWithPrice = products.map((product) => {
    return {
      ...product,
      price: randomDecimalNumber(100, 1000),
    };
  }) as ((typeof products)[0] & {
    discount?: number;
    discountPrice?: number;
    price: number;
  })[];

  for (let i = 5; i < 10; i++) {
    productsWithPrice[i] = {
      ...productsWithPrice[i],
      discount: 25,
      discountPrice: generateDiscountPrice(productsWithPrice[i].price, 25),
    };
  }
  await prisma.product.createMany({
    data: productsWithPrice,
  });
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Description" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Characteristic" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
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
