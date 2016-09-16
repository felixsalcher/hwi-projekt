var gulp = require('gulp');
var plumber = require('gulp-plumber');
var clean = require('gulp-clean');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');

gulp.task('default', function() {
    console.log('Hello World');
});

gulp.task('clean', function() {
    return gulp.src('dist/**/*')
        .pipe(clean());
});

gulp.task('style', function() {
    return gulp.src('app/sass/style.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(sourcemaps.write('../map'))
        .pipe(gulp.dest('dist/css'));
});