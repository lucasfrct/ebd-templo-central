"use strict"
 
const Gulp          = require("gulp");
const Sass          = require("gulp-sass");
const Rename        = require("gulp-rename");
const Concat        = require("gulp-concat");
const MinifyImg     = require("gulp-imagemin");
const CompressImg   = require("gulp-image");
const StipComments  = require("gulp-strip-comments");
const Minify        = require("gulp-minify");
const MinifyJS      = require("gulp-uglify");
const MinifyCSS     = require("gulp-clean-css");

Sass.compiler       = require("node-sass");

Gulp.task("MainHtml", MainHtmlCompiler)

//Gulp.task("SassCompiler", SassCompiler);
//Gulp.task("JsCompiler", JsCompiler);
//Gulp.task("AppCompiler", AppCompiler);
//Gulp.task("ImgMinify", ImgCompiler);

Gulp.task('init', function() {
    //Gulp.watch("scss/**/*.scss", gulp.series('SassCompiler'));
    //Gulp.watch("js/**/*.js", gulp.series('JsCompiler'));
    //Gulp.watch("app/**/*.js", gulp.series('JsCompiler'));
    //Gulp.watch("images/**/*", gulp.series('ImgMinify'));
});


function MainHtmlCompiler ( ) {
    return Gulp 
        .src("project/*.html")
        .pipe(Gulp.dest("public"));
};


function SassCompiler( ){
    return gulp
        ///.src("project/vendor/scss/**/*.scss")
        .pipe(sass())                                   // converte sass para css
        .pipe(minify())                                 // minifica
        .pipe(rename({ suffix: ".min" }))               // renomeia
        .pipe(minifyCSS())                              // minifica
        .pipe(gulp.dest("public/vendor/css"))
}

function JsCompiler(){
    return gulp
        .src("project/vendor/js/**/*.js")                       
        .pipe(concat("main.js"))                            // concatena todos os arquivos
        .pipe(stipComments())                               // retira comentátios
        .pipe(minify({ ext: { min: ".min.js"} }))           // minifica
        .pipe(minifyJS())                                   // minifica
        .pipe(gulp.dest("public/vendor/js"))
}

function ImgCompiler (){
    return gulp 
        .src("project/vendor/images/**/*")
        .pipe(compressImg())
        .pipe(minifyImg())
        .pipe(compressImg())
        .pipe(minifyImg())
        .pipe(gulp.dest("public/vendor/images/"))
}

