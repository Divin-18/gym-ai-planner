-- CreateTable
CREATE TABLE "user_profile" (
    "userId" UUID NOT NULL,
    "goal" VARCHAR(20) NOT NULL,
    "experience" VARCHAR(20) NOT NULL,
    "daysPerWeek" INTEGER NOT NULL,
    "session" TEXT NOT NULL,
    "equipment" VARCHAR(20) NOT NULL,
    "injuries" TEXT NOT NULL,
    "preferredSplit" VARCHAR(20) NOT NULL,
    "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_profile_pkey" PRIMARY KEY ("userId")
);
