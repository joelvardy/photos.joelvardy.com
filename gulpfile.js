// Load plugins
var gulp = require('gulp'),
	del = require('del'),
	concat = require('gulp-concat'),
	sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
	uglify = require('gulp-uglifyjs');


// Styles
gulp.task('styles', function () {

    return sass('./public/assets/scss/design.scss')
        .pipe(autoprefixer())
        .pipe(minifyCSS())
        .on('error', function (error) {
            console.error('Error!', error);
        })
        .pipe(gulp.dest('./public/assets/minified'));

});


// JavaScript
gulp.task('scripts', function () {

    return gulp.src(['bower_components/angular/angular.min.js', 'bower_components/angular-route/angular-route.min.js', 'bower_components/angular-touch/angular-touch.min.js', 'public/assets/js/**/*.js'])
        .pipe(concat('app.js'))
        .pipe(uglify())
        .on('error', function (error) {
            console.error('Error!', error);
        })
        .pipe(gulp.dest('./public/assets/minified'));

});


// Clean
gulp.task('clean', function () {
    del(['./public/assets/minified/*']);
});


// Default task
gulp.task('default', ['clean'], function () {
    gulp.start('styles', 'scripts');
});

// Watch
gulp.task('watch', function () {
    gulp.watch('./public/assets/scss/**/*.scss', ['styles']);
    gulp.watch('./public/assets/js/**/*.js', ['scripts']);
});
