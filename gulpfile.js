'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const jade = require('gulp-jade');
const sass = require('gulp-sass');
const bc = 'bower_components/';

gulp.task('watch', () => {
    gulp.watch('js/lib/**/*.js', ['concatLib']);
    gulp.watch('js/app/**/*.js', ['concatApp']);
    gulp.watch('jade/**/*.jade', ['jade']);
    gulp.watch('sass/**/*.scss', ['sass']);
    gulp.watch('css/**/*.css', ['concatCSS']);
});

gulp.task('build', ['concatAssets', 'concatLib', 'concatApp', 'sass', 'concatCSS', 'jade'] );

gulp.task('concatAssets', () => {
    gulp.src([
        bc + 'angular/angular.min.js',
        bc + 'ng-dialog/js/ngDialog.min.js',
        bc + 'requirejs/require.js',
    ])
        .pipe(concat('libs.js'))
        .pipe(gulp.dest('build/assets/js'));

    gulp.src([
            bc + 'ng-dialog/css/ngDialog.min.css',
            bc + 'ng-dialog/css/ngDialog-theme-default.min.css'
        ])
        .pipe(concat('libs.css'))
        .pipe(gulp.dest('build/assets/css'));
});

gulp.task('concatLib', () => {
    gulp.src('js/lib/**/*.js')
        //.pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015'],
            plugins: ['transform-es2015-modules-amd']
        }).on('error', (e) => {

        }))
        //.pipe(concat('lib.js'))
        //.pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('concatApp', () => {
    gulp.src('js/app/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build/js'));
});

gulp.task('concatCSS', () => {
    gulp.src('css/**/*.css')
        .pipe(concat('build.css'))
        .pipe(gulp.dest('build/css'));
});

gulp.task('sass', () => {
    gulp.src('sass/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('css'));
});

gulp.task('jade', () => {
    gulp.src('jade/**/*.jade')
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('build'));
});