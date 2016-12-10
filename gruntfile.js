module.exports = function(grunt) {
	
require('google-closure-compiler').grunt(grunt);

//Initiate grunt configuration items
grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
	
    copy: {
        includeFiles:{
            files: [
                {expand: true, flatten: true, cwd: '', src: "/src/*.js", dest: 'build'},
            ]
        },        
    },
    clean: {
        build:{   //Fix to clean out node_modules from local repo
            src:[
                'build'
               ]
        }
    },
    "closure-compiler": {
		my_target: {
		  files: {
			'build/selection-controls.js': ['src/*.js']
		  },
		  options: {
			compilation_level: 'SIMPLE',
			language_in: 'ECMASCRIPT5_STRICT',
			//create_source_map: 'build/selection-controls.js.map',
			//output_wrapper: '(function(){\n%output%\n}).call(this)\n//# sourceMappingURL=selection-controls.js.map'
		  }
		}
	}
});

  
 
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  
  
  grunt.registerTask('buildPackage',function(){
      var pkg = grunt.config.data.pkg;
      var npmPackage = {
          version: pkg.version,
          name: pkg.name,
          //private: "true",
          main: "./"+pkg.name + ".js",
          description:pkg.description,
          dependencies:pkg.dependencies,
          author: pkg.author
      };

      
      grunt.file.write('build/package.json',JSON.stringify(npmPackage,undefined,2));
  });
  
  
  //Update npm modules and deploy relevant modules into app/components/
 
  grunt.registerTask('build',['closure-compiler','buildPackage']);
  
};
