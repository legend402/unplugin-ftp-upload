import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Unplugin from '../src/vite'

export default defineConfig({
  plugins: [
    Inspect(),
    Unplugin({
      ...require('./auth.json'),
      serviceDir: '/root/web/test',
      backupPath: '/root/web/test_backup',
      delay: 1500,
    }),
  ],
})
