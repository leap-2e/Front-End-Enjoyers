-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'NON_BINARY');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "balance" DOUBLE PRECISION,
    "gender" "Gender",
    "age" INTEGER,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
