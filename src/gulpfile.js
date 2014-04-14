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


// js
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

// js min
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

// css
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

// css min
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


// publish
gulp.task('publish', function () {
  gulp.run('js');
  gulp.run('js-min');
  gulp.run('css');
  gulp.run('css-min');
});


// clean
gulp.task('clean', function() {
  gulp.src(['./dist/js/bundle.js',
            './dist/js/bundle.min.js',
            './dist/css/bundle.css',
            './dist/css/bundle.min.css'], {read: false})
    .pipe(clean());
});


// watch
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


// default task
gulp.task('default', ['watch']);


// run
gulp.run('js');
gulp.run('css');
