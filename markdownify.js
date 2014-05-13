/*

	Boiler plate code for accessing API of http://heckyesmarkdown.com/  

*/

/*
  All of the magic happens at http://heckyesmarkdown.com/go/. 
  It will accept a GET or POST call, and the following query parameters may be added to the url to modify the results:

  One of the following is required:
    u: url encoded URI to parse
    html: HTML text to be Markdownified. May be a full page or snippet, and can be submitted as urlencoded text in a GET call or straight using POST (suggested for larger requests).
    
  Optional:
    read: (optional, default 1) whether to run Readability or not, 0 turns off
    md: (optional, default 1) whether to run Markdownify or not, 0 turns off
    output: (optional, default markdown) type of text to return (json*, url (encoded), or markdown). 
    nv: will generate a Notational Velocity/nvALT url 
    tags: (optional) if the output type is "nv" or "nvalt", adding this key with a url-encoded string of space or comma separated tags will include them when importing into NV/nvALT.
    preview: (optional, default 0) whether to run the result back through Markdown and provide HTML instead of Markdown
    showframe: determines whether or not the output is encased in the HTML frame for viewing/copying
    domarkdown: (any value will run this) used without the other parameters (including u), and takes a text parameter containing url-encoded Markdown text. It returns raw HTML (snippet)


*Sample JSON output:

{ 
  "title":"Every Keyboard Needs A Share Button", 
  "content":"# Every Keyboard Needs A..." 
  [...truncated...] " 
}


  - See more at: http://heckyesmarkdown.com/#api

*/


var request = require('request');
var Url = require('url');


var getMetadata = function (options, callback) {
  var options = options || {};
  var query = options.query || 'GET';


  var url = Url.format({
    protocol: "http",
    hostname: "heckyesmarkdown.com",
    pathname: "/go/",
    query: {
      	u: 'https://en.wikipedia.org/wiki/Nueral_networks',
      	output: 'json'
    },
  });

  request(url, callback);
};


var handleErrors = function (callback) {
  return function (error, response, body) {
    if (error) { throw error; }
    if (response.statusCode !== 200) {
      throw new Error("status code not OK:", response.statusCode);
    }
    // call callback async
    process.nextTick(function () { callback(body); });
  };
};

getMetadata({}, handleErrors(function (body) {
	  //body = JSON.parse(body);
	  console.log(body);
}));

