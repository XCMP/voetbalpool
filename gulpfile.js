
// USED MODULES
var gulp       = require('gulp'),
    gulpif     = require('gulp-if'),
    concat     = require('gulp-concat'),
    replace    = require('gulp-replace'),
    uglify     = require('gulp-uglify'),
    minifiycss = require('gulp-clean-css'),
    handlebars = require('gulp-handlebars'),
    livereload = require('gulp-livereload'),
    shell      = require('gulp-shell'),
    zip        = require('gulp-zip'),
    del        = require('del');

// CONSTANTS
var paths = {
  scripts: {
    config: [
      'src/config/config.js'
    ],
    libs: [
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/underscore/underscore.js',
      'node_modules/backbone/backbone.js',
      'node_modules/handlebars/dist/handlebars.runtime.js',
      'node_modules/moment/moment.js',
      'node_modules/chart.js/Chart.min.js'
    ],
    app: [
      'src/app/voetbalpool-app.js',

      'src/app/common/config.js',
      'src/app/common/utils.js',
      'src/app/common/helpers.js',

      'src/app/models/poolplayer.js',
      'src/app/models/club.js',
      'src/app/models/game.js',
      'src/app/models/prediction.js',
      'src/app/models/month.js',

      'src/app/collections/score.js',
      'src/app/collections/poolplayers.js',
      'src/app/collections/games.js',
      'src/app/collections/clubs.js',
      'src/app/collections/predictions.js',
      'src/app/collections/months.js',

      'src/app/views/common/about.js',
      'src/app/views/common/menu.js',
      'src/app/views/common/modal_window.js',

      'src/app/views/score/score_view.js',

      'src/app/views/poolplayers/poolplayers_view.js',
      'src/app/views/poolplayers/add_update_poolplayer_view.js',
      'src/app/views/poolplayers/poolplayer_select_view.js',

      'src/app/views/games/games_view.js',
      'src/app/views/games/add_update_game_view.js',
      'src/app/views/games/game_select_view.js',

      'src/app/views/predictions/predictions_view.js',
      'src/app/views/predictions/add_update_prediction_view.js',

      'src/app/views/clubs/clubsoverview_view.js',
      'src/app/views/clubs/add_update_club_view.js',
      'src/app/views/clubs/clubs_view.js',
      'src/app/views/clubs/club_select_view.js',

      'src/app/router/router.js'
    ]
  },
  styles: 'src/css/*.css',
  templatesWatch: 'src/hbs/**/*.hbs',
  templates: [ '',
    'partials/month_select.hbs',

    'common/about.hbs',
    'common/menu.hbs',
    'common/modal_window.hbs',

    'score/score.hbs',
    'score/score_legend.hbs',
    'score/no_results.hbs',

    'games/add_update_game.hbs',
    'games/game_delete.hbs',
    'games/games.hbs',
    'games/game_select.hbs',

    'poolplayers/add_update_poolplayer.hbs',
    'poolplayers/poolplayer_delete.hbs',
    'poolplayers/poolplayers.hbs',
    'poolplayers/poolplayer_select.hbs',

    'predictions/add_update_prediction.hbs',
    'predictions/predictions.hbs',
    'predictions/prediction_delete.hbs',

    'clubs/add_update_club.hbs',
    'clubs/upload_club_logo.hbs',
    'clubs/club_delete.hbs',
    'clubs/club_select.hbs',
    'clubs/clubs.hbs',
    'clubs/clubsoverview.hbs'
  ],
  images: 'src/images/**/*.*'
};

// CHECK BUILDING ENVIRONMENT [production or development]
var production = false;
process.argv.forEach(function (param, index, array) {
  if (param === '--env') {
    production = array[index + 1] === 'production';
  }
});

// CONFIG TASK
gulp.task('config', function() {
  var backend_endpoint = (production? 'http://voetbalpoolbackend-xcmp.rhcloud.com' : 'http://localhost:3001');
  console.log(`Setting backend endpoint to ${backend_endpoint}`);
  gulp.src(['src/config/config.js'])
    .pipe(replace('${BACKEND_ENDPOINT}', backend_endpoint))
    .pipe(gulp.dest('src/app/common'));
});

// BUILD TASKS
gulp.task('clean', function() {
  del(['dist']);
});

gulp.task('base', function() {
  return gulp.src('index.html')
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

gulp.task('scripts-libs', function() {
  return gulp.src(paths.scripts.libs)
    .pipe(uglify())
    .pipe(concat('libs.min.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('scripts-app', function() {
  return gulp.src(paths.scripts.app)
    .pipe(gulpif(production,  uglify()))
    .pipe(concat('voetbalpool-app.min.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload());
});

gulp.task('styles', function() {
  return gulp.src(paths.styles)
    .pipe(concat('voetbalpool-app.css'))
    .pipe(gulpif(production,minifiycss()))
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload());
});

gulp.task('images', function() {
  return gulp.src(paths.images)
    .pipe(gulp.dest('dist/images'))
    .pipe(livereload());
});

gulp.task('templates', function() {
  /* use shell to compile, so we can use latest version of Handlebars */
  return gulp.src('')
    .pipe(shell([
      'rm -rf dist/js/templates',
      'mkdir -p dist/js/templates',
      'handlebars ' + paths.templates.join(' src/hbs/') + ' -f dist/js/templates/hbs-templates.js'
    ]))
    .pipe(livereload());
});

gulp.task('build', ['clean', 'base', 'scripts-libs', 'scripts-app', 'styles', 'images', 'templates'], function() {
  console.log('Build done.')
});

gulp.task('watch', ['build'], function() {
  livereload.listen();
  gulp.watch(paths.scripts.lib, ['scripts-libs']);
  gulp.watch(paths.scripts.app, ['scripts-app']);
  gulp.watch(paths.scripts.config, ['build']);
  gulp.watch(['index.html'], ['base']);
  gulp.watch(paths.styles, ['styles']);
  gulp.watch(paths.templatesWatch, ['templates']);
  gulp.watch(paths.images, ['images']);
});

// DEFAULT TASK
gulp.task('default', ['watch'], function(){
  console.log('Watching...');
});


