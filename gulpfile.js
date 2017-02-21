var gulp        = require('gulp'),
    concat      = require('gulp-concat'),
    stylus      = require('gulp-stylus'),
    uglify      = require('gulp-uglify'),
    jade        = require('gulp-jade'),
    tap         = require('gulp-tap'),
    path_       = require('path'),
    nodemon     = require('gulp-nodemon'),
    plumber     = require('gulp-plumber'),
    notify      = require("gulp-notify");

var taskPaths = {
  stylus: {
    orig: 'assets/css/**/*.styl',
    dest: 'public/css/'
  },
  jade: {
    orig: 'assets/templates/**/*.jade',
    dest: 'public/templates/'
  },
  uglify: {
    orig: 'assets/js/**/*.js',
    dest: 'public/js/'
  }
};

var watchPaths = {
  jade: './assets/templates/**/*',
  uglify: './assets/js/**/*',
  stylus: './assets/css/**/*',
  jadeViews: 'view/**/*.jade'
};

var notifyError = function(err, type) {
  if (type === 'nodemon') {
    return notify({
      title: 'Error en nodemon',
      message: 'Checa el gulp'
    }).write(err);
    
    // this.emit('end');
  } else {
    console.log('Error:', err);
    
    var error       = err.message;  
    var messageText = error.substring(error.lastIndexOf('\\')+1);
    var fileName    = messageText.substring(0, messageText.indexOf(':'));
    var title       = fileName + ':' + err.lineNumber;
    var message     = messageText.substring(messageText.indexOf(':')+2);

    return notify({
      title: title,
      message: message
    }).write(err);
    
    this.emit('end');
  }

};

gulp.task('stylus', function(){
  return gulp.src(taskPaths.stylus.orig)
  .pipe(stylus({compress: true}))
  .pipe(concat('style.css'))
  .pipe(gulp.dest(taskPaths.stylus.dest));
});

gulp.task('uglify', function(){
  return gulp.src(taskPaths.uglify.orig)
  .pipe(plumber({
      errorHandler: function (err) {
          notifyError(err);
      }})
  )
  .pipe(uglify())
  .pipe(plumber.stop())
  .pipe(gulp.dest(taskPaths.uglify.dest));
});

gulp.task('jade', function(){
  return gulp.src(taskPaths.jade.orig)
  .pipe(plumber({
      errorHandler: function (err) {
          notifyError(err);
      }})
  )
  .pipe(jade({client: true}))
  .pipe(tap(function(file, t) {
    //var filename = path_.basename(file.path, '.js');
    var filename = file.path.substring(file.path.indexOf('templates/') + 'templates/'.length, file.path.length - 3).replace(/\//gi, '.');
    file.contents = Buffer.concat([
        new Buffer('this["JST"] = this["JST"] || {}; this["JST"]["' + filename + '"] = '),
        file.contents
    ]);
  }))
  .pipe(uglify())
  // .pipe(concat('templates.js'))
  .pipe(uglify())
  .pipe(plumber.stop())
  .pipe(gulp.dest(taskPaths.jade.dest));
});

gulp.task('nodemon', function() {
  nodemon({
    script: 'index.js',
    ext: 'js',
    ignore: ['assets/**/*.js','public/**/*.js', 'node_modules/**/*.js']
  })
  .on('crash', function(){
    notifyError({something: 1}, 'nodemon');
  })
  .on('restart', function(){
    console.log('Server restarted!');
  });
});

gulp.task('default', [ 'stylus', 'jade', 'uglify', 'nodemon' ], function(){
  gulp.watch(watchPaths.stylus, ['stylus']);
  gulp.watch(watchPaths.jade, ['jade']);
  gulp.watch(watchPaths.uglify, ['uglify']);
});
