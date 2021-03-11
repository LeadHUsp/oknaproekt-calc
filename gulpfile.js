const { src, dest, series, parallel, watch } = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const notify = require("gulp-notify");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const cleanCSS = require("gulp-clean-css");
const uglify = require("gulp-uglify-es").default;
const sourcemaps = require("gulp-sourcemaps");
const formatHtml = require("gulp-format-html");
const autoprefixer = require("gulp-autoprefixer");
const fileInclude = require("gulp-file-include");
const del = require("del");
const webpack = require("webpack");
const browserSync = require("browser-sync").create();
const pngquant = require("imagemin-pngquant");
const webpackStream = require("webpack-stream");
// const svgSprite     = require('gulp-svg-sprite');
// const ttf2woff      = require('gulp-ttf2woff');
// const ttf2woff2     = require('gulp-ttf2woff2');

const config = {
  isPug: true, // If true, the pugCompiller task is used, otherwise the html task is used
};
const path = {
  app: "./app",
  html: {
    html: "./src/*.html",
    pug: [
      "./src/pug/*.pug",
      "./src/pug/blocks/*.pug",
      "./src/pug/pages/*.pug",
      "./src/pug/inner-pages/*.pug",
      "./src/pug/inner-pages/blocks/inner-pages-blocks/*.pug",
    ],
    pugBuild: [
      "./src/pug/*.pug",
      "./src/pug/pages/*.pug",
      "./src/pug/inner-pages/*.pug",
    ],
    result: "./app/",
  },
  style: {
    libs: [
      "./src/libs/Magnific-Popup-master/dist/magnific-popup.css",
      "./src/libs/fancybox/dist/jquery.fancybox.min.css",
    ],
    scss: ["./src/scss/**/*.scss", "./src/scss/**/*.sass"],
    result: "./app/css",
  },
  images: {
    // svg: './src/img/**/*.svg',
    source: [
      "./src/img/**/*.jpg",
      "./src/img/**/*.jpeg",
      "./src/img/**/*.png",
      "./src/img/**/*.svg",
    ],
    result: "./app/img",
  },
  fonts: {
    allFons: "./src/fonts/**",
    link: "./src/fonts/**/*.css",
    source: "./src/fonts/**/*.ttf",
    result: "./app/fonts",
  },
  scripts: {
    libs: [
      "./src/libs/jquery/dist/jquery.min.js",
      "./src/libs/Magnific-Popup-master/dist/jquery.magnific-popup.min.js",
      "./src/libs/fancybox/dist/jquery.fancybox.min.js",
    ],
    source: {
      all: "./src/js/**/*.js",
      index: "./src/js/index.js",
      libs: "",
    },
    result: "./app/js",
  },
  resources: "./src/resources/**",
};
//HTML
const html = () => {
  return src(path.html.html)
    .pipe(
      fileInclude({
        prefix: "@",
        basepath: "@file",
      })
    )
    .pipe(dest(path.html.result))
    .pipe(browserSync.stream());
};
const pugCompiller = () => {
  return src(path.html.pug)
    .pipe(pug())
    .pipe(formatHtml())
    .pipe(dest(path.html.result))
    .pipe(browserSync.stream());
};
const pugCompillerBuild = () => {
  return src(path.html.pugBuild)
    .pipe(pug())
    .pipe(formatHtml())
    .pipe(dest(path.html.result))
    .pipe(browserSync.stream());
};
//CSS
const styles = () => {
  return src(path.style.scss)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", notify.onError())
    )
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(
      autoprefixer({
        cascade: true,
        grid: "autoplace",
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(dest(path.style.result))
    .pipe(browserSync.stream());
};
const syleLibs = () => {
  return src(path.style.libs)
    .pipe(concat("libs.css"), { allowEmpty: true })
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(cleanCSS({ compatibility: "ie10" }))
    .pipe(dest(path.style.result));
};
//IMAGES && SVG
const image = () => {
  return src(path.images.source).pipe(dest(path.images.result));
};
// const svgSprites = () => {
//   return src(path.images.svg)
//     .pipe(svgSprite({
//       mode: {
//         stack: {
//           sprite: '../sprite.svg'
//         }
//       }
//     }))
//     .pipe(dest(path.images.result))
// }
/* --- FONTS --- */
const fonts = () => {
  return src(path.fonts.allFons).pipe(dest(path.fonts.result));
};
// const fonts = () => {
//   src(path.fonts.link)
//     .pipe(dest(path.style.result))
//   src(path.fonts.source)
//     .pipe(ttf2woff())
//     .pipe(dest(path.fonts.result))
//   return src(path.fonts.source)
//     .pipe(ttf2woff2())
//     .pipe(dest(path.fonts.result))
// }
/* ---JAVASCRIPT --- */
const scripts = () => {
  return src(path.scripts.source.index)
    .pipe(
      webpackStream({
        mode: "development",
        output: {
          filename: "index.js",
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /node_modules|bower_components/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [["@babel/preset-env", { targets: "defaults" }]],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(sourcemaps.init())
    .pipe(uglify().on("error", notify.onError()))
    .pipe(sourcemaps.write("."))
    .pipe(dest(path.scripts.result))
    .pipe(browserSync.stream());
};
const scriptLibs = () => {
  return src(path.scripts.libs)
    .pipe(concat("libs.js"), { allowEmpty: true })
    .pipe(uglify())
    .pipe(dest(path.scripts.result));
};
//CLEANING
const clean = () => {
  return del(path.app);
};
//RESOURCES
const resources = () => {
  return src(path.resources).pipe(dest(path.app));
};
//WATCHING
const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: "./app",
    },
  });
  watch(path.style.scss, styles);
  config.isPug
    ? watch(path.html.pug, pugCompiller)
    : watch(path.html.html, html);
  watch(path.images.source, image);
  watch(path.fonts.source, fonts);
  watch(path.scripts.source.all, scripts);
  watch(path.resources, resources);
};
exports.default = series(
  clean,
  parallel(
    config.isPug ? pugCompiller : html,
    scriptLibs,
    scripts,
    fonts,
    image,
    resources
  ),
  syleLibs,
  styles,
  watchFiles
);
//BUILD
const stylesBuild = () => {
  return src(path.style.scss)
    .pipe(
      sass({
        outputStyle: "expanded",
      }).on("error", notify.onError())
    )
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(
      autoprefixer({
        cascade: true,
        grid: "autoplace",
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
      })
    )
    .pipe(dest(path.style.result));
};
const scriptsBuild = () => {
  return src(path.scripts.source.index)
    .pipe(
      webpackStream({
        mode: "production",
        output: {
          filename: "index.js",
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /node_modules|bower_components/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [["@babel/preset-env", { targets: "defaults" }]],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(uglify().on("error", notify.onError()))
    .pipe(dest(path.scripts.result));
};
const imageBuild = () => {
  return src(path.images.source)
    .pipe(
      imagemin({
        interlaced: true,
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        use: [pngquant()],
      })
    )
    .pipe(dest(path.images.result));
};
const destination = () => {
  return src(path.app + "/**/*").pipe(dest("./dist"));
};
exports.build = series(
  clean,
  parallel(
    config.isPug ? pugCompillerBuild : html,
    scriptLibs,
    scriptsBuild,
    fonts,
    imageBuild,
    resources
  ),
  syleLibs,
  stylesBuild,
  destination
);
