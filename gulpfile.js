"use strict"
 
const Gulp          = require("gulp");
const Sass          = require("gulp-sass");
const Minify        = require("gulp-minify");
const Rename        = require("gulp-rename");
const CleanCss      = require("gulp-clean-css");
const Concat        = require("gulp-concat");
const StipComments  = require("gulp-strip-comments");
const UglifyJS      = require("gulp-uglify");
const MinifyImg   = require("gulp-image");
const ImageMin     = require("gulp-imagemin");
/*
*/

Sass.compiler       = require("node-sass");

Gulp.task("MainHtml", MainHtmlCompiler);
Gulp.task("VendorScss", VendorScssCompiler);
Gulp.task("VendorJS", VendorJsCompiler);
Gulp.task("VendorImg", VendorImgCompiler);
Gulp.task("AppJs", AppJsCompiler);

Gulp.task('init', function() {
    Gulp.watch("project/*.html", Gulp.series('MainHtml'));
    Gulp.watch("project/vendor/scss/**/*.scss", Gulp.series('VendorScss'));
    Gulp.watch("project/vendor/js/**/*.js", Gulp.series('VendorJS'));
    Gulp.watch("project/vendor/images/**/*", Gulp.series('VendorImg'));
    Gulp.watch("project/app/**/*", Gulp.series('AppJs'));
});

function MainHtmlCompiler ( ) {
    return Gulp 
        .src("project/*.html")
        .pipe(Gulp.dest("public"));
};

function VendorScssCompiler ( ) {
    return CompilerSass ("project/vendor/scss/**/*.scss", "public/vendor/css");
};

function VendorJsCompiler ( ) {
    return Gulp 
        .src("project/vendor/js/**/*.js")
        .pipe(Concat("ebd.js"))
        .pipe(StipComments())
        .pipe(UglifyJS())
        .pipe(Minify({ ext: { min: ".min.js"} }))
        .pipe(Gulp.dest("public/vendor/js"));
};

function VendorImgCompiler ( ) {
    return Gulp 
        .src("project/vendor/images/**/*")
        .pipe(MinifyImg())
        .pipe(ImageMin())
        .pipe(MinifyImg())
        .pipe(ImageMin())
        .pipe(Gulp.dest("public/vendor/images"));
};


function AppJsCompiler ( ) {
    return Gulp 
        .src("project/app/**/*")
        .pipe(Gulp.dest("public/app"));
};

function CompilerSass ( origin, destinity ) {
    return Gulp 
        .src(origin)
        .pipe(Sass())
        .pipe(Minify())
        .pipe(Rename({ suffix: ".min" }))
        .pipe(CleanCss())
        .pipe(Gulp.dest(destinity));
};
