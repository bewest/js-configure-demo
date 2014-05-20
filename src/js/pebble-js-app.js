var initialized = false;
var my = { options : {  } };
Pebble.addEventListener("ready", function(e) {
  var _raw = window.localStorage.getItem('cgmPebble');
  my.raw = _raw;
  if (_raw) {
    my.options = JSON.parse(_raw);
  }
  
  console.log('endpoint', (my.options.endpoint), JSON.stringify(my));
  initialized = true;
});

Pebble.addEventListener("showConfiguration", function(e) {
  console.log("showing configuration", JSON.stringify(e));
  Pebble.openURL('http://bewest.github.io/cgm-pebble/configurable.html');
});

Pebble.addEventListener("webviewclosed", function(e) {
  console.log("configuration closed");
  // webview closed
  var options = e.response.length > 5 ? JSON.parse(decodeURIComponent(e.response)): null;
  window.localStorage.setItem('cgmPebble', JSON.stringify(options));
  my.options = options;
  console.log("Options = " + JSON.stringify(options));
});
