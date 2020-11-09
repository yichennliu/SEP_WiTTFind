/**
 * @file Coordination of settings dialog
 * @author Stefan Schweter <stefan@schweter.it>, Matthias Lindinger
 */

/**
 * Helper function to convert a string of "true" or "false" to a _real_ Boolean
 * Boolean("false") is... a highlight
 * Then wrap our function into a lodash object
 * Now it can be used with _.toBool('string')
 */
_.mixin({'toBool': function(string) { return string == "true";  }  });

/**
 * Save settings to sesstion storage
 * @param session_storage_key The key for the session storage entry
 * @param value The corresponding value to be set
 */
function save_setting(session_storage_key, value)
{
  sessionStorage.setItem(session_storage_key, value);
}

/**
 * Displays session storage value for displaying facsimile in remarks
 */
function display_facsimile_remarks()
{
  $('#show_facsimile_remarks').prop('checked',  _.toBool(sessionStorage.getItem(c_show_facsimile_remarks_name)));
}

/**
 * Displays session storage value for displaying transcription in remarks
 */
function display_transcription_remarks()
{
  $('#show_transcription_remarks').prop('checked', _.toBool(sessionStorage.getItem(c_show_transcription_remarks_name)));
}

/**
 * Displays local storage value for items per page (steps) and the user
 * defined number of items (simply select that value in dropdown
 */
function display_items_per_page() {
  var d_items_per_page_steps = $("#items_per_page_steps");
  d_items_per_page_steps.empty();

  var d_steps = "";

  _.forEach(c_items_per_page_steps, function(value, index) {
    d_steps += "<option value=" + value + ">" + value + "</option>";
  });
  d_items_per_page_steps.append(d_steps);

  /** Now we can select the user defined number of items */
  $("#items_per_page_steps").val(sessionStorage.getItem(c_items_per_page_name));
}

/**
 *
 */

function display_zoom_factor(){
	var d_zoom_factor = $("#zoom_factor");
	d_zoom_factor.empty();

	var d_zoom_steps = "";

	_.forEach(c_zoom_steps, function(value, index) {
		d_zoom_steps += "<option value=" + value + ">" + value + "</option>";
	});
	d_zoom_factor.append(d_zoom_steps);

	/** Now we can select the user defined number of items */
	$("#zoom_factor").val(sessionStorage.getItem(c_zoom_factor_name));
}


/**
 * Show the language setting
 */
function show_lang_setting(){
    var d_lang_setting = $("#lang_setting");

    var d_lang_option = "";
    _.forEach(c_lang_option, function(value, index) {
        d_lang_option +="<option value=" + value +">" + value +"</option>";

    });

    d_lang_setting.append(d_lang_option);

   d_lang_setting.val(sessionStorage.getItem(c_lang_name));

}


/**
 * Shows an alert messages, when a value has been saved
 */
function show_success_alert()
{
  $("#settingsModal .modal-body").prepend("<div class='alert alert-success' role='alert'>Einstellungen wurden gespeichert! Aktualisieren Sie die Seite, um die Einstellungen zu aktivieren.</div>");
}

/**
 * Shows the settings dialog (*modal*)
 */
function show_settings_dialog()
{
  $('.graph').hide();
  $('.form-search').show();
  $(".settings").load("../settings.html", function()
  {
    $('#settingsModal').modal({show:true});
    display_facsimile_remarks();
    display_transcription_remarks();
    display_items_per_page();
    display_zoom_factor();
    show_lang_setting();

    $('#save_me').on('click', function(event) {
      save_setting(c_show_facsimile_remarks_name,
                   $('#show_facsimile_remarks').is(':checked'));

      save_setting(c_show_transcription_remarks_name,
                   $('#show_transcription_remarks').is(':checked'));

      save_setting(c_items_per_page_name,
                   _.toInteger($("#items_per_page_steps").val()));

      save_setting(c_zoom_factor_name, _.toInteger($("#zoom_factor").val()));

      save_setting(c_lang_name,$("#lang_setting").val());

      save_setting(c_sort_method,$("#sort_select").val());

	  show_success_alert();
      _.delay(function(){ $('#settingsModal').modal('hide'); }, 3000);
    });
  });
}
