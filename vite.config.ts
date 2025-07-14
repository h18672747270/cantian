import { defineConfig, loadEnv } from 'vite'
import type { ConfigEnv } from 'vite'
import { visualizer } from 'rollup-plugin-visualizer'
import vue from '@vitejs/plugin-vue'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import postcsspxtoviewport8plugin from 'postcss-px-to-viewport-8-plugin'
import { viteMockServe } from 'vite-plugin-mock'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { resolve, join } from 'path'
import { readdirSync, statSync, existsSync } from 'fs'
import { svgHelper } from './src/utils/svgHelper'

interface modulesObject<T> {
  [key: string]: T
}

const moduleObj: modulesObject<string> = {}
const moduleList: string[] = []

/**
 * 递归遍历目录函数
 * @param currentPath 目标文件夹
 */
function traverseDirectory(currentPath: string, fileList: string[] = []) {
  // 读取当前目录下的所有文件和文件夹
  const files: string[] = readdirSync(currentPath)
  // 遍历所有文件和文件夹
  files.forEach(file => {
    const filePath = join(currentPath, file)
    const stats = statSync(filePath)
    // 如果是文件夹，则递归遍历
    if (stats.isDirectory()) {
      if (existsSync(join(filePath, 'index.html'))) {
        fileList.push(filePath.split('\\').join('/'))
      }
      traverseDirectory(filePath, fileList)
    }
  })
}
traverseDirectory('./src/modules/', moduleList)

// 添加所有入口模块
moduleList.forEach((item: string) => {
  moduleObj[item] = join(__dirname, `${item}/index.html`)
})
moduleObj['src/modules/index'] = join(__dirname, `src/modules/index.html`)

export default defineConfig(({ mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd())
  return {
    root: env.VITE_ROOT_PATH,
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        cpns: resolve(__dirname, 'src/components'),
      },
      extensions: ['.js', '.json', '.ts', '.vue'], // 使用路径别名时想要省略的后缀名，可以自己 增减
    },
    build: {
      target: 'esnext',
      rollupOptions: {
        input: moduleObj,
        output: { dir: './dist' },
      },
      chunkSizeWarningLimit: 5000000,
    },
    esbuild: {
      drop: mode === 'prod' ? ['console', 'debugger'] : [], // 删除 所有的console 和 debugger
    },
    server: {
      host: '0.0.0.0',
      port: 8080,
      open: false,
      // proxy: {
      //   // 使用 proxy 实例
      //   '/api': {
      //     target: env.VITE_APP_API_BASE_URL,
      //     changeOrigin: true,
      //     rewrite: path => path.replace(/^\/api/, ''),
      //   },
      // },
    },
    plugins: [
      vue(),
      visualizer(),
      AutoImport({
        include: [
          /\.[tj]s?$/, // .ts, .js,
          /\.vue$/,
          /\.vue\?vue/, // .vue
        ],
        // 自定引入 Vue VueRouter @vueuse/core API,如果还需要其他的可以自行引入
        imports: ['vue', 'vue-router'],
        // 调整自动引入的文件位置
        dts: '../auto-import.d.ts',
        // 解决自动引入eslint报错问题 需要在eslintrc的extend选项中引入
        eslintrc: {
          enabled: true,
          // 配置文件的位置
          filepath: '../../.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
      }),
      Components({
        // dirs 指定组件所在位置，默认为 src/components
        // 可以让我们使用自己定义组件的时候免去 import 的麻烦
        dirs: ['../components/'],
        // 配置需要将哪些后缀类型的文件进行自动按需引入，'vue'为默认值
        extensions: ['vue'],
        // 遍历子目录
        deep: true,
        resolvers: [
          AntDesignVueResolver({
            importStyle: false, // css in js
            exclude: ['Button'],
          }),
        ],
        // 生成components.d.ts
        dts: '../components.d.ts',
      }),
      // 配置mock
      viteMockServe({
        mockPath: '/mock',
        localEnabled: true,
      }),
      // px转vw配置
      postcsspxtoviewport8plugin({
        unitToConvert: 'px', // 需要转换的单位，默认为"px"
        viewportWidth: 1920, // 设计稿的视窗宽度
        unitPrecision: 5, // 单位转换后保留的精度
        propList: ['*'], // 能转化为 vw 的属性列表
        // propList: ['*', '!font-size'], // 能转化为 vw 的属性列表
        viewportUnit: 'vw', // 希望使用的视窗单位
        fontViewportUnit: 'vw', // 字体使用的视窗单位
        selectorBlackList: [], // 需要忽略的 CSS 选择器，不会转为视窗单位，使用原有的 px 等单位
        minPixelValue: 1, // 设置最小的转换数值，如果为 1 的话，只有大于 1 的值会被转换
        mediaQuery: false, // 媒体查询里的单位是否需要转换单位
        replace: true, // 是否直接更换属性值，而不添加备用属性
        exclude: undefined, // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
        // exclude: [/node_modules/],     // 解决vant375,设计稿750问题。忽略某些文件夹下的文件或特定文件
        include: /\/src\//, // 如果设置了include，那将只有匹配到的文件才会被转换
        landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件
        landscapeUnit: 'vw', // 横屏时使用的单位
        landscapeWidth: 1125,
      }),
      svgHelper('./src/assets/svg/'),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/variables.scss";',
        },
      },
    },
    define: {
      GLOBAL_VARIABLE: {
        VITE_APP_API_BASE_URL: env.VITE_APP_API_BASE_URL,
        VITE_APP_ASSETS_BASE_URL: env.VITE_APP_ASSETS_BASE_URL,
      },
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
    },
  }
})
