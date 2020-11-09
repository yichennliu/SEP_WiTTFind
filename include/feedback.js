/**
 * @file Coordination of feedback application
 * @author Stefan Schweter <stefan@schweter.it>
 * @brief This feedback application is heavily inspired by the awesome work of
 *        @bruder's original node.js based Feedback App and uses the same data
 *        structures.
 */

/** All components, component parts and its maintainer are stored inside */
var components = [];

/** All maintainers and their GitLab assignee_ids are stored inside */
var maintainers = [];

/**
 * Sends a new issue to the GitLab instance
 * @param title The corresponding title for an issue
 * @param description The corresponding description for an issue
 * @param assignee_id The corresponding assignee_id for an issue
 * @param labels The corresponding labels for an issue (needs to be a string,
 *               not an array (use join() method for creating a perfect string)
 */
function post_issue(title, description, assignee_id, labels, project_id)
{
  /** Optional parameters - for more information see:
   * https://github.com/gitlabhq/gitlabhq/blob/b72531820ddf462b87c12ca1cfd3359326b0291f/doc/api/issues.md#new-issue
   * description (optional) - The description of an issue
   * assignee_id (optional) - The ID of a user to assign issue
   * milestone_id (optional) - The ID of a milestone to assign issue
   * labels (optional) - Comma-separated label names for an issue
   */
  $.post("https://gitlab.cis.uni-muenchen.de/api/v4/projects/" + project_id + "/issues", {
    private_token: atob("UHpEb0dmeG02ZGRkeTlNUE11VGs="),
    id: project_id,
    title: title,
    description: description,
    assignee_id: assignee_id,
    labels: labels
  }).done(function() {
    $('#header-feedback').append("<div class='alert alert-success' role='alert'>Feedback was successfully sent!</div>");
    clear_forms();
  }).fail(function() {
    $('#header-feedback').append("<div class='alert alert-danger' role='alert'>Feedback was NOT successfully sent. An error occured :(</div>");
  });
}

/**
 * Inits the maintainer database (user ids were fetched from GitLab)
 */

function init_maintainers()
{
  maintainers = {
    schweter  : 4 ,
    lindinger : 18,
    max       : 24,
    finkf     : 35,
    alois     : 65,
    still     : 121,
    babl      : 155,
    bruder    : 123,
    sabine    : 109,
    ines      : 140
  };
}


function init_components() {
  components = [{
    name: 'Feedback App',
    maintainer: maintainers['max'],
    label: "feedback",
    part: ['Other', 'Feature Request',
      'Documentation improvement', 'Component Missing',
      'Problem Description Missing', 'Usability flaw',
      'Speed issues'
    ]
  }, {
    name: 'Transcription',
    maintainer: maintainers['alois'],
    label: "transcription",
    part: [
      'Other',
      'Feature Request',
      'Transcription Error'
    ]
  }, {
    name: 'wf',
    maintainer: maintainers['finkf'],
    label: "wf",
    part: [
      'Other',
      'Feature Request',
      'Word not found error',
      'Usability flaw',
      'Speed issues',
    ]
  }, {
    name: 'wittfind-web',
    maintainer: maintainers['still'],
    label: "wittfind-web",
    part: [
      'Error',
      'Other',
      'Feature Request',
      'Usability flaw',
    ]
  }, {
    name: 'witt-data',
    maintainer: maintainers['max'],
    label: "witt-data",
    part: [
      'Error',
      'Other',
      'Feature Request',
    ]
  }, {
    name: 'SIS',
    maintainer: maintainers['bruder'],
    label: "sis",
    part: [
      'Other',
      'Feature Request',
      'Documentation improvement',
      'Word not found error',
      'Usability flaw',
      'Speed issues',
      'Browser compatibility issues',
      'Praise',
    ]
  },  {
    name: 'Odysseereader',
    maintainer: maintainers['still'],
    label: "od-reader",
    part: [
      'Other',
      'Feature Request',
      'Documentation improvement',
      'Browser compatibility issues',
      'Praise',
    ]
  },
  {
    name: 'Helppage',
    maintainer: maintainers['max'],
    label: "wittfind-web:help",
    part: [
      'Other',
      'Feature Request',
      'Documentation improvement',
    ]
  }, {
    name: 'Quadroreader',
    maintainer: maintainers['lindinger'],
    label: "quadroreader",
    part: [
      'Error',
      'Other',
      'Feature Request',
      'Documentation improvement',
      'Usability issue'
    ]
  }, {
    name: 'Faksimile',
    maintainer: maintainers['max'],
    label: "facsimile",
    part: [
      'Error',
      'Other',
      'Feature Request'
    ]
  }, {
    name: 'WAST (Misc)',
    maintainer: maintainers['max'],
    label: "",
    part: [
      'Other',
      'Feature Request',
      'Documentation improvement',
      'Usability issue'
    ]
  }, {
    name: 'Documentation',
    maintainer: maintainers['max'],
    label: "",
    part: [
      'Other',
      'Feature Request',
      'Improvement'
    ]
  }, {
    name: 'Infrastruktur',
    maintainer: maintainers['max'],
    label: "infrastructure",
    part: [
      'Error'
    ],
    projectId: "435"
  },
  {
    name: 'WiTTSim',
    maintainer: maintainers['sabine'],
    label: "wittsim",
    part: [
      'Other',
      'Feature Request',
      'Error',
      'Usability issue'
    ]
  },  {
    name: 'WiTTLex',
    maintainer: maintainers['ines'],
    label: "wittlex",
    part: [
      'Other',
      'Feature Request',
      'Error'
    ]
  }
  ];
}


