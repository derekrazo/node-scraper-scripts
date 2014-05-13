var summary = require('./index.js');

summary.summarize('https://en.wikipedia.org/wiki/Nueral_networks', function(title, summary, failure) {
	if (failure) {
		console.log("There was an error.");
	}

    console.log(' - ' + title + ' - ');
	console.log(summary);
});
