module.exports = function(grunt) {

  

//Initiate grunt configuration items
grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	
    copy: {
        includeFiles:{
            files: [
                {expand: true, flatten: true, cwd: '', src: "/src/*.js", dest: 'dist'},
            ]
        },        
    },
    clean: {
        dist:{   //Fix to clean out node_modules from local repo
            src:[
                'dist'
               ]
        }
    },
    closureCompiler:  {
	  options: {
	    // [REQUIRED] Path to closure compiler
	    compilerFile: 'node_modules/google-closure-compiler/compiler.jar',

	    // [OPTIONAL] set to true if you want to check if files were modified
	    // before starting compilation (can save some time in large sourcebases)
	    checkModified: false,

	    // [OPTIONAL] Set Closure Compiler Directives here
	    compilerOpts: {
	        //compilation_level: 'ADVANCED_OPTIMIZATIONS',
			//externs: [],
			formatting:'pretty_print',
            warning_level: 'default'
	    },
	    // [OPTIONAL] Set exec method options
	    execOpts: {
	       /**
		* Set maxBuffer if you got message "Error: maxBuffer exceeded."
		* Node default: 200*1024
		*/
	       maxBuffer: 999999 * 1024
	    },
	    d32: false, // will use 'java -client -d32 -jar compiler.jar'
	    TieredCompilation: false// will use 'java -server -XX:+TieredCompilation -jar compiler.jar'
	  },

	  // any name that describes your task
	  targetName: {
	    // [OPTIONAL] Target files to compile. Can be a string, an array of strings
	    // or grunt file syntax (<config:...>, *)
	    src: "src/*.js",
                // [OPTIONAL] set an output file
	    dest: 'dist/<%= pkg.name%>.js'
	  }
    },
});

  
  grunt.loadNpmTasks('grunt-closure-tools');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  
  
  grunt.registerTask('buildPackage',function(){
      var pkg = grunt.config.data.pkg;
      var npmPackage = {
          version: pkg.version,
          name: pkg.name,
          private: "true",
          main: "./"+pkg.name + ".node.js",
          description:pkg.description,
          dependencies:pkg.dependencies,
          author: pkg.author
      };

      
      grunt.file.write('dist/package.json',JSON.stringify(npmPackage,undefined,2));
  });
  
  
  //Update npm modules and deploy relevant modules into app/components/
  //grunt.registerTask('update',['clean:npmSkylibsClean','npm-install','copy:componentDeploy']);
  
  grunt.registerTask('build',['closureCompiler','buildPackage']);
  
};
