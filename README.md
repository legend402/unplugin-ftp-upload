# unplugin-ftp-upload

[![NPM version](https://img.shields.io/npm/v/unplugin-ftp-upload?color=a1b858&label=)](https://www.npmjs.com/package/unplugin-ftp-upload)

After you build your project, automatically upload the project to your service.

## Usage

| options    | desc                                   | type   | default | must |
| ---------- | -------------------------------------- | ------ | ------- | ---- |
| host       | service host                           | string |         | ✅   |
| port       | service port                           | string |         | ✅   |
| username   | service username                       | string |         | ✅   |
| password   | service password                       | string |         | ✅   |
| serviceDir | website dir in your service            | string |         | ✅   |
| delay      | How long after the package is complete | number | 1500ms  | ❌   |
| backupPath | backup file path                       | string |         | ❌   |

other config, [look here](https://www.npmjs.com/package/ssh2-sftp-client)

目前支持wepack，vite，其他打包工具还在摸索中

## Install

```bash
npm i unplugin-ftp-upload
```

<details>
<summary>Vite</summary><br>

```ts
// vite.config.ts
import Starter from 'unplugin-ftp-upload/vite'

export default defineConfig({
  plugins: [
    Starter({ /* options */ }),
  ],
})
```

Example: [`playground/`](./playground/)

`<br></details>`

<details>
<summary>Webpack</summary><br>

```ts
// webpack.config.js
module.exports = {
  /* ... */
  plugins: [
    require('unplugin-ftp-upload/webpack')({ /* options */ })
  ]
}
```

`<br></details>`

<details>
<summary>Vue CLI</summary><br>

```ts
// vue.config.js
module.exports = {
  configureWebpack: {
    plugins: [
      require('unplugin-ftp-upload/webpack')({ /* options */ }),
    ],
  },
}
```

`<br></details>`
