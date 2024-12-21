import { loadEnv, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'
import svgLoader from 'vite-svg-loader'
import Components from 'unplugin-vue-components/vite';
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import { createHtmlPlugin } from 'vite-plugin-html'
import mkcert from "vite-plugin-mkcert";
import esbuild from 'rollup-plugin-esbuild'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    server: {
      https: true
    },
    plugins: [
      mkcert(),
      vue(),
      createHtmlPlugin({
        minify: true,
        inject: {
          data: {
            title: env.VITE_APP_DEFAULT_TITLE,
            keywords: env.VITE_APP_KEYWORDS,
            description: env.VITE_APP_DESCRIPTION
          }
        }
      }),
      svgLoader(),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false, // css in js
          }),
        ],
      }),
      // {
      //   ...esbuild({
      //     target: 'chrome70',
      //     include: /\.vue|.ts|.js$/,
      //     loaders: {
      //         '.vue': 'js'
      //     }
      //   }),
      //   enforce: 'post'
      // },
    ],
    resolve: {
      alias: {
        '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
        '@': path.resolve(__dirname, '.', 'src')
      }
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        // external: [
        //   'web3OnboardCore'
        // ],
        output: {
          manualChunks: {
            'library': [
              'ant-design-vue',
            ],
          },
          // globals: {
          //   web3OnboardCore: '@web3-onboard/core',
          // },
        },
      }
    },
  }
})