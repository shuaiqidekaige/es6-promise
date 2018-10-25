let fs = require('fs');

fs.writeFile('1.js', 'utf8', function(err, data) {
    console.log(data);
})