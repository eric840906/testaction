/** @type {import('vite').UserConfig} */
import { defineConfig } from 'vite'
// vite.config.js
export default defineConfig({
  build: {
    target: 'esnext',
    rollupOptions: {
      input: 'src/main.ts',
      output: {
        banner: () => {
          const getTWTimeStr = () => {
            const d = new Date()
            const localTime = d.getTime()
            const localOffset = d.getTimezoneOffset() * 60000
            const utc = localTime + localOffset
            const offset = +8
            const tw = utc + 3600000 * offset
            return new Date(tw).toLocaleString('en-US')
          }
          const timeFormatter = (timeStr) => {
            const [inputDate, inputTime] = timeStr.split(', ')
            const tempDate = inputDate.split('/').map((item) => {
              if (item.length < 2) {
                return '0' + item
              }
              return item
            })
            tempDate.unshift(tempDate.pop()) // 將尾(年份)放到最前面
            const formattedDate = tempDate.join('-')
            return `${formattedDate} ${inputTime}`
          }
          const formattedTime = timeFormatter(getTWTimeStr())
          return `/*! oneplayer.js ${formattedTime}\n*/`
        },
        format: 'es',
        dir: '../guoshipartners/static/js',
        entryFileNames: 'oneplayer.js',
      },
    },
    emptyOutDir: false,
  },
  // config options
})
