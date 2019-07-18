var path       = require('path');
var express    = require('express');
var app        = express();
var staticPath = path.join(__dirname, '/');
var serverport  = 8000;

app.use(express.static(staticPath));
app.use(express.json());

app.post('/webview', function (req, res) {
    var jsonbody = req.body;
    var port = serverport;
    var param1 = "";
    var callbackUrl = "";
  
    console.log(jsonbody);
  
    console.log('hostname ' , req.hostname)
  
    let hasCallback = false;
  
    if (jsonbody.parameters) {
      jsonbody.parameters.forEach(parameter => {
          if (parameter.key === 'webview.onDone') {
              callbackUrl = parameter.value;
              hasCallback = true;
          }
          if (parameter.key === 'param1') {
            param1 = parameter.value;
          } 
      });
      if (!hasCallback) {
          debugLog('Error: request has no callback url');
          return false;
      }
  }
   if (req.hostname.endsWith(".io")) {
     port = "";
   }
   let resbody = {
     "webview.url" : req.protocol + "://" + req.hostname + ":" + port + req.baseUrl + "/booking?callbackUrl=" +callbackUrl + "&param1=" + param1
   };
  
   res.send(resbody)
});

app.listen(serverport, function() {
  console.log('listening on port ' + serverport);
});
