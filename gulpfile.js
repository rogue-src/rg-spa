var gulp = require("gulp"),
    uglify = require("gulp-uglify"),
    rimraf = require("rimraf"),
    concat = require("gulp-concat"),
    uglifycss = require("gulp-uglifycss");

var paths = {
    src: "src/app/assets/src/",
    dest: "src/app/assets/dist/"
};

gulp.task('build:all', ['build:vendorjs', 'build:iejs', 'build:appjs', 'build:vendorcss', 'build:appcss', 'copy:fonts'], function () {
});

gulp.task('build:vendorjs', function () {
    gulp.src(
        [
            paths.src + 'vendor/jquery/dist/jquery.js',
            paths.src + 'vendor/jqueryui/jquery-ui.js',
            paths.src + 'vendor/bootstrap/dist/js/bootstrap.js'
        ])
        .pipe(concat('vendor.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dest + "js"));
});

gulp.task('build:iejs', function () {
    gulp.src(
        [
            paths.src + 'vendor/html5shiv/dist/html5shiv.js',
            paths.src + 'vendor/respond/src/respond.js'
        ])
        .pipe(concat('ie.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dest + 'js'));
});

gulp.task('build:appjs', function () {
    gulp.src(
        [
            paths.src + 'js/modules/*.js',
            paths.src + 'js/controllers/**/*.js',
            paths.src + 'js/services/*.js',
            paths.src + 'js/appStart.js'
        ])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.dest + 'js'));
});

gulp.task('build:vendorcss', function () {
    gulp.src(
        [
            paths.src + 'vendor/font-awesome/css/font-awesome.css'
        ])
        .pipe(concat('vendor.css'))
        .pipe(uglifycss({
            "uglyComments": true
        }))
        .pipe(gulp.dest(paths.dest + 'css'));
});

gulp.task('build:appcss', function () {
    gulp.src(
        [
            paths.src + 'css/bootstrap.css',
            paths.src + 'css/app.css'
        ])
        .pipe(concat('app.css'))
        .pipe(uglifycss({
            "uglyComments": true
        }))
        .pipe(gulp.dest(paths.dest + 'css'));
});

gulp.task('copy:fonts', function () {
    gulp.src(
        [
            paths.src + 'vendor/font-awesome/fonts/*.{ttf,woff,eot,svg,otf,woff2}',
            paths.src + 'vendor/bootstrap/dist/fonts/*.{ttf,woff,eot,svg,woff2}'
        ])
        .pipe(gulp.dest(paths.dest + 'fonts'));
});