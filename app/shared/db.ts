import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from '@prisma/extension-accelerate';

let db;

declare global {
	var __db__: any;
}

if (process.env.NODE_ENV === "production") {
	db = new PrismaClient().$extends(withAccelerate());
} else {
	if (!global.__db__) {
		global.__db__ = new PrismaClient().$extends(withAccelerate());
	}
	db = global.__db__;
	db.$connect();
}

export { db };

