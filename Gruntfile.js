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
                    bases : [ 'C:\\Users\\RCH11270\\IdeaProjects\\front-stack-demo\\initial-grunt-project\\application',
                     'C:\\Users\\RCH11270\\IdeaProjects\\front-stack-demo\\initial-grunt-project'],
                    port : 9000,
                    hostname : 'localhost',
                    livereload : false
                }
            }
        },

        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                hostname: "localhost",
                bases : [ 'C:\\Users\\RCH11270\\IdeaProjects\\front-stack-demo\\initial-grunt-project\\application',
                                    'C:\\Users\\RCH11270\\IdeaProjects\\front-stack-demo\\initial-grunt-project']
            },
//            proxies: {
//                context: "/Northwind",  // When the url contains this...
//                host: "services.odata.org", // Proxy to this host
//                changeOrigin: true
//            },
            livereload: {
                options: {
                    middleware: function(connect, options) {
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        // Setup the proxy
                        var middlewares = [require("grunt-connect-proxy/lib/utils").proxyRequest];

                        // Serve static files.
                        options.base.forEach(function(base) {
                            middlewares.push(connect.static(base));
                        });

                        return middlewares;
                    }
                }
            }
        },

        /*
         * Configure which file type have to be listened when it changes
         */
        watch: {
            livereload: {
              options: {
                livereload: false
              },
              files: [
                'application/{,*/}*.html',
                'img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                'css/{,*/}*.css'
              ]
            }
          }
    });

    /*
     * Register all the tasks defined above
     */
    grunt.registerTask('server', [ 'express', 'watch' ]);
};