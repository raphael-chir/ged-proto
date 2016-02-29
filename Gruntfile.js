/**
 * GRUNT module for easy live coding :
 * - define a simple HTTP server
 * - listen to any modifications
 * - automatically reload navigator
 */
module.exports = function(grunt) {
    /*
     *  Load Grunt tasks declared in the package.json file
     */
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    /*
     *  Configure Grunt
     */
    grunt.initConfig({
        /*
         * HTTP server definition
         */
        express : {
            all : {
                options : {
                    bases : [ 'application', 'data'],
                    port : 9000,
                    hostname : 'localhost'
                }
            }
        },
        /*
         * Configure which file type have to be listened when it changes
         */
        watch: {
            options: {
               livereload: true
            },
            livereload: {
              files: [
                '{,*/}*.js',
                '{,*/}*.html',
                'images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                'css/{,*/}*.css',
                'mocks/{,*/}*.json'
              ]
            }
          }
    });
    /*
     * Register all the tasks defined above
     */
    grunt.registerTask('server', [ 'express', 'watch' ]);
};