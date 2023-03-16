import type Client from 'ssh2-sftp-client'
export interface Options extends Client.ConnectOptions {
  // define your plugin options here
  serviceDir: string
  delay?: number
  backupPath?: string
}
