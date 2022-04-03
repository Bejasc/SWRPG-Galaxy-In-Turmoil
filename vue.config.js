module.exports = {
	publicPath: "",
	transpileDependencies: ["vuetify"],
	chainWebpack: config => {
		config.plugin("html").tap(args => {
			args[0].minify = false;
			return args;
		});
	},
	css: {
		extract: false,
	},
};
