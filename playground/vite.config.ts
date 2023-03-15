import { defineConfig } from 'vite'
import Inspect from 'vite-plugin-inspect'
import Unplugin from '../src/vite'

export default defineConfig({
  plugins: [
    Inspect(),
    Unplugin({
      host: '8.136.21.236',
      port: 22,
      username: 'root',
      password: 'hyjhyf419123.',
      serviceDir: '/root/web/test',
    }),
  ],
})
