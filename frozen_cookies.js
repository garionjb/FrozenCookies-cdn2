// Global Variables
var scriptElement = document.getElementById( 'frozenCookieScript' ),
	baseUrl = scriptElement !== null ?
		scriptElement.getAttribute('src').replace(/\/frozen_cookies\.js$/, '') :
		'https://cdn.rawgit.com/Icehawk78/FrozenCookies/master',
	FrozenCookies = {
		'baseUrl': baseUrl,
		'branch' : 'Beta-',
		'version': '1.5'
	};

// Load external libraries
var script_list = [
    '//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/jquery-ui.min.js',
    '//ajax.googleapis.com/ajax/libs/jqueryui/1.10.4/themes/smoothness/jquery-ui.css',
    '//cdnjs.cloudflare.com/ajax/libs/jcanvas/16.7.3/jcanvas.min.js',
    '//cdnjs.cloudflare.com/ajax/libs/jqplot/1.0.8/jquery.jqplot.min.js',
    '//cdnjs.cloudflare.com/ajax/libs/jqplot/1.0.8/jquery.jqplot.min.css',
    '//cdnjs.cloudflare.com/ajax/libs/jqplot/1.0.8/plugins/jqplot.canvasTextRenderer.min.js',
    '//cdnjs.cloudflare.com/ajax/libs/jqplot/1.0.8/plugins/jqplot.canvasAxisLabelRenderer.min.js',
    '//cdnjs.cloudflare.com/ajax/libs/jqplot/1.0.8/plugins/jqplot.canvasAxisTickRenderer.min.js',
    '//cdnjs.cloudflare.com/ajax/libs/jqplot/1.0.8/plugins/jqplot.trendline.min.js',
    '//cdnjs.cloudflare.com/ajax/libs/jqplot/1.0.8/plugins/jqplot.highlighter.min.js',
    '//cdnjs.cloudflare.com/ajax/libs/jqplot/1.0.8/plugins/jqplot.logAxisRenderer.min.js',
    '//cdnjs.cloudflare.com/ajax/libs/jqplot/1.0.8/plugins/jqplot.cursor.min.js',
    FrozenCookies.baseUrl + '/cc_upgrade_prerequisites.js',
    FrozenCookies.baseUrl + '/fc_main.js',
    FrozenCookies.baseUrl + '/fc_button.js'
  ]
  
FrozenCookies.loadInterval = setInterval(function() {
  if (Game && Game.ready) {
    clearInterval(FrozenCookies.loadInterval);
    FrozenCookies.loadInterval = 0;
    fcInit();
  }
}, 1000);

function loadScript(id) {
  if (id >= script_list.length) {
    setOverrides();
    FCStart();
  } else { 
    var url = script_list[id];
    if (/\.js$/.exec(url)) {
      $.getScript(url, function() {loadScript(id + 1);});
    } else if (/\.css$/.exec(url)) {
      $('<link>').attr({rel: 'stylesheet', type: 'text/css', href: url}).appendTo($('head'));
      loadScript(id + 1);
    } else {
      console.log('Error loading script: ' + url);
      loadScript(id + 1);
    }
  }
}

function fcInit() {
  var jquery = document.createElement('script');
  jquery.setAttribute('type', 'text/javascript');
  jquery.setAttribute('src', '//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js');
  jquery.onload = function() {loadScript(0);};
  document.head.appendChild(jquery);
}
