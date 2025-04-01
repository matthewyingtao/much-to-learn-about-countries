module.exports = {
	onPreBuild: async ({ utils }) => {
		await utils.run.command(
			"mkdir -p node_modules/openai/helpers && cp node_modules/zod/lib/index.mjs node_modules/openai/helpers/zod.mjs"
		);
	},
};
