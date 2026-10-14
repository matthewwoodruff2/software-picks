// TracksideProfits Today's Picks embed. Paste into a Squarespace Code Block:
// <div id="tp-software-picks"></div><script src="https://picks.tracksideprofits.com/embed.js"></script>
// Only renders on tracksideprofits.com (and Squarespace's editor preview).
(function(){var host=document.getElementById('tp-software-picks');if(!host)return;
var h=location.hostname;if(!/(^|\.)tracksideprofits\.com$/.test(h)&&!/\.squarespace\.com$/.test(h)){host.innerHTML='<p><a href="https://www.tracksideprofits.com/todays-picks">See TracksideProfits Software Picks</a></p>';return;}
// Sit flush under the site header and run edge to edge, like the other pages.
function fit(){try{
  var sec=host.closest('section.page-section'),hdr=document.querySelector('#header, header.header');
  if(sec){var hb=hdr?hdr.getBoundingClientRect().bottom:0,st=sec.getBoundingClientRect().top;
    var fixed=hdr&&/fixed|sticky|absolute/.test(getComputedStyle(hdr).position);
    sec.style.paddingTop=(fixed?Math.max(0,Math.round(hb-st)):0)+'px';sec.style.paddingBottom='0px';sec.style.minHeight='0';
    var cw=sec.querySelector('.content-wrapper');if(cw){cw.style.paddingTop='0px';cw.style.paddingBottom='0px';}}
  host.style.marginLeft='0';host.style.width='';
  var vw=document.documentElement.clientWidth,r=host.getBoundingClientRect();
  host.style.marginLeft=(-Math.round(r.left))+'px';host.style.width=vw+'px';host.style.maxWidth='none';
}catch(e){}}
fetch('https://picks.tracksideprofits.com/fragment.html?v='+Date.now()).then(function(r){return r.text()}).then(function(t){
host.innerHTML=t;host.querySelectorAll('script').forEach(function(old){var s=document.createElement('script');s.textContent=old.textContent;old.replaceWith(s)});
fit();setTimeout(fit,300);setTimeout(fit,1200);window.addEventListener('resize',fit);
}).catch(function(){host.innerHTML='<p>Picks are loading slowly. Refresh the page in a moment.</p>'});})();
