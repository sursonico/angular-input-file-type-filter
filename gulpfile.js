/*
 gulpfile.js
 ===========
 Rather than manage one giant configuration file responsible
 for creating multiple tasks, each task has been broken out into
 its own file in gulp/tasks. Any files in that directory get
 automatically required below.
 To add a new task, simply add a new task file that directory.
 gulp/tasks/default.js specifies the default set of tasks to run
 when you run `gulp`.
 */

var gulp = require("gulp");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var annotate = require("gulp-ng-annotate");

gulp.task("build",[ ], function() {

    return gulp.src(["src/**/*.js"])            // Read the files
        .pipe(concat("angular-input-file-type-filter.js"))              // Combine into 1 file
        .pipe(gulp.dest("dist"))
        .pipe(annotate())
        .pipe(uglify())                         // Minify
        .pipe(rename({extname: ".min.js"}))     // Rename to ng-quick-date.min.js
        .pipe(gulp.dest("dist"))
});
