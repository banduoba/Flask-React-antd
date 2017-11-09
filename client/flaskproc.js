var fs = require("fs");

fs.readFile('../server/static/index.html', function (err, data) {
   	if (err) {
       return console.error(err);
   	}
   	var dataStr = data.toString();
   	dataStr = dataStr.replace(/index.css/, "/static/index.css");
   	dataStr = dataStr.replace(/src="index.js"/, 'src="/static/index.js"');
   	fs.writeFile('../server/templates/index.html', dataStr,  function(err) {
   		if (err) {
       		return console.error(err);
   		}
   		fs.unlink('../server/static/index.html', function(err) {
   			if (err) {
       			return console.error(err);
   			}
		});
	});
});