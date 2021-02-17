var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var merge = require('merge-stream');

var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var header = require('gulp-header');
var jshint = require('gulp-jshint');
var ngAnnotate = require('gulp-ng-annotate');
var order = require("gulp-order");
var templateCache = require('gulp-angular-templatecache');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');

var stylish = require('jshint-stylish');
var pkg = require('./package.json');

var exec = require('child_process').exec;

// Set the banner content
var banner = ['/*!\n',
  ' * <%= pkg.name %> - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
  ' * Copyright 2017-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
  ' */\n',
  ''
].join('');

function buildAppJS() {
  return gulp.src([
    'axa/static/axa/app.module.js',
    'axa/static/axa/*.js',
    'axa/static/axa/**/*.js',
    'axa/static/axa/**/**/*.js',
    'axa/static/axa/app.config.js',
    '!axa/static/axa/app.js',
    '!axa/static/axa/templates.js',
    '!axa/static/axa/*.min.js'
  ])
    .pipe(order([
      'axa/static/axa/app.module.js',
      'axa/static/axa/app.permissions.js',
      'axa/static/axa/app.config.js',
      'axa/static/axa/*.js',
      'axa/static/axa/**/*.js',
      'axa/static/axa/**/**/*.js',
      'axa/static/axa/app.run.js',
    ], { base: './' }))
    .pipe(concat('app.js', { newLine: ';' }))
    .pipe(ngAnnotate({ add: true }))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest('axa/static/axa/'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('axa/static/axa/'));
}

