import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

function getExtendedClient() {
	return new PrismaClient().$extends(withAccelerate());
}

type ExtendedPrismaClient = ReturnType<typeof getExtendedClient>;

let db: ExtendedPrismaClient;

declare global {
	var __db__: ExtendedPrismaClient;
}

if (process.env.NODE_ENV === "production") {
	db = getExtendedClient();
} else {
	if (!global.__db__) {
		global.__db__ = getExtendedClient();
	}
	db = global.__db__;
}

export { db };
