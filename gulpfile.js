var gulp = require('gulp');
var header = require('gulp-header');
var nowTime = new Date().toUTCString();

var pkg = require('./package.json');
var banner = ['// bulid time at <%= time %>',
	  	      '// version : <%= version %>\n'].join('\n');

gulp.task('default',function(){
	gulp.src('./server/css/maxin/lessAnimate.less')
	  .pipe(header(banner, {time:nowTime,version:pkg.version}))
	  .pipe(gulp.dest('./build'));
	console.log('build lessAnimate has done!');  
});