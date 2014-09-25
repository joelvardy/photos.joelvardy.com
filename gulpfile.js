// Load plugins
var gulp = require('gulp'),
	concat = require('gulp-concat'),
	notify = require('gulp-notify'),
	rimraf = require('gulp-rimraf'),
	sass = require('gulp-ruby-sass'),
	uglify = require('gulp-uglifyjs');


// SASS
gulp.task('styles', function () {
	return gulp.src('public/assets/sass/design.scss')
	.pipe(sass({
		sourcemap: true,
		style: 'compressed'
	}))
	.on('error', notify.onError(function (error) {
		return error.message;
	}))
	.pipe(gulp.dest('public/assets/minified'))
	.pipe(notify({
		title: 'Styles',
		message: 'Task complete'
	}));
});


// JavaScript
gulp.task('scripts', function () {
	return gulp.src('public/assets/js/**/*.js')
	.pipe(concat('app.js'))
	.pipe(uglify())
	.pipe(gulp.dest('public/assets/minified'))
	.pipe(notify({
		title: 'Scripts',
		message: 'Task complete'
	}));
});


// Clean
gulp.task('clean', function() {
	return gulp.src(['public/assets/minified'], {
		read: false
	})
	.pipe(rimraf());
});


// Default task
gulp.task('default', ['clean'], function() {
	gulp.start('styles', 'scripts');
});

// Watch
gulp.task('watch', function() {
	gulp.watch('public/assets/sass/**/*.scss', ['styles']);
	gulp.watch('public/assets/js/**/*.js', ['scripts']);
});
