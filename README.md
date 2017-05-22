Basic WebPack Generator
========================

A barebones webpack project [nyg](https://github.com/Jam3/nyg) generator for quick sketeches and prototypes.

This project includes:

* Babel ES2015 preset (babel-loader, babel-preset-2015)
* .scss loader for stylesheets (sass-loader)
* Auto-generated HTML file (html-webpack-plugin)
* WebPack dev server (webpack-dev-server)

Usage
-----

Install `nyg` if you haven't already and the generator.

```
npm install -g nyg
npm install -g andyinabox/generator-webpack-basic
```

Create your project and run generator

```
mkdir project
cd project/
nyg generator-webpack-basic
```