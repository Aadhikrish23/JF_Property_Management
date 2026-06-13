-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('ACTIVE', 'UNDER_OFFER', 'SOLD');

-- CreateEnum
CREATE TYPE "ViewingStatus" AS ENUM ('BOOKED', 'CONFIRMED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "TaskType" AS ENUM ('VIEWING', 'FEEDBACK', 'OFFER', 'APPRAISAL', 'TODO', 'PROGRESSION');

-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'URGENT');

-- CreateEnum
CREATE TYPE "CalendarEventStatus" AS ENUM ('CONFIRMED', 'PENDING', 'NEW', 'DUE_TODAY');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "role" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "properties" (
    "id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "address" TEXT NOT NULL,
    "status" "PropertyStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "email" VARCHAR(255),
    "phone" VARCHAR(30),
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "viewings" (
    "id" UUID NOT NULL,
    "property_id" UUID NOT NULL,
    "client_id" UUID NOT NULL,
    "date_time" TIMESTAMP NOT NULL,
    "status" "ViewingStatus" NOT NULL DEFAULT 'BOOKED',
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "viewings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tasks" (
    "id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "type" "TaskType" NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
    "priority" "TaskPriority" NOT NULL DEFAULT 'MEDIUM',
    "due_date" TIMESTAMP,
    "assigned_user_id" UUID,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "tasks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "notifications" (
    "id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "is_read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "calendar_events" (
    "id" UUID NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "date_time" TIMESTAMP NOT NULL,
    "type" VARCHAR(50) NOT NULL,
    "status" "CalendarEventStatus" NOT NULL DEFAULT 'NEW',
    "created_at" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP NOT NULL,

    CONSTRAINT "calendar_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "IDX_users_email" ON "users"("email");

-- CreateIndex
CREATE INDEX "IDX_users_role" ON "users"("role");

-- CreateIndex
CREATE INDEX "IDX_properties_status" ON "properties"("status");

-- CreateIndex
CREATE INDEX "IDX_properties_title" ON "properties"("title");

-- CreateIndex
CREATE INDEX "IDX_clients_name" ON "clients"("name");

-- CreateIndex
CREATE INDEX "IDX_clients_email" ON "clients"("email");

-- CreateIndex
CREATE INDEX "IDX_viewings_property" ON "viewings"("property_id");

-- CreateIndex
CREATE INDEX "IDX_viewings_client" ON "viewings"("client_id");

-- CreateIndex
CREATE INDEX "IDX_viewings_datetime" ON "viewings"("date_time");

-- CreateIndex
CREATE INDEX "IDX_viewings_status" ON "viewings"("status");

-- CreateIndex
CREATE INDEX "IDX_tasks_type" ON "tasks"("type");

-- CreateIndex
CREATE INDEX "IDX_tasks_status" ON "tasks"("status");

-- CreateIndex
CREATE INDEX "IDX_tasks_priority" ON "tasks"("priority");

-- CreateIndex
CREATE INDEX "IDX_tasks_due_date" ON "tasks"("due_date");

-- CreateIndex
CREATE INDEX "IDX_tasks_assigned_user" ON "tasks"("assigned_user_id");

-- CreateIndex
CREATE INDEX "IDX_notifications_type" ON "notifications"("type");

-- CreateIndex
CREATE INDEX "IDX_notifications_read" ON "notifications"("is_read");

-- CreateIndex
CREATE INDEX "IDX_notifications_created" ON "notifications"("created_at");

-- CreateIndex
CREATE INDEX "IDX_events_datetime" ON "calendar_events"("date_time");

-- CreateIndex
CREATE INDEX "IDX_events_status" ON "calendar_events"("status");

-- CreateIndex
CREATE INDEX "IDX_events_type" ON "calendar_events"("type");

-- AddForeignKey
ALTER TABLE "viewings" ADD CONSTRAINT "viewings_property_id_fkey" FOREIGN KEY ("property_id") REFERENCES "properties"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viewings" ADD CONSTRAINT "viewings_client_id_fkey" FOREIGN KEY ("client_id") REFERENCES "clients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tasks" ADD CONSTRAINT "tasks_assigned_user_id_fkey" FOREIGN KEY ("assigned_user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
