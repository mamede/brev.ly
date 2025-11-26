CREATE TABLE "links" (
	"id" text PRIMARY KEY NOT NULL,
	"originalUrl" text NOT NULL,
	"shortUrl" text NOT NULL,
	"accessCount" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "links_shortUrl_unique" UNIQUE("shortUrl")
);
