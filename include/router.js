/**
 * @file Coordination of wittfind search routes
 * @author Stefan Schweter <stefan@schweter.it>
 */

$(function(){
  var router = $(location).attr('href');

  if (router.match(/\/(index\.html)?$/)) {
    /* Displays a warning, when using the Micro$oft Internet Explorer or Edge */
    require(['bowser'],function(bowser){
      if (bowser.msie || bowser.msedge) {
        alert('Der Internet Explorer unterstützt erst ab Version 11 die ' +
              'meisten Funktionen unserer FinderApp. Zur Nutzung der ' +
              'gesamten Funktionalität, verwenden Sie besser einen anderen ' +
              'Browser wie z.B. den Mozilla Firefox.');
      }
    });

    $('#nav_index').attr('class', 'active');
  }

  if (router.match(/\?semantics/)) {
    $('#nav_semantics').attr('class', 'active');
    show_semantics_page();
  }

  if (router.match(/\?similarity/)) {
    $('#nav_similarity').attr('class', 'active');
    show_similarity_page();
  }

    if (router.match(/\?pattern/)) {
    $('#nav_index').attr('class', 'active');

    /** We assume something like http://localhost/?pattern=Krokodil here */
    var query  = (window.location.search).substring(1);
	var all_params = {};
	var params = query.split('&');
	
	for (var i=0; i < params.length; i++){
		var param = params[i];
        console.log("routes.js: param ", param);
		var parts = param.split('=');
		all_params[parts[0]]=parts[1];
	}
    console.log("routes.js: all_params ", all_params);
	/**
     * Notice: The query "ob das Krokodil" will be encoded to:
     * http://localhost/?pattern=ob+das+Krokodil
     * So we need to replace the "+" sign with %20
     *
     * But: The query "( ([ADJA] | [ADJD] )| [NN]) & <+COL>"
     * will be encoded to:
     * http://localhost/?pattern=%28+%28[ADJA]+|+[ADJD]+%29|+[NN]%29+%26+%3C%2BCOL%3E
     * As you can see the "real" "+" sign gets encoded to %2B and all other
     * "+" signes should be translates to %20
     *
     * This is necessary to get the parsing done
     */
	var param = all_params['pattern'];
	var search_pattern = decodeURIComponent(param.replace(/\+/g, '%20'));
    console.log("search_pattern",search_pattern);
    /** Perform a new search for search_pattern */
	all_params['pattern'] = search_pattern;

	wittfind_search(all_params);

///	wittfind_search(search_pattern, type);

    /** Don't throw search pattern away */
    $('#typeahead').val(search_pattern);
  }

  if (router.match(/\?translator/)) {
    $('#nav_code').attr('class', 'active');
    show_translator_page();
  }

  if (router.match(/\?graph/)) {
    $('#nav_graph').attr('class', 'active');
  }

  if (router.match(/\?help/)) {
    show_help_page();
  }

  if (router.match(/\?tutorial/)) {
    show_tutorial_page();
  }

  if (router.match(/\?feedback/)) {
    show_feedback_app();
  }

  if (router.match(/\?changelog/)) {
    show_changelog_page();
  }
});
