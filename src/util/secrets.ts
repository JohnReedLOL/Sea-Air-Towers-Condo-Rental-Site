import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";

// Note: We are always using the ".env.example" file, we did not create a ".env" file.
if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
} else {
    logger.debug("Using .env.example file to supply config environment variables");
    dotenv.config({ path: ".env.example" });  // you can delete this after you create your own .env file!
}

// To make debugging easier, we are always using the dev environment, no production.
// export const ENVIRONMENT = process.env.NODE_ENV;
export const ENVIRONMENT = "dev"; // I wasn't sure whether to set this to "dev" or "development", but I'm definitely not setting it to "production".
// const prod = ENVIRONMENT === "production"; // Anything else is treated as 'dev'
const prod = false; // No prod, ever.

export const SESSION_SECRET = process.env["SESSION_SECRET"];

// The only environment is dev and there is never a local test database, all local tests are manually conducted by accessing the production database that the deployed Heroku app also accesses. Yes, I know this is not industry standard best practice.
// export const MONGODB_URI = prod ? process.env["MONGODB_URI"] : process.env["MONGODB_URI_LOCAL"];
// We always use the MongoLab database from https://www.mongodb.com/:
export const MONGODB_URI = process.env["MONGODB_URI"];

if (!SESSION_SECRET) {
    logger.error("No client secret. Set SESSION_SECRET environment variable.");
    process.exit(1);
}

// Note: We never use the MONGODB_URI_LOCAL environment variable, only the MONGODB_URI one.
if (!MONGODB_URI) {
    if (prod) {
        logger.error("No mongo connection string. Set MONGODB_URI environment variable.");
    } else {
        logger.error("No mongo connection string. Set MONGODB_URI_LOCAL environment variable.");
    }
    process.exit(1);
}
