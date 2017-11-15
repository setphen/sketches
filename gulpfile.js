var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var assign = require('lodash.assign');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', ['build'], function () {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    })
});

//SCRIPTS (Vendor JS)
var vendors = {
    build: function () {
        return gulp.src('app/scripts/vendor/*.js')
            // optional, remove if you don't need to buffer file contents
            //.pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
            // Add transformation tasks to the pipeline here.
            //.pipe($.uglify())
            .pipe(sourcemaps.write('./')) // writes .map file
            .pipe(gulp.dest('./dist/scripts/vendor'))
    },
    reload: function () {
        return vendors.build()
            .pipe(browserSync.stream());
    },
    watch: function () {
        return gulp.watch('app/scripts/vendor/*.js', ['reload-vendors']);
    }
}

gulp.task('build-vendors', ['clean'], vendors.build);
gulp.task('watch-vendors', ['browser-sync'], vendors.watch);
gulp.task('reload-vendors', vendors.reload);

//SCRIPTS (JS)
var scripts = {
    build: function () {
        //return scripts.b.bundle()
        return gulp.src('app/scripts/*.js')
            //.pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
            // Add transformation tasks to the pipeline here.
            //.pipe($.uglify())
            .pipe(sourcemaps.write('./')) // writes .map file
            .pipe(gulp.dest('./dist/scripts/'))
    },
    reload: function () {
        return scripts.build()
            .pipe(browserSync.stream());
    },
    watch: function () {
        return gulp.watch('app/scripts/*.js', ['reload-scripts']);
    }
}

gulp.task('build-scripts', ['clean'], scripts.build);
gulp.task('watch-scripts', ['browser-sync'], scripts.watch);
gulp.task('reload-scripts', scripts.reload);

//SKETCHES (JS)
var sketches = {
    build: function () {
        //return scripts.b.bundle()
        return gulp.src(['app/scripts/partials/header.js', 'app/scripts/sketches/*.js', 'app/scripts/partials/footer.js'])
            //.pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
            // Add transformation tasks to the pipeline here.
            //.pipe($.uglify())
            .pipe($.concat('sketches.js'))
            .pipe(sourcemaps.write('./')) // writes .map file
            .pipe(gulp.dest('./dist/scripts/'))
    },
    reload: function () {
        return sketches.build()
            .pipe(browserSync.stream());
    },
    watch: function () {
        return gulp.watch('app/scripts/sketches/*.js', ['reload-sketches']);
    }
}

gulp.task('build-sketches', ['clean'], sketches.build);
gulp.task('watch-sketches', ['browser-sync'], sketches.watch);
gulp.task('reload-sketches', sketches.reload);


//PAGES (HTML)
var pages ={
    build: function () {
        return gulp.src('app/**/*.html')
            // Output files
            .pipe($.if('*.html', $.size({title: 'html', showFiles: true})))
            .pipe(gulp.dest('dist'))
    },
    reload: function () {
        return pages.build()
            .pipe(browserSync.stream());
    },
    watch: function () {
        return gulp.watch('app/**/*.html', ['reload-pages']);
    },
}

gulp.task('build-pages', ['clean'], pages.build);
gulp.task('watch-pages', ['browser-sync'], pages.watch);
gulp.task('reload-pages', pages.reload);


// STYLES
var styles ={
    build: function () {
        return gulp.src([
            'app/styles/**/*.scss',
            'app/styles/**/*.css'
            ])
            .pipe($.sourcemaps.init())
            .pipe($.sass({
            precision: 10
            }).on('error', $.sass.logError))
            .pipe($.if('*.css', $.cleanCss()))
            .pipe($.size({title: 'styles'}))
            .pipe($.sourcemaps.write('./'))
            .pipe(gulp.dest('dist/styles'))
    },
    reload: function () {
        return styles.build()
            .pipe(browserSync.stream());
    },
    watch: function () {
        return gulp.watch(['app/**/*.css', 'app/**/*.scss'], ['reload-styles']);
    },
}

gulp.task('build-styles', ['clean'], styles.build);
gulp.task('watch-styles', ['browser-sync'], styles.watch);
gulp.task('reload-styles', styles.reload);


//ASSETS (JSON, IMAGES, ETC)
var assets = {
  build: function () {
    $.util.log($.util.colors.yellow('[❗] Building Assets...'));
    return gulp.src('./app/assets/**/*')
      .pipe(gulp.dest('./dist/assets'))
      .on('end', function () {
        $.util.log($.util.colors.green('[✔] Finished Assets'));
      });
  },
  reload: function () {
    return assets.build()
      .pipe(browserSync.stream())
  },
  watch: function () {
    return gulp.watch('app/assets/**/*', ['reload-assets']);
    //   .on('change', function (event) {
    //     if(event.type === 'deleted') {
    //       del(path.relative('./', event.path).replace('app/assets/','dist/assets/'));
    //       assets.reload();
    //     }
    //   })
    //   ;
  }
};

gulp.task('build-assets', ['clean'], assets.build);
gulp.task('watch-assets', ['browser-sync'], assets.watch);
gulp.task('reload-assets', assets.reload);

//deletes contents of dist
gulp.task('clean', () =>
    del(['.tmp', 'dist/*', '!dist/.git'], {dot: true})
);

gulp.task('build', [
  'build-pages',
  'build-styles',
  'build-vendors',
  'build-scripts',
  'build-sketches',
  'build-assets'
]);

gulp.task('watch', [
  'watch-pages',
  'watch-styles',
  'watch-vendors',
  'watch-scripts',
  'watch-sketches',
  'watch-assets'
]);

gulp.task('default', () => {

});
