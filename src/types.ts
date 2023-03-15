import type Client from 'ssh2-sftp-client'
export interface Options extends Partial<Client.ConnectOptions> {
  // define your plugin options here
  serviceDir?: string
}
