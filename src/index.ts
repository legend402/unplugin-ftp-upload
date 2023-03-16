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
      const remoteBackupPath = options?.backupPath

      setTimeout(async () => {
        const client = new Client()
        try {
          await client.connect(options)
          console.log('连接服务器成功')

          if (remoteBackupPath && (await client.exists(remoteBackupPath))) {
            await client.rmdir(remoteBackupPath, true)
            console.log('删除上一份备份文件')
          }

          if (await client.exists(remotePath)) {
            if (remoteBackupPath) {
              await client.rename(remotePath, remoteBackupPath)
              console.log('成功生成备份文件')
            }
            else {
              await client.rmdir(remotePath, true)
              console.log(`删除${remotePath}文件`)
            }
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
      }, options.delay || 1500)
    },
    vite: {
      configResolved(config) {
        distName = config.build.outDir
      },
    },
    webpack(config) {
      let packPath: string | undefined
      try {
        packPath = config.root.options.output.path
      }
      catch (error) {
        packPath = config.options.output.path
      }
      distName = packPath?.replaceAll('\\', '/').split('/').at(-1) || 'dist'
    },
    rollup: {
      outputOptions(option) {
        distName = option.dir || 'dist'
      },
    },
  }
})
