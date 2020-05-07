const path = require("path");
const config = require("./project.config.js");
const gulp = require("gulp");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const autoprefixer = require("gulp-autoprefixer");
const del = require("del");
const webpack = require("webpack-stream");
const browserSync = require("browser-sync");

let scriptExtension = config.useTypescript ? ".ts" : ".js";
let scriptLoader = config.useTypescript ? {test: /\.ts$/, loader: 'ts-loader', exclude: path.resolve(__dirname, "node_modules")} : {test: /\.js$/, loader: 'babel-loader', exclude: path.resolve(__dirname, "node_modules")};
let scriptEntryPath = config.scriptPath + "/" + config.scriptEntryName + scriptExtension;
let styleEntryPath = config.stylePath + "/" + config.scriptEntryName;
let scriptSourceMap = config.mode === "development" ? "inline-source-map" : "none";
let webpackConfig = {
    mode: config.mode,
    output: {
        filename: config.outputScriptName + ".js"
    },
    resolve: {
        extensions: [scriptExtension],
    },
    devtool: scriptSourceMap,
    module: {
        rules: [
            scriptLoader
        ]
    }
};

const build = gulp.series(cleanDistFolder, gulp.parallel(compileScript, compileStyle, compileAssets));
const serve = gulp.series(build, gulp.parallel(watcher));

function compileScript() {
    return gulp.src(scriptEntryPath, {allowEmpty: true})
        .pipe(webpack(webpackConfig))
        .pipe(gulp.dest(config.distPath))
        .pipe(browserSync.stream())
}
function compileStyle() {
    if (config.mode === "development") {
        return gulp.src(styleEntryPath + ".{scss, sass, css}", {allowEmpty: true})
            .pipe(sass())
            .pipe(autoprefixer({level: 2}))
            .pipe(concat(config.outputStyleName + ".css"))
            .pipe(gulp.dest(config.distPath))
            .pipe(browserSync.stream())
    } else if (config.mode === "production") {
        return gulp.src(styleEntryPath + ".{scss, sass, css}", {allowEmpty: true})
            .pipe(sass())
            .pipe(autoprefixer())
            .pipe(cleanCSS())
            .pipe(concat(config.outputStyleName + ".css"))
            .pipe(gulp.dest(config.distPath))
            .pipe(browserSync.stream())
    }
}
function compileAssets() {
    return gulp.src([config.fontPath + "/*", config.imagePath + "/*"], { allowEmpty: true })
        .pipe(gulp.dest(config.distPath))
        .pipe(browserSync.stream())
}
function cleanDistFolder() {
    return del(config.distPath + "/*");
}
function watcher() {
    browserSync.init({
        server: {
            baseDir: config.distPath,
            port: config.port,
            open: true
        }
    })
    gulp.watch(config.stylePath + "/**/*", compileStyle);
    gulp.watch(config.scriptPath + "/**/*", compileScript);
    gulp.watch([config.fontPath + "/**/*", config.imagePath + "/*"], compileAssets);
}

gulp.task("build", build);
gulp.task("serve", serve);
