// TracksideProfits Software Picks embed. Paste into a Squarespace Code Block:
// <div id="tp-software-picks"></div><script src="https://matthewwoodruff2.github.io/software-picks/embed.js"></script>
(function(){var host=document.getElementById('tp-software-picks');if(!host)return;
fetch('https://matthewwoodruff2.github.io/software-picks/fragment.html?v='+Date.now()).then(function(r){return r.text()}).then(function(h){
host.innerHTML=h;host.querySelectorAll('script').forEach(function(old){var s=document.createElement('script');s.textContent=old.textContent;old.replaceWith(s)});
}).catch(function(){host.innerHTML='<p>Picks are loading slowly. Refresh the page in a moment.</p>'});})();
