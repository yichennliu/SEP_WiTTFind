/**
 * @file Using require.js in order to maintain all javascript dependencies
 * @author Stefan Schweter <stefan@schweter.it>
 * 
 * 
 */

requirejs.config({
  baseUrl: 'components',
  paths: {
    "jquery"               : "jquery/dist/jquery.min",
    "jquery-ui"            : "jquery-ui-dist/jquery-ui.min",
    "lodash"               : "lodash/lodash.min",
    "angularjs"            : "angular/angular.min",
    "bootstrap"            : "bootstrap/dist/js/bootstrap.bundle.min",
    "imagemap-resizer"     : "image-map-resizer/js/imageMapResizer.min",
    "raphael"              : "raphael/raphael.min",
    "unveil"               : "jquery-unveil/jquery.unveil",
    "bowser"               : "bowser/src/bowser",
    "wordcloud"            : "wordcloud/src/wordcloud2",
    "d3"                   : "d3/d3.min",
    "c3"                   : "c3/c3.min",
    "markdown"             : "markdown/lib/markdown",
    "pubsub"               : "pubsub.js/pubsub",
    "popper"               : "popper.js/dist/umd/popper.min",
    "diff"                 : "diff/dist/diff.min", 	
    "router"               : "../include/router",
    "config"               : "../include/config",
    "autosuggestions"      : "../include/autosuggestions",
    "settings"             : "../include/settings",
    "tutorial"             : "../include/tutorial",
    "translator"           : "../include/translator",
    "help"                 : "../include/help",
    "graph"                : "../include/graph",
    "feedback"             : "../include/feedback",
    "loading-animation"    : "../include/loading-animation",
    "semantics"            : "../include/semantics",
    "search"               : "../include/search",
    "similarity"           : "../include/similarity",
	"wf_hits_display"      : "../include/wf_hits_display",
    "word-cloud"           : "../include/word-cloud",
    "changelog"            : "../include/changelog",
    "translate_web_language" : "../include/translate_web_language",
    "magnifierGlass"	     : "../include/magnifierGlass",
    "date-display"         : "../include/date-display",
    "facsimile-description": "../include/facsimile-description"
  },
  /**
   * to get functions and variables from a module (=javascript File)
   * known in a different module, the module, which defines the
   * functions and variables must be listed in the
   * dependency list of the module:
   * for example (see below)
   *    bootstrap depends on functions and variables from
   *              jquery and popper
   */ 
  shim: {
    "bootstrap": {
      deps: ["jquery", "popper"]
    },
    "jquery-ui": {
      deps: ["jquery"]
    },
    "imagemap-resizer": {
      deps: ["jquery"]
    },
    "raphael": {
      deps: ["jquery"]
    },
    "unveil": {
      deps: ["jquery"]
    },
    'd3': {
      exports: 'd3'
    },
    "c3": {
      deps: ['d3'],
      exports: 'c3'
    },
    "router": {
      deps: ["jquery", "bowser", "semantics", "similarity", "translator", "graph", "help",
             "tutorial", "search", "config"]
    },
    "config": {
      deps: ["jquery", "lodash"]
    },
    "autosuggestions": {
      deps: ["jquery-ui", "word-cloud"]
    },
    "tutorial": {
      deps: ["bootstrap", "lodash"]
    },
    "translator": {
      deps: ["bootstrap", "lodash"]
    },
    "settings": {
      deps: ["bootstrap", "lodash", "config", "magnifierGlass"]
    },
    "help": {
      deps: ["bootstrap", "jquery", "angularjs"]
    },
    "graph": {
      deps: ["jquery", "lodash", "raphael"]
    },
    "feedback": {
      deps: ["bootstrap", "jquery", "lodash"]
    },
    "semantics": {
      deps: ["bootstrap", "jquery", "lodash"]
    },
    "search": {
      deps: ["jquery-ui", "bootstrap", "lodash", "imagemap-resizer",
             "config", "unveil", "c3", "magnifierGlass", "date-display", "facsimile-description", "wf_hits_display"]
    },
    "similarity": {
      deps: ["bootstrap", "jquery", "lodash"]
    },
    "word-cloud": {
      deps: ["jquery", "lodash", "wordcloud"]
    },
    "changelog": {
      deps: ["jquery", "markdown"]
    },
    "magnifierGlass":{
		deps: ["config"]
	  },
     "translate_web_language":{
        deps: ["jquery","config"]
     },
      "date-display":{
      deps: ["jquery", "jquery-ui"/*"jquery-slider"*/]
    },
    "facsimile-description": {
      deps: ["jquery", "lodash"]
    }
  }
});

requirejs([
  "jquery", "jquery-ui", "diff", "lodash", "popper", "angularjs", "bootstrap",
  "imagemap-resizer", "c3",
  "raphael", "unveil", "bowser", "markdown",
  "router", "config", "autosuggestions", "settings","loading-animation",
  "tutorial", "translator", "help", "graph", "feedback", "semantics","similarity",
  "search", "word-cloud", "changelog", "magnifierGlass", "translate_web_language", "date-display"
], function(){
  document.title += ' - ' + new Date().getFullYear();
  var qr_url = 'http://' + c_quadroreader["host"] + ":" + c_quadroreader["port"];
  var or_url = 'http://' + c_odysseereader["host"] + ":" + c_odysseereader["port"];
  $('#nav_reader > a').attr('href', qr_url);
  $('#nav_odysseereader > a').attr('href', or_url);
});



/* Workaround shitty require.js support; https://github.com/c3js/c3/issues/83 */
require(['c3', 'pubsub','diff'], function (c3, pubsub, JsDiff) {
  window.c3 = c3;
  window.pubsub = pubsub;
  window.JsDiff = JsDiff;
});
