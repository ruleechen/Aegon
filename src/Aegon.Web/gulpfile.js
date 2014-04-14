var gulp = require('gulp');
    browserify = require('gulp-browserify'),
    // notify = require('gulp-notify'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    ngmin = require('gulp-ngmin'),
    server = lr();


// JS
gulp.task('js', function(){
  gulp
    .src('js/app.js')
    .pipe(browserify({
      insertGlobals : true,
      debug : true
    }))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(livereload(server));
});

// JS MIN
gulp.task('js-min', function () {
  gulp
    .src('js/app.js')
    .pipe(browserify({
      insertGlobals : true,
      debug : false
    }))
    .pipe(concat('bundle.js'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(ngmin())
    // .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});

// CSS
gulp.task('css', function () {
  gulp
    .src('css/main.less')
    .pipe(less({
      sourceMap: true
    }))
    .pipe(concat('bundle.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(livereload(server));
});

// CSS MIN
gulp.task('css-min', function () {
  gulp
    .src('css/main.less')
    .pipe(less({
      sourceMap: false
    }))
    .pipe(concat('bundle.css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('./dist/css'));
});


// Publish
gulp.task('publish', function () {
  gulp.run('js');
  gulp.run('js-min');
  gulp.run('css');
  gulp.run('css-min');
});


// Clean
gulp.task('clean', function() {
  gulp.src(['./dist/js/bundle.js',
            './dist/js/bundle.min.js',
            './dist/css/bundle.css',
            './dist/css/bundle.min.css'], {read: false})
    .pipe(clean());
});


// Watch
gulp.task('watch', function () {
  var paths = {
    scripts: ['js/**/*.js'],
    styles: ['css/**/*.less', 'css/**/*.css']
  };
  server.listen(35729, function (err) {
    if (err) {
      return console.log(err)
    };
    gulp.watch(paths.scripts, ['js']);
    gulp.watch(paths.styles, ['css']);
  });
});


// Default task
gulp.task('default', ['watch']);

// Run
gulp.run('js');
gulp.run('css');
