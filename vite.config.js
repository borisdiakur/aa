const { resolve } = require('path')
const { defineConfig } = require('vite')
import vitePluginPug from 'vite-plugin-pug'

const base = process.env.APP_BASE || '/'
module.exports = defineConfig({
	plugins: [vitePluginPug(undefined, { base })],
	base,
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'index.html'),
				en: resolve(__dirname, 'en/index.html'),
				imprint: resolve(__dirname, 'imprint/index.html'),
				'en/imprint': resolve(__dirname, 'en/imprint/index.html'),
				privacy: resolve(__dirname, 'privacy/index.html'),
				'en/privacy': resolve(__dirname, 'en/privacy/index.html'),
			},
		},
	},
})
