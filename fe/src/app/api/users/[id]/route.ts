import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  const deletedUser = await prisma.user.delete({ where: { id } });
  return NextResponse.json(deletedUser);
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const body = await req.json();
  const { id } = await params;
  const updatedUser = await prisma.user.update({ where: { id }, data: body });
  return NextResponse.json(updatedUser);
};

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const { id } = await params;
  const user = await prisma.user.findUnique({ where: { id } });
  return NextResponse.json(user);
};
