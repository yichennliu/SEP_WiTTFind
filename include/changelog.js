/**
 * @file Coordination of changelog page
 * @author Matthias Lindinger
 */

/**
 * Displays changelog page via html *injection* -
 * GET request from CHANGELOG.md file is converted to HTML and displayed in a special changelog div.
 */
function show_changelog_page(){
  $.get('../CHANGELOG.md', function(result){
    $('.changelog').append(markdown.toHTML(result));
  });
}
