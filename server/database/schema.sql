CREATE TABLE "reviews"(
    "id" SERIAL PRIMARY KEY,
    "product_id" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "date" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL,
    "summary" CHAR(255) NOT NULL,
    "body" CHAR(255) NOT NULL,
    "recommend" INTEGER NOT NULL,
    "report" BOOLEAN NOT NULL,
    "name" CHAR(255) NOT NULL,
    "email" CHAR(255) NOT NULL,
    "helpfulness" INTEGER NOT NULL
);

CREATE TABLE "photos"(
    "id" SERIAL PRIMARY KEY,
    "review_id" INTEGER NOT NULL,
    "url" CHAR(255) NOT NULL
);

CREATE TABLE "review_characteristics"(
    "id" SERIAL PRIMARY KEY,
    "review_id" INTEGER NOT NULL,
    "char_id" INTEGER NOT NULL,
    "value" INTEGER NOT NULL
);

CREATE TABLE "characteristics"(
    "id" SERIAL PRIMARY KEY,
    "name" CHAR(255) NOT NULL
);

ALTER TABLE
    "review_characteristics" ADD CONSTRAINT "review_characteristics_review_id_foreign" FOREIGN KEY("review_id") REFERENCES "reviews"("id");

ALTER TABLE
    "review_characteristics" ADD CONSTRAINT "review_characteristics_char_id_foreign" FOREIGN KEY("char_id") REFERENCES "characteristics"("id");