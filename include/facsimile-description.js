/**
 * @file Show description for facsimile extract
 * @author Ivana Daskalovska
 */

/**
 * Get facsimile description for a specific siglum
 * This routine uses the Quadroreader transcription API to get statistics
 * about a specific siglum.
 * 
 * The following information are extracted:
 * - Number of Lines (via xml-oa key-value store)
 * - Number of Choices (via nax)
 * - Number of words (via xml-pos-tagged key-value store)
 * - Number of sentences (via xml-pos-tagged key-value store)
 * 
 * @param siglum The siglum to get information for
 * @param sentencenr The sentence number to get informatio for (from nax)
 * @returns description The facsimile description for a specific siglum
 */
function get_facsimile_description(siglum, sentencenr) {
  return new Promise(function (resolve, reject) {
    var qr_host = c_quadroreader["host"];
    var qr_port = c_quadroreader["port"];

    var axs_host = c_axs["host"];
    var axs_port = c_axs["port"];

    siglum = _.split(siglum, '_')[0];

    $.get("http://" + qr_host + ":" + qr_port + "/transcription/" + siglum + "?xml-oa=1&xml-pos-tagged=1",
      function (transcription_json) {
        $.post("http://" + axs_host + ":" + axs_port + "/api/v1",
          JSON.stringify({
            "sentencenr": _.toInteger(sentencenr),
            "display_tags": 0,
            "document": _.split(siglum, ',')[0]
          }),
          function (sentences_json) {
            number_lines = 1;
            number_choices = 0;

            script_type = siglum[0] == "T" ? "Typoskript" : "Manuskript";

            description = "Der Faksimileextrakt ist aus einem " + script_type + ". ";

            if ('xml-oa' in transcription_json) {
              xml_oa = transcription_json['xml-oa'];

              number_lines += (xml_oa.match(/<lb/g) || []).length;

              if (number_lines > 0) {
                description += "Der Faksimileextrakt hat " + number_lines + " Zeilen. ";
              }
            }

            last_token = _.last(sentences_json['results']);
            last_alternative = _.toNumber(last_token['alternativenr']);

            number_choices = last_alternative == 0 ? 0 : last_alternative - 1;

            if (number_choices > 0) {
              description += "Es sind " + number_choices + " Alternativen vorhanden. ";
            }

            if ('xml-pos-tagged' in transcription_json) {
              xml_pos_tagged = transcription_json['xml-pos-tagged'];

              number_words = (xml_pos_tagged.match(/<w ana/g) || []).length;

              number_sentences = (xml_pos_tagged.match(/<s ana/g) || []).length;

              description += "Außerdem sind " + number_words + " Wörter in " +
                number_sentences + " Sätzen vorhanden.";
            }
            resolve(description);
          });
      });
  });
}