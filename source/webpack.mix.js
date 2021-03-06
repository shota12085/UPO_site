const mix = require('laravel-mix');
const glob = require('glob')
glob.sync('resources/react/*/*.tsx').map(function (file) {
   mix.js(file, 'public/js')
      .webpackConfig({
         module: {
            rules: [
               {
                  test: /\.tsx?$/,
                  loader: 'ts-loader',
                  exclude: /node_modules/,
               },
            ],
         },
         resolve: {
            extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
         },
      });
})
glob.sync('resources/sass/*.scss').map(function (file) {
   mix.sass(file, 'public/css')
      .webpackConfig({
         module: {
            rules: [
               {
                  test: /\.tsx?$/,
                  loader: 'ts-loader',
                  exclude: /node_modules/,
               },
            ],
         },
         resolve: {
            extensions: ['*', '.js', '.jsx', '.ts', '.tsx'],
         },
      });
})
// /*
//  |--------------------------------------------------------------------------
//  | Mix Asset Management
//  |--------------------------------------------------------------------------
//  |
//  | Mix provides a clean, fluent API for defining some Webpack build steps
//  | for your Laravel application. By default, we are compiling the Sass
//  | file for the application as well as bundling up all the JS files.
//  |
//  */

// mix.react('resources/js/app.js', 'public/js')
//    .sass('resources/sass/app.scss', 'public/css');
