/**
 * @file Coordination of tutorial page
 * @author Matthias Lindinger, Stefan Schweter
 */


/**
 * Displays tutorial page via html *injection* -
 * GET request from tutorial.html file is displayed in a special tutorial div.
 */
function open_tutorial_html()
{
  $(".tutorial").load("../tutorial.html", function() {
  });
}

/**
 * Shows the tutorial page
 */
function show_tutorial_page()
{
  open_tutorial_html();
}
