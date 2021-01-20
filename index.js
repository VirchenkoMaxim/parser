const fs = require('fs');
var XmlStream = require('xml-stream');
(function v() {
  let unique = new Set();
  var stream = fs.createReadStream('./technikboerse2latifundistmedia.xml');
  var xml = new XmlStream(stream);

  xml.on('endElement: info', function ({ $, $text }) {
    if ($.name == 'model') unique.add($text);
  });
  xml.on('end', function () {
    fs.writeFileSync(
      './my.json',
      JSON.stringify(Array.from(unique.values())),
      function (err) {
        if (err) {
          console.error('Crap happens');
        }
      },
    );
  });
})();
