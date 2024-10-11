import { prisma } from "@/prisma/prisma-client";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const categoryName = searchParams.get("categoryName");

  console.log("categoryName in api: ", categoryName);

  if (!categoryName) {
    return NextResponse.json({
      message: 'top kek'
    }, { status: 404, statusText: "CategoryName not found" });
  }
  const categoryFilters = await prisma.categoryFilters.findFirst({
    where: {
      name: categoryName,
    },
  });

  return NextResponse.json(categoryFilters);
}
