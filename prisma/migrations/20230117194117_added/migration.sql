-- CreateTable
CREATE TABLE "instruments" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "instrument" VARCHAR(255) NOT NULL,

    CONSTRAINT "instruments_pkey" PRIMARY KEY ("id")
);
