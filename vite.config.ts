import { defineConfig, loadEnv } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import viteCompression from 'vite-plugin-compression'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import * as path from 'path'
import vue from '@vitejs/plugin-vue'
import removeConsole from 'vite-plugin-remove-console'
import Pages from 'vite-plugin-pages'
import Layouts from 'vite-plugin-vue-layouts'

// https://vitejs.dev/config/
export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }
  return defineConfig({
    base: process.env.VITE_APP_BASE_URL,
    plugins: [
      vue(),
      removeConsole(),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]'
      }),
      viteCompression(),
      AutoImport({
        include: [
          /\.[tj]sx?$/,
          /\.vue$/, /\.vue\?vue/,
          /\.md$/
        ],
        imports: [
          'vue',
          'vue-router',
          {
            '@vueuse/core': [
              'useMouse',
              ['useFetch', 'useMyFetch']
            ],
            axios: [
              ['default', 'axios']
            ]
          }
        ],
        dirs: [
          'src/composables',
          'src/stores'
        ],
        dts: './auto-imports.d.ts',
        vueTemplate: false,
        resolvers: [

        ],
        eslintrc: {
          enabled: true,
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true
        }
      }),
      Components({
        dts: true
      }),
      Pages(),
      Layouts()
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    build: {
      assetsDir: './static',
      chunkSizeWarningLimit: 500,
      cssCodeSplit: true,
      reportCompressedSize: false
    }
  })
}
