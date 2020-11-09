var sis_host = c_sis["host"];
var sis_port = c_sis["port"];
var sis_url = "http://" + sis_host + ":" + sis_port +"/lemmasearch?query=";

$(function(){
  /**
   * @description extracts the last word of the given term
   * @param {string} term - a space separated term
   * @returns {string} - the last word of the term
   * @memberOf module:autosuggest
   * @private
   */
  function extractLastWord(term){
    /* eslint-disable no-use-before-define */
     return split(term).pop();
    /* eslint-enable */
  }
  /**
   * @description splits the given term at one or many whitespaces
   * @param {string} term - a space separated term
   * @returns {string} - the splitted term
   * @memberOf module:autosuggest
   * @private
   */
  function split(term){
    return term.split(/\s+/);
  }

   /** @alias module:autosuggest */ 
    /**
     * @description initializes the autosuggest functionality
     * @returns {void}
     */
      
      var searchTerm;
      var re;
      var suggester = $('#typeahead')
        .on( "keydown", function( event ) {
              if ( event.keyCode === $.ui.keyCode.TAB &&
                  $( this ).autocomplete( "instance" ).menu.active ) {
                event.preventDefault();
              }
        })
        .autocomplete({
          'classes': {
            'ui-autocomplete': 'autosuggest-list dropdown-menu'
          },
          'focus': function(evt){
            evt.preventDefault();
            },
        'position': { my : "right top", at: "left top" },

        'search': function(){
          searchTerm = extractLastWord(this.value);
          re = new RegExp(searchTerm, 'i');
          if(searchTerm.length < 3){
              return false;
            }
          },
        'select': function(_evt, ui){
          var terms = split(this.value);
          var selectedTerm = ui.item.value;
          if(!ui.item.isLemma){
            selectedTerm = _.pad(selectedTerm, selectedTerm.length + 2, '"');
          }
          terms.splice(-1, 1, selectedTerm, '');
          this.value = terms.join(' ');
          return false;
        },
        'source': function(_req, response){
          $.getJSON(sis_url + searchTerm, response);
        }
      }).autocomplete('instance');

      suggester._renderMenu = function(ul, items){
        items = items.reduce(function(aggregator, item){
          aggregator.push({
            'frequency': item.l.split(',')[1] || 0,
            'isLemma': true,
            'value': item.l.split(',')[0]
          });
          if(item.v.length > 1){
            item.v.forEach(function(variant){
              aggregator.push({
                'frequency': variant.split(',')[1] || 0,
                'isLemma': false,
                'value': variant.split(',')[0]
              });
            });
          }
          return aggregator;
        }, []);
        create_word_cloud(items,'#word-cloud');
        items.forEach(function(item){
          this._renderItemData(ul, item);
        }.bind(this));
      };

      suggester._renderItem = function(ul, item){
        var listItemContent = $('<a>').addClass('dropdown-item').attr('href', '#');
        if(item.isLemma){
          listItemContent.addClass('lemma');
        }else{
          listItemContent.addClass('lemma-variant');
        }
        var match = item.value.match(re);
        listItemContent.html(
          item.value.replace(match, '<span class="query-highlight">' + match + '</span>')
        ).append(
          '<span class="frequency">(' + item.frequency + ')</span>'
        );
        return $('<li>').append(listItemContent).appendTo(ul);
      };
    
  
});