function buildAuthJS() {
  return gulp.src([
    'axa/static/auth/auth.module.js',
    'axa/static/auth/*.js',
    'axa/static/auth/**/*.js',
    'axa/static/auth/**/**/*.js',
    'axa/static/auth/auth.config.js',
    '!axa/static/auth/auth.js',
    '!axa/static/auth/*.min.js'
  ])
    .pipe(order([
      'axa/static/auth/auth.module.js',
      'axa/static/auth/auth.config.js',
      'axa/static/auth/*.js',
      'axa/static/auth/**/*.js',
      'axa/static/auth/**/**/*.js',
      'axa/static/auth/auth.run.js',
    ], { base: './' }))
    .pipe(concat('auth.js', { newLine: ';' }))
    .pipe(ngAnnotate({ add: true }))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(gulp.dest('axa/static/auth/'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('axa/static/auth/'));
}

function buildTemplate() {
  return gulp.src('axa/static/axa/pages/**/*.html')
    .pipe(templateCache({ standalone: true, root: 'static/axa/pages/' }))
    .pipe(gulp.dest('axa/static/axa/'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('axa/static/axa/'));
}

function buildAuthTemplate() {
  return gulp.src('axa/static/auth/**/*.html')
    .pipe(templateCache({ standalone: true, root: 'static/axa/auth/' }))
    .pipe(gulp.dest('axa/static/auth/'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('axa/static/auth/'));
}

function lintApp() {
  return gulp.src([
    'axa/static/axa/*.js',
    'axa/static/axa/**/*.js',
    'axa/static/axa/**/**/*.js',
    '!axa/static/axa/app.js',
    '!axa/static/axa/templates.js',
    '!axa/static/axa/*.min.js'
  ])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
}

function lintAuth() {
  return gulp.src([
    'axa/static/auth/*.js',
    'axa/static/auth/**/*.js',
    'axa/static/auth/**/**/*.js',
    '!axa/static/auth/auth.js',
    '!axa/static/auth/templates.js',
    '!axa/static/auth/*.min.js'
  ])
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
}

function reload(cb) {
  browserSync.reload();
  cb();
}

gulp.task('lint', gulp.parallel(lintApp, lintAuth));

gulp.task('build-app', gulp.series(lintApp, buildAppJS));

gulp.task('build-auth', gulp.series(lintAuth, buildAuthJS));

gulp.task('build-js', gulp.parallel('build-app'));


gulp.task('build-template', gulp.parallel(buildTemplate, buildAuthTemplate));

gulp.task('copy', function() {
  var bootstrap = gulp.src([
    'node_modules/bootstrap/dist/**/*',
    '!**/npm.js',
    '!**/bootstrap-theme.*',
    '!**/*.map'
  ])
    .pipe(gulp.dest('axa/static/vendor/bootstrap'));

  var fontawesome = gulp.src([
    'node_modules/@fortawesome/fontawesome-free/webfonts/**',
    '!node_modules/font-awesome/**/*.map',
    '!node_modules/font-awesome/less/',
    '!node_modules/font-awesome/scss/',
    '!node_modules/font-awesome/.npmignore',
    '!node_modules/font-awesome/*.txt',
    '!node_modules/font-awesome/*.md',
    '!node_modules/font-awesome/*.json'
  ])
    .pipe(gulp.dest('axa/static/assets/webfonts'));

  var angular = gulp.src([
    'node_modules/angular/angular.js',
    'node_modules/angular/angular.min.js',
    'node_modules/angular-ui-bootstrap/dist/*',
  ])
    .pipe(gulp.dest('axa/static/vendor/angular'));

  return merge(bootstrap, fontawesome, angular);
});


gulp.task('pluginsCSS', function() {
  var cssBundler = gulp.src([
    'node_modules/bootstrap/dist/css/bootstrap.min.css',
    'axa/static/assets/css/animate.css',
    'axa/static/assets/css/main.css',
    'axa/static/assets/css/ng-animate.css',
    'node_modules/ui-router-breadcrumbs/ui-router-breadcrumbs.min.css',
    'node_modules/angular-block-ui/dist/angular-block-ui.min.css',
    'node_modules/@fortawesome/fontawesome-free/css/all.css'
  ])
    .pipe(order([
      'node_modules/bootstrap/dist/css/bootstrap.min.css',
      'axa/static/assets/css/animate.css',
      'axa/static/assets/css/main.css',
      'axa/static/assets/css/ng-animate.css',
      'node_modules/ui-router-breadcrumbs/ui-router-breadcrumbs.min.css',
      'node_modules/angular-block-ui/dist/angular-block-ui.min.css',
      'node_modules/@fortawesome/fontawesome-free/css/all.css'
    ]))
    .pipe(concat('plugins.css'))
    .pipe(gulp.dest('axa/static/assets/css/'));

  return cssBundler;
});

gulp.task('pluginsJS', function() {
  var jsBundle = gulp.src([
    'node_modules/angular-sanitize/angular-sanitize.min.js',
    'node_modules/angular-filter/dist/angular-filter.min.js',
    'node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
    'node_modules/ui-router-breadcrumbs/ui-router-breadcrumbs.min.js',
    'node_modules/angular-block-ui/dist/angular-block-ui.min.js',
    'node_modules/ui-router-metatags/dist/ui-router-metatags.min.js',
    'node_modules/angular-animate/angular-animate.min.js',
    'node_modules/@fortawesome/fontawesome-free/js/all.min.js',
    'node_modules/ng-file-upload/dist/ng-file-upload.min.js'
  ])
    .pipe(order([
      'node_modules/angular-sanitize/angular-sanitize.min.js',
      'node_modules/angular-filter/dist/angular-filter.min.js',
      'node_modules/angular-animate/angular-animate.min.js',
      'node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
      'node_modules/ui-router-breadcrumbs/ui-router-breadcrumbs.min.js',
      'node_modules/angular-block-ui/dist/angular-block-ui.min.js',
      'node_modules/ui-router-metatags/dist/ui-router-metatags.min.js',
      'node_modules/@fortawesome/fontawesome-free/js/all.min.js',
      'node_modules/ng-file-upload/dist/ng-file-upload.min.js'
    ], { base: './' }))
    .pipe(concat('plugins.js', { newline: ';' }))
    .pipe(ngAnnotate({ add: true }))
    .pipe(gulp.dest('axa/static/assets/js/'))
    .pipe(uglify({ mangle: false }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('axa/static/assets/js/'));

  return merge(jsBundle);
});


// Default task
gulp.task('default', gulp.parallel('copy', 'pluginsCSS', 'pluginsJS', 'build-template', 'build-js'));

gulp.task('runserver', function() {
  var proc = exec('python application.py');
});

// Configure the browserSync task
gulp.task('browserSync', function() {
  browserSync.init({
    proxy: "localhost:5000"
  });
});

// Dev task with browserSync
gulp.task('dev', gulp.parallel('default', 'browserSync', function() {
  gulp.watch([
    'axa/static/axa/**/*.js',
    '!axa/static/**/*.min.js',
    '!axa/static/**/app.js',
    '!axa/static/**/auth.js',
    '!axa/static/**/templates.js'
  ],
    gulp.series(buildAppJS, reload));

  gulp.watch([
    'axa/static/auth/**/*.js',
    '!axa/static/**/*.min.js',
    '!axa/static/**/app.js',
    '!axa/static/**/auth.js',
    '!axa/static/**/templates.js'
  ],
    gulp.series(buildAuthJS, reload));

  gulp.watch([
    'axa/static/assets/css/animate.css',
    'axa/static/assets/css/main.css',
    'axa/static/assets/css/ng-animate.css'
  ],
    gulp.series('pluginsCSS'));
  // // Reloads the browser whenever HTML or JS files change
  gulp.watch(['axa/**/*.html'], gulp.series('build-template', reload));
}));
