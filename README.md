# tauri-app

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn tauri dev
```

### Compile and Minify for Production

```sh
yarn tauri build
```

### 下载项目 使用--recurse-submodules 一并下载子项目
```sh
git clone --recurse-submodules
```

添加submodule方法
```sh
git submodule add https://github.com/qilimazhualuo/3dmap.git src/common/map3
git submodule add https://github.com/qilimazhualuo/three.git src/common/three
git submodule add https://github.com/qilimazhualuo/2dMap.git src/common/map
```

```bash
debian系统依赖安装其他系统（。- 。）
sudo apt install pkg-config libgtk-3-dev libglib2.0-dev libgdk-pixbuf2.0-dev libpango1.0-dev libatk1.0-dev libcairo2-dev libsoup-3.0-dev libwebkit2gtk-4.1-dev libssl-dev
```