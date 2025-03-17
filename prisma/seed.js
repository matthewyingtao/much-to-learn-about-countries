import { PrismaClient } from "@prisma/client";

const countries = ["New Zealand", "India", "America"];

const prisma = new PrismaClient();

async function main() {
	for (const country of countries) {
		await prisma.country.create({
			data: {
				name: country,
			},
		});
	}
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
