/**
 * @file Config buffer class
 * @author Stefan Schweter <stefan@schweter.it>
 */

var c_version = "18.10";

var c_quadroreader = { "port": 80, "host": "reader.wittfind.cis.lmu.de" };

/**  Enable if you are working with mds Server on localhost */
//var c_mds = { "port": 8000, "host": "localhost" };

var c_mds = { "port": 80, "host": "meta.wittfind.cis.lmu.de" };

var c_odysseereader = { "port": 80, "host": "dev.odysseereader.wittfind.cis.uni-muenchen.de"};

var c_sis = { "port": 80, "host": "dev.sis.wittfind.cis.lmu.de" };

var c_axs = { "port": 80, "host": "dev.axs.wittfind.cis.uni-muenchen.de" };

/**  Enable if you are working with wfa Server on cast2 */
var c_wfa = { "port": 80, "host": "dev.wfa.wittfind.cis.uni-muenchen.de" };

/**  Enable if you are working with wfa Server on localhost */
//var c_wfa = { "port": 5000, "host": "localhost" };

var c_rcs = { "port": 80, "host": "dev.rcs.wittfind.cis.uni-muenchen.de" };

/* Configuration values from session storage */

/** Name of session storage settings key for showing facsimile in remarks */
var c_show_facsimile_remarks_name = "show_facsimile_remarks";

/** Name of session storage settings key for showing transcription in remarks */
var c_show_transcription_remarks_name = "show_transcription_remarks";

/** Name of session storage settings key for items per page */
var c_items_per_page_name = "items_per_page";

/** Default value for showing facsimile (of remarks) */
var c_show_facsimile_remarks_default = true;

/** Default value for showing transcription (of remarks) */
var c_show_transcription_remarks_default = true;

/** Default value for items per page */
var c_items_per_page_default = 10;

var c_items_per_page_steps = [10, 15, 20, 25, 30, 50];

var c_available_documents = [
  "Ms-101", "Ms-102", "Ms-103",
  "Ms-104", "Ms-105", "Ms-106", "Ms-107", "Ms-108", "Ms-109", "Ms-110",
  "Ms-111", "Ms-112", "Ms-113", "Ms-114", "Ms-115", "Ms-116", "Ms-117",
  "Ms-118", "Ms-119", "Ms-120", "Ms-121", "Ms-122", "Ms-123", "Ms-124",
  "Ms-125", "Ms-126", "Ms-127", "Ms-128", "Ms-129", "Ms-130", "Ms-131",
  "Ms-132", "Ms-133", "Ms-134", "Ms-135", "Ms-136", "Ms-137", "Ms-138",
  "Ms-139a", "Ms-139b", "Ms-140,39v", "Ms-140", "Ms-141", "Ms-142", "Ms-143",
  "Ms-144", "Ms-145", "Ms-146", "Ms-147", "Ms-148", "Ms-149", "Ms-150",
  "Ms-151", "Ms-152", "Ms-153a", "Ms-153b", "Ms-154", "Ms-155", "Ms-156a",
  "Ms-156b", "Ms-157a", "Ms-157b", "Ms-158", "Ms-159", "Ms-160", "Ms-161",
  "Ms-162a", "Ms-162b", "Ms-163", "Ms-164", "Ms-165", "Ms-166", "Ms-167",
  "Ms-168", "Ms-169", "Ms-170", "Ms-171", "Ms-172", "Ms-173", "Ms-174",
  "Ms-175", "Ms-176", "Ms-177", "Ms-178a", "Ms-178b", "Ms-178c", "Ms-178d",
  "Ms-178e", "Ms-178f", "Ms-178g", "Ms-178h", "Ms-179", "Ms-180a", "Ms-180b",
  "Ms-181", "Ms-182", "Ms-183", "Ms-301", "Ts-201a1", "Ts-201a2", "Ts-202",
  "Ts-203", "Ts-204", "Ts-205", "Ts-206", "Ts-207", "Ts-208", "Ts-209",
  "Ts-210", "Ts-211", "Ts-212", "Ts-213", "Ts-214a1", "Ts-214a2", "Ts-214b1",
  "Ts-214b2", "Ts-214c1", "Ts-214c2", "Ts-215a", "Ts-215b", "Ts-215c",
  "Ts-216", "Ts-217", "Ts-218", "Ts-219", "Ts-220", "Ts-221a", "Ts-221b",
  "Ts-222", "Ts-223", "Ts-224", "Ts-225", "Ts-226", "Ts-227a", "Ts-227b",
  "Ts-228", "Ts-229", "Ts-230a", "Ts-230b", "Ts-230c", "Ts-231", "Ts-232",
  "Ts-233a", "Ts-233b", "Ts-235", "Ts-236", "Ts-237", "Ts-238", "Ts-239",
  "Ts-240", "Ts-241a", "Ts-241b", "Ts-242a", "Ts-242b", "Ts-243", "Ts-244",
  "Ts-245", "Ts-246", "Ts-247", "Ts-248", "Ts-302", "Ts-303", "Ts-304",
  "Ts-305", "Ts-306", "Ts-309", "Ts-310"
];

var c_zoom_factor_name = "zoom";

var c_zoom_steps = [2, 3, 4, 5];

var c_zoom_factor_default = 2;


var c_lang_option = ["Deutsch", "English"];

var c_lang_set_default= "Deutsch";

var c_lang_name = "lang_name";

/** Value for defining the sort Method , default is date-sort */
var c_sort_method_default = "sort-date";

var c_sort_method = c_sort_method_default;

/** Value for defining debug on/off default is off="0" */
var c_sort_debug_default = "0";

var c_sort_debug = "sort_debug";

/**
 * Sets an session storage value, if key DOES NOT exist
 * @param key The key for sesstion storage entry
 * @param value The value to be set
 */
function set_item_session_storage(key, value)
{
  if (sessionStorage.getItem(key) === null) {
    sessionStorage.setItem(key, value);
  }
}

$(function () {
  set_item_session_storage(c_show_facsimile_remarks_name, c_show_facsimile_remarks_default);
  set_item_session_storage(c_show_transcription_remarks_name, c_show_transcription_remarks_default);
  set_item_session_storage(c_items_per_page_name, c_items_per_page_default);
  set_item_session_storage(c_zoom_factor_name, c_zoom_factor_default);
  set_item_session_storage(c_lang_name, c_lang_set_default);
  set_item_session_storage(c_sort_method, c_sort_method_default);
  set_item_session_storage(c_sort_debug, c_sort_debug_default);

});
