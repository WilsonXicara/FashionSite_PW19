var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');

// Convert SCSS files to CSS
gulp.task('sass', function() {
    return gulp.src([
            'scss/**/*.scss'
        ])
        .pipe(sass({
            outputStyle: 'uncompressed'
        }).on('error', sass.logError))
        .pipe(concat('global-styles.css'))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream());
});

// Move JS Files to the src
// gulp.task('js', function() {
//     return gulp.src([
//             'node_modules/jquery/dist/jquery.min.js',
//             'src/js/jquery-migrate-3.0.1.min.js',
//             'node_modules/poper.js/dist/popper.min.js',
//             'node_modules/bootstrap/dist/js/bootstrap.min.js',
//             'src/js/jquery.easing.1.3.js',
//             'src/js/jquery.waypoints.min.js',
//             'src/js/jquery.stellar.min.js',
//             'src/js/owl.carousel.min.js',
//             'src/js/jquery.magnific-popup.min.js',
//             'src/js/aos.js',
//             'src/js/jquery.animateNumber.min.js',
//             'src/js/bootstrap-datepicker.js',
//             'src/js/jquery.timepicker.min.js',
//             'src/js/google-map.js',
//             'src/js/main.js'
//         ])
//         .pipe(concat('scripts.js'))
//         .pipe(gulp.dest('dist/js'))
//         .pipe(rename('scripts.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'))
//         .pipe(browserSync.stream());
// });

// Local server
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: './'
    });
});

gulp.watch(['scss/**/*.scss'], ['sass']);
// gulp.watch(['src/js/*.js'], ['js']);
gulp.watch('./*.html').on('change', browserSync.reload);

// Start server on default task

gulp.task('default',['sass','serve']);