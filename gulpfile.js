var gulp = require('gulp');
var plumber = require('gulp-plumber');
var del = require('del');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var minify = require('gulp-clean-css');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var htmlmin = require('gulp-htmlmin');
var sourcemaps = require('gulp-sourcemaps');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var src = {
    html: 'app/*.html',
    scss: 'app/scss/styles.scss',
    js: 'app/js/*.js'
};

gulp.task('default', function() {
    console.log('Hello World');
});

gulp.task('clean', function() {
    return del(['dist']);
});

gulp.task('html', function() {
   return gulp.src(src.html)
       .pipe(plumber())
       .pipe(htmlmin({collapseWhitespace: true}))
       .pipe(gulp.dest('dist/'))
       .pipe(reload({stream: true}));
});

gulp.task('styles', function() {
    return gulp.src(src.scss)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('styles.scss'))
        .pipe(sass({
            outputStyle: 'compressed',
            includePaths: require('node-normalize-scss').includePaths
        }))
        .pipe(autoprefixer({
            browsers: ['> 1%']
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('../map'))
        .pipe(gulp.dest('dist/css'))
        .pipe(reload({stream: true}));
});

gulp.task('scripts', function() {
   return gulp.src([
       'bower_components/jquery/dist/jquery.min.js',
       src.js
   ])
       .pipe(plumber())
       .pipe(sourcemaps.init())
       .pipe(concat('bundle.js'))
       .pipe(uglify({preserveComments: 'license'}))
       .pipe(rename({suffix: '.min'}))
       .pipe(sourcemaps.write('../map'))
       .pipe(gulp.dest('dist/js'))
       .pipe(reload({stream: true}));
});

gulp.task('browser-sync', function() {
   return browserSync.init({
       server: {
           baseDir: 'dist/'
       }
   });
});

gulp.task('watch', function() {
    gulp.watch(src.html, ['html']);
    gulp.watch([src.scss, 'app/scss/**/*.scss'], ['styles']);
    gulp.watch(src.js, ['scripts']);
});

gulp.task('build', ['clean'], function(){
   return runSequence('styles', 'scripts', 'html');
});

gulp.task('default', ['clean'], function() {
    return runSequence('styles', 'scripts', 'html', 'browser-sync', 'watch');
});