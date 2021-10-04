module.exports = {
	"core": {
		"builder": 'webpack5'
	},
	"stories": [
		"../src/**/*.stories.@(js|mdx|md)"
	],
	"addons": [
		"@storybook/addon-links",
		"@storybook/addon-essentials",
		"@storybook/preset-scss"
	]
}
