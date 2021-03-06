// generated on 2017-07-06 using generator-webapp 3.0.1
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const del = require('del');
const wiredep = require('wiredep').stream;
const runSequence = require('run-sequence');
const mainBowerFiles = require('main-bower-files');
const ngAnnotate = require('gulp-ng-annotate');
const minifyHtml = require('gulp-minify-html');
const cachebust = require('gulp-cache-bust');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

let dev = true;

gulp.task('styles', () => {
    return gulp
        .src('app/styles/*.scss')
        .pipe($.plumber())
        .pipe($.if(dev, $.sourcemaps.init()))
        .pipe(
            $.sass
                .sync({
                    outputStyle: 'expanded',
                    precision: 10,
                    includePaths: ['.']
                })
                .on('error', $.sass.logError)
        )
        .pipe($.autoprefixer({ browsers: ['> 1%', 'last 2 versions', 'Firefox ESR'] }))
        .pipe($.if(dev, $.sourcemaps.write()))
        .pipe(gulp.dest('.tmp/styles'))
        .pipe(reload({ stream: true }));
});

/////////////////////////////////////////////////////////////////////////////////////
//
// fills in the Angular template cache, to prevent loading the html templates via
// separate http requests
//
/////////////////////////////////////////////////////////////////////////////////////

gulp.task('build-template-cache', [], function() {
    var concat = require('gulp-concat');

    return gulp
        .src(['app/**/*.html'])
        .pipe(
            minifyHtml({
                empty: true,
                spare: true,
                quotes: true
            })
        )
        .pipe(
            $.angularTemplatecache('templates.js', {
                module: 'main',
                // root: 'app/',
                standAlone: false
            })
        )
        .pipe(gulp.dest('.tmp/scripts'));
});

gulp.task('javascripts', () => {
    return (
        gulp
            .src(['app/scripts/**/*.js', 'app/components/**/*.js', 'app/routes/**/*.js'])
            .pipe($.plumber())
            .pipe($.if(dev, $.sourcemaps.init()))
            .pipe($.babel())
            // .pipe(ngAnnotate({
            //     add: true
            // }))
            .pipe($.if(dev, $.sourcemaps.write('.')))
            .pipe(gulp.dest('.tmp/scripts'))
            .pipe(reload({ stream: true }))
    );
});

gulp.task('scripts', ['javascripts', 'build-template-cache'], () => {
    var concat = require('gulp-concat');

    return gulp
        .src(['.tmp/scripts/app.js', '.tmp/scripts/templates.js'])
        .pipe(concat('app.js'))
        .pipe(gulp.dest('.tmp/scripts'));
});

function lint(files) {
    return gulp
        .src(files)
        .pipe($.eslint({ fix: true }))
        .pipe(reload({ stream: true, once: true }))
        .pipe($.eslint.format())
        .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
    return lint('app/scripts/**/*.js').pipe(gulp.dest('app/scripts'));
});
gulp.task('lint:test', () => {
    return lint('test/spec/**/*.js').pipe(gulp.dest('test/spec'));
});

gulp.task('html', ['styles', 'scripts'], () => {
    return gulp
        .src('app/*.html')
        .pipe($.useref({ searchPath: ['.tmp', 'app', '.'] }))
        .pipe(
            $.if(
                /\.js$/,
                ngAnnotate({
                    add: true
                })
            )
        )
        .pipe(
            $.if(
                /\.js$/,
                $.terser().on('error', function(e) {
                    console.log(e);
                })
            )
        )
        .pipe($.if(/\.css$/, $.cssnano({ safe: true, autoprefixer: false })))
        .pipe(
            $.if(
                /\.html$/,
                $.htmlmin({
                    collapseWhitespace: true,
                    minifyCSS: true,
                    minifyJS: { compress: { drop_console: true } },
                    processConditionalComments: true,
                    removeComments: true,
                    removeEmptyAttributes: true,
                    removeScriptTypeAttributes: true,
                    removeStyleLinkTypeAttributes: true
                })
            )
        )
        .pipe(
            cachebust({
                type: 'timestamp'
            })
        )
        .pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
    return gulp
        .src('app/images/**/*')
        .pipe($.cache($.imagemin()))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
    return gulp
        .src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function(err) {}).concat('app/fonts/**/*'))
        .pipe($.if(dev, gulp.dest('.tmp/fonts'), gulp.dest('dist/fonts')));
});

gulp.task('extras', () => {
    return gulp
        .src(['app/*', '!app/*.html', '!app/components', '!app/routes'], {
            dot: true
        })
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', () => {
    runSequence(['clean', 'wiredep'], ['styles', 'javascripts', 'fonts'], () => {
        browserSync.init({
            notify: false,
            port: 5000,
            ghostMode: false,
            server: {
                baseDir: ['.tmp', 'app'],
                routes: {
                    '/bower_components': 'bower_components'
                }
            }
        });

        gulp.watch(['app/*.html', 'app/images/**/*', '.tmp/fonts/**/*', 'app/components/**/*', 'app/routes/**/*']).on('change', reload);

        gulp.watch('app/styles/**/*.scss', ['styles']);
        gulp.watch('app/styles/**/*.sass', ['styles']);
        gulp.watch('app/scripts/**/*.js', ['javascripts']);
        gulp.watch('app/fonts/**/*', ['fonts']);
        gulp.watch('bower.json', ['wiredep', 'fonts']);
    });
});

gulp.task('serve:dist', ['default'], () => {
    browserSync.init({
        notify: false,
        port: 5000,
        server: {
            baseDir: ['dist']
        }
    });
});

gulp.task('serve:test', ['scripts'], () => {
    browserSync.init({
        notify: false,
        port: 5000,
        ui: false,
        server: {
            baseDir: 'test',
            routes: {
                '/scripts': '.tmp/scripts',
                '/bower_components': 'bower_components'
            }
        }
    });

    gulp.watch('app/scripts/**/*.js', ['scripts']);
    gulp.watch(['test/spec/**/*.js', 'test/index.html']).on('change', reload);
    gulp.watch('test/spec/**/*.js', ['lint:test']);
});

// inject bower components
gulp.task('wiredep', () => {
    gulp.src('app/styles/*.scss')
        .pipe($.filter(file => file.stat && file.stat.size))
        .pipe(
            wiredep({
                ignorePath: /^(\.\.\/)+/
            })
        )
        .pipe(gulp.dest('app/styles'));

    gulp.src('app/*.html')
        .pipe(
            wiredep({
                exclude: ['bootstrap-sass', 'oidc-client'],
                ignorePath: /^(\.\.\/)*\.\./
            })
        )
        .pipe(gulp.dest('app'));
});

gulp.task('reports', () => {
    return gulp.src('app/reports/**/*.*').pipe(gulp.dest('dist/reports'));
});

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras', 'reports'], () => {
    return gulp.src('dist/**/*').pipe($.size({ title: 'build', gzip: true }));
});

gulp.task('default', () => {
    return new Promise(resolve => {
        dev = false;
        runSequence(['clean', 'wiredep'], 'build', resolve);
    });
});

gulp.task('getBowerFiles', function() {
    return gulp.src(mainBowerFiles(), { base: 'bower_components' }).pipe(gulp.dest('lib/'));
});
