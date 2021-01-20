const fs = require('fs');
var XmlStream = require('xml-stream');
(function v() {
  let finish = [];
  let unique = new Set();
  const array = JSON.parse(fs.readFileSync('./my.json'));
  // let wstream = fs.createWriteStream('./data.json');
  // wstream.write('[');
  var stream = fs.createReadStream('./technikboerse2latifundistmedia.xml');
  var xml = new XmlStream(stream);
  let data = {};
  xml.on('endElement: info', function ({ $, $text }) {
    if (
      $.name.match(/[А-Я]+/) ||
      $.name == 'manufacturer_name' ||
      $.name == 'model'
    )
      data = { ...data, [$.name]: $text };
    if (array.includes(data.model) && !unique.has(data.model)) {
      unique.add(data.model);
      finish.push(data);
      // wstream.write(JSON.stringify(data) + ',');
    }
    xml.on('end', function () {
      // wstream.write(']');
      fs.writeFileSync('./res.json', JSON.stringify(finish), function (err) {
        if (err) {
          console.error('Crap happens');
        }
      });
    });
  });
})();
