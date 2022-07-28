-- CreateTable
CREATE TABLE "Sessions" (
    "id" TEXT NOT NULL,
    "fetchedAt" TEXT NOT NULL,
    "cookie" TEXT NOT NULL,

    CONSTRAINT "Sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Sessions_id_key" ON "Sessions"("id");
