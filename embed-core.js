// TracksideProfits Today's Picks embed. Paste into a Squarespace Code Block:
// <div id="tp-software-picks"></div><script src="https://picks.tracksideprofits.com/embed.js"></script>
// Only renders on tracksideprofits.com (and Squarespace's editor preview).
(function(){var host=document.getElementById('tp-software-picks');if(!host)return;
var h=location.hostname;if(!/(^|\.)tracksideprofits\.com$/.test(h)&&!/\.squarespace\.com$/.test(h)){host.innerHTML='<p><a href="https://www.tracksideprofits.com/todays-picks">See TracksideProfits Software Picks</a></p>';return;}
// Sit flush under the site header and run edge to edge, like the other pages.
// Skipped inside the Squarespace editor (framed), only reacts to real width changes,
// at most once per frame, and only writes a style when its value changes.
var inEditor=false;try{inEditor=window.self!==window.top}catch(e){inEditor=true}
function setS(el,k,v){if(el&&el.style[k]!==v)el.style[k]=v}
var lastW=-1,queued=false;
function fit(force){try{
  if(inEditor)return;
  var vw=document.documentElement.clientWidth;if(!force&&vw===lastW)return;lastW=vw;
  var sec=host.closest('section.page-section'),hdr=document.querySelector('#header, header.header');
  if(sec){var hb=hdr?hdr.getBoundingClientRect().bottom:0,st=sec.getBoundingClientRect().top;
    var fixed=hdr&&/fixed|sticky|absolute/.test(getComputedStyle(hdr).position);
    setS(sec,'paddingTop',(fixed?Math.max(0,Math.round(hb-st)):0)+'px');setS(sec,'paddingBottom','0px');setS(sec,'minHeight','0px');
    var cw=sec.querySelector('.content-wrapper');setS(cw,'paddingTop','0px');setS(cw,'paddingBottom','0px');}
  var p=host.parentElement.getBoundingClientRect();
  setS(host,'marginLeft',(-Math.round(p.left))+'px');setS(host,'width',vw+'px');setS(host,'maxWidth','none');
}catch(e){}}
function onResize(){if(queued)return;queued=true;requestAnimationFrame(function(){queued=false;fit(false)})}
// Edge members page: the picks file is encrypted; the unlock key lives only in the members-only code block.
function b64(x){x=x.replace(/-/g,'+').replace(/_/g,'/');while(x.length%4)x+='=';var b=atob(x),u=new Uint8Array(b.length);for(var i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u}
function unlock(j,k){return crypto.subtle.importKey('raw',b64(k),'AES-GCM',false,['decrypt']).then(function(key){return crypto.subtle.decrypt({name:'AES-GCM',iv:b64(j.iv)},key,b64(j.ct))}).then(function(buf){return new TextDecoder().decode(buf)})}
var tpKey=host.getAttribute('data-tp-key');
fetch((host.getAttribute('data-tp-src')||'https://picks.tracksideprofits.com/fragment.html')+'?v='+Date.now()).then(function(r){return tpKey?r.json().then(function(j){return unlock(j,tpKey)}):r.text()}).then(function(t){
host.innerHTML=t;host.querySelectorAll('script').forEach(function(old){var s=document.createElement('script');s.textContent=old.textContent;old.replaceWith(s)});
fit(true);setTimeout(function(){fit(true)},400);window.addEventListener('resize',onResize,{passive:true});
}).catch(function(){host.innerHTML='<p>Picks are loading slowly. Refresh the page in a moment.</p>'});})();
