/* Variables Definition */
var gulp = require("gulp");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");

/* Tasks */
gulp.task("welcome-message", async function() {
	return console.log("Welcome to Gulp");
});

gulp.task("copy-css-files", function() {
	return gulp.src("src/css/*.css").pipe(gulp.dest("dist/css"));
});

gulp.task("compile-sass", function() {
	return gulp
		.src("src/sass/*.scss")
		.pipe(sass())
		.pipe(gulp.dest("dist/css"));
});

gulp.task("copy-js-files", function() {
	return gulp.src("src/css/*.css").pipe(gulp.dest("dist/css"));
});

gulp.task("minify-js", function() {
	return gulp
		.src("src/js/*.js")
		.pipe(uglify())
		.pipe(gulp.dest("dist/js"));
});

gulp.task("concat-js", function() {
	return gulp
		.src("src/js/*.js")
		.pipe(concat("script.js"))
		.pipe(uglify())
		.pipe(gulp.dest("dist/js"));
});

gulp.task("watch", function() {
	gulp.watch("src/js/*.js", ["concat-js"]);
	gulp.watch("src/sass/*.scss", ["sass"]);
});

gulp.task("default", gulp.parallel("welcome-message", "watch"));
