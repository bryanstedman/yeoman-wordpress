/**
 *	Build task for yeoman-wordpress
 *
 *	Inspired by https://github.com/retlehs/roots/tree/grunt
 *
 *	Work in progress, does not work for now!
 */

var fs = require('fs'),
	path = require('path'),
	crypto = require('crypto');

module.exports = function(grunt) {

	// the file where the script / stylesheet are called can be named differently => use a config var in Gruntfile?
	var scriptsPhp = 'app/wp-content/themes/<%= themeName %>/functions.php';

	// Parse the theme directories to get every *.css and *.js files to apply
	// the following process to each files:
	// - hash the file
	// - perform the replace function for each one

    // Hash the CSS
    var hashCss = grunt.helper('md5', 'app/wp-content/themes/<%= themeName %>/style.css');

    // Hash the JS
    var hashJs = grunt.helper('md5', 'app/wp-content/themes/<%= themeName %>/js/small-menu.js');

	// Update scripts.php to reference the new versions
    var regexCss = /(wp_enqueue_style\('roots_main',(\s*[^,]+,){2})\s*[^\)]+\);/;
    var regexJs = /(wp_register_script\('small-menu',(\s*[^,]+,){2})\s*[^,]+,\s*([^\)]+)\);/;

    var content = grunt.file.read(scriptsPhp);
    content = content.replace(regexCss, "\$1 '" + hashCss + "');");
    content = content.replace(regexJs, "\$1 '" + hashJs + "', " + "\$3);");
    fs.writeFile(scriptsPhp, content, function() {
    	console.log('"' + scriptsPhp + '" updated with new CSS/JS versions.');
    	console.log('');
    });
}