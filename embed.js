// TracksideProfits Software Picks embed. Paste into a Squarespace Code Block:
// <div id="tp-software-picks"></div><script src="https://matthewwoodruff2.github.io/software-picks/embed.js"></script>
// Only renders on tracksideprofits.com (and Squarespace's editor preview).
(function(){var host=document.getElementById('tp-software-picks');if(!host)return;
var h=location.hostname;if(!/(^|\.)tracksideprofits\.com$/.test(h)&&!/\.squarespace\.com$/.test(h)){host.innerHTML='<p><a href="https://www.tracksideprofits.com/software-picks">See TracksideProfits Software Picks</a></p>';return;}
fetch('https://matthewwoodruff2.github.io/software-picks/fragment.html?v='+Date.now()).then(function(r){return r.text()}).then(function(t){
host.innerHTML=t;host.querySelectorAll('script').forEach(function(old){var s=document.createElement('script');s.textContent=old.textContent;old.replaceWith(s)});
}).catch(function(){host.innerHTML='<p>Picks are loading slowly. Refresh the page in a moment.</p>'});})();
