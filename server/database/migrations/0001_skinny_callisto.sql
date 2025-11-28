CREATE TYPE "public"."model" AS ENUM('openai/gpt-5-nano', 'anthropic/claude-haiku-4.5', 'google/gemini-2.5-flash');--> statement-breakpoint
ALTER TABLE "messages" ADD COLUMN "model" "model";