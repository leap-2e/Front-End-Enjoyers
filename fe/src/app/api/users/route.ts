import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async () => {
  const result = await prisma.user.findMany({
    include: {
      category: true,
    },
  });
  return NextResponse.json(result);
};

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const newUser = await prisma.user.create({
    data: body,
  });
  return NextResponse.json(newUser);
};
