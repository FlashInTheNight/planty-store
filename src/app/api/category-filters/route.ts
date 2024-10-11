import { prisma } from "@/prisma/prisma-client";
import { CategoryFilters } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const searchParams = request.nextUrl.searchParams;
  const categoryName = searchParams.get("categoryName");

  if (!categoryName) {
    return NextResponse.json({ status: 404, statusText: "not found" });
  }

  const categoryFilters: CategoryFilters  | null= await prisma.categoryFilters.findFirst({
    where: {
      name: categoryName,
    },
  });

  if (!categoryFilters) {
    return NextResponse.json({ status: 404, statusText: "not found" });
  }

  // Фильтруем объект, убирая пустые массивы
  const filteredCategoryFilters = Object.fromEntries(
    Object.entries(categoryFilters).filter(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => Array.isArray(value) && value.length > 0
    )
  );

  return NextResponse.json(filteredCategoryFilters);
}
