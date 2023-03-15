import path from 'path'
import Client from 'ssh2-sftp-client'
import { createUnplugin } from 'unplugin'
import type { Options } from './types'

export default createUnplugin<Options | undefined>((options) => {
  let distName: string
  return {
    name: 'unplugin-ftp-upload',
    enforce: 'post',
    buildEnd() {
      if (!options) {
        console.log('请配置服务器参数')
        return
      }

      const localPath = path.resolve(process.cwd(), distName)
      const remotePath = options?.serviceDir

      setTimeout(async () => {
        const client = new Client()
        try {
          await client.connect(options)
          console.log('连接服务器成功')
          if (await client.exists(remotePath)) {
            await client.rmdir(remotePath, true)
            console.log('删除成功')
          }
          const result = await client.uploadDir(localPath, remotePath)
          console.log('上传成功')
          return result
        }
        catch (error) {
          console.log(error)
        }
        finally {
          client.end()
        }
      }, 1500)
    },
    vite: {
      configResolved(config) {
        distName = config.build.outDir
      },
    },
    webpack(config) {
      distName = config.outputPath
    },
    rollup: {
      renderStart(option) {
        distName = option.dir || 'dist'
      },
    },
  }
})
