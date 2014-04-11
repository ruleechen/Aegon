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

//Scripts
gulp.task('scripts', function(){
  gulp
    .src('js/app.js')
    .pipe(browserify({
      insertGlobals : true,
      debug : true
    }))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest('./js'));
});


// Less
gulp.task('less', function () {
  gulp
    .src('css/main.less')
    .pipe(less({
      sourceMap: true
    }))
    .pipe(gulp.dest('css'))
    .pipe(livereload(server));
});

gulp.task('production', function () {
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
    .pipe(gulp.dest('./js'));

  gulp
    .src('css/main.less')
    .pipe(less({
      sourceMap: false
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('css'));
});


// Clean
gulp.task('clean', function() {
  gulp.src(['./js/bundle.js',
                   './js/bundle.min.js',
                   './css/main.min.css',
                   './css/main.css'], {read: false})
    .pipe(clean());
});


// Watch
gulp.task('watch', function () {
  var paths = {
    scripts: ['js/**/*.js', 'test/fixtures/*.js'],
    styles: ['css/**/*.less']
  };
  server.listen(35729, function (err) {
    if (err) {
      return console.log(err)
    };
    gulp.watch(paths.scripts, ['scripts']);
    gulp.watch(paths.styles, ['less']);
  });
});

// Default task
gulp.task('default', ['watch']);

