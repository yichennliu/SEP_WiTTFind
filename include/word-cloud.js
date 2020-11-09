/**
 * @file Coordination of wordcloud construction
 * @author Stefan Schweter <stefan@schweter.it>
 */

  
/**
 * Creates and displays a nice wordcloud for all auto suggestions
 *
 * @param suggestions The suggestions delivered by sis
 */
function create_word_cloud(suggestions, id) {
  var data = [];
  var max = 50;
/** verstecke das Motto, sobald die Wordcloud gezeigt wird, Autor: Max/Daniel
 */
  hide_motto();

  _(_.take(_.reverse(_.sortBy(_.uniqBy(suggestions, "value"), function(obj) {
    return _.toNumber(obj.frequency);
  })), max)).forEach(function(item, i) {
    var data_entry = [item["value"], max + 1 - i];
    data.push(data_entry);
  });

  $(id).show();

  WordCloud($(id)[0], {
    list: data,
    options: {
      rotateRatio: 1.9
    },
    click: function(item) {
      $('#typeahead').val(function(index, value) {
        return _.join(_.concat(
          _.dropRight(_.split(value, ' ')),
          [_.pad(item[0], item[0].length+2, '"')]
        ), ' ');
      });
    }
  });
}
