import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Paths
const zodSourcePath = path.resolve(
	__dirname,
	"../node_modules/zod/lib/index.mjs"
);
const openaiHelpersDir = path.resolve(
	__dirname,
	"../node_modules/openai/helpers"
);
const zodDestPath = path.resolve(openaiHelpersDir, "zod.mjs");

// Ensure the directory exists
if (!fs.existsSync(openaiHelpersDir)) {
	fs.mkdirSync(openaiHelpersDir, { recursive: true });
}

// Copy the file
if (fs.existsSync(zodSourcePath)) {
	fs.copyFileSync(zodSourcePath, zodDestPath);
	console.log("Successfully copied zod.mjs to OpenAI helpers directory");
} else {
	console.error("Could not find zod module source");
}