/**
 * Registers the javascript event handler, when a component is clicked/changed
 */
function init_components_click_handler()
{
  $('#select_components').change(function(){
    show_area($(this).val());
  });
}

/**
 * Displays all available components
 */
function show_components()
{
  var components_text = "";
  $(components).each(function(i,k) {
    components_text += "<option value='" + i + "'>" + k['name'] + "</option>";
  });

  $('#select_components').append(components_text);
  $('#select_components').trigger("change");
}

/**
 * Gets the corresponding areas (component parts) for a component
 * @param id The component id (necessary for a component parts lookup)
 */
function show_area(id)
{
  areas_text = "";
  if (id in components) {
    $(components[id]['part']).each(function(i,k) {
      areas_text += "<option value='" + i + "'>" + k + "</option>";
    });
  }

  $('#select_areas').html(areas_text);
}

/**
 * Chooses a default component and area for an issue
 */
function select_default_component()
{
  $('#select_components').val(3);
  $('#select_components').trigger("change");
  $('#select_areas').val(0);
}

/**
 * Registers the javascript event handler for submit button
 * When submit button is clicked, sent feedback
 */
function init_submit_click_handler()
{
  $(".feedback").on("submit", function(e) {
    e.preventDefault();

    $('.alert').remove();

    var title = $('#input_title').val();
    var description = $('#text_description').val();
    var component = components[$('#select_components').val()]['name'];
    var component_part = components[$('#select_components').val()]['part'][$('#select_areas').val()];
    var assignee_id = components[$('#select_components').val()]['maintainer'];

    var full_description = "Feedback for component **" +
      component         + "**: **" +
      component_part     + "**: " +
      title  + '.' +
      "\n\n*The following additional description was provided:*\n\n" +
      description + "\n\n*This issue report was externally filed by: <" +
      $('#input_email').val().trim() + '>*';

    var severity = $('input[name=options_severity]:checked').val();
    var component_label = components[$('#select_components').val()]['label'];
    var labels = [severity, 'external', 'status:issued'];

    if (component_label.length > 0) {
      labels.push("component:" + component_label);

      /* Use component label (uppercase) as prefix for issue title */
      title = "[" + component_label.toUpperCase() + "] " + title;
    }

    var labels_string = labels.join();

    var project_id = components[$('#select_components').val()]['projectId'] || 63;

    post_issue(title, full_description, assignee_id, labels_string, project_id);
  });
}

/**
 * Resets feedback form after successfully sent
 */
function clear_forms()
{
  $('#input_email').val('');
  $('#input_title').val('');
  $('#text_description').val('');
  $("#option_severity_2").prop("checked", true);
  $('#security_question').val('');
  select_default_component();
}

/**
 * Displays the new feedback app inside the main window
 */
function show_feedback_app() {
  /** verstecke das Motto, sobald die feebackapp gezeigt wird, Autor: Max/Daniel
 */
  hide_motto();

  inject_feedback_html();
}


/**
 * GET request from feedback html file will
 * display that content in a special feedback div.
 */
function inject_feedback_html()
{
  $.get("../feedback.html", function(result) {
      $('.feedback').append(result);
  })
  .done(function() {
    init_submit_click_handler();
    init_maintainers();
    init_components();
    init_components_click_handler();
    show_components();
    select_default_component();
  });
}
