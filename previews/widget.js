/* TracksideProfits race previews widget. Squarespace: <div data-tp-previews hidden>...</div> + this script.
   On /blog it inserts its own block above the post list. Data: feed.json next to this file. */
(function(){
  var BASE = "https://picks.tracksideprofits.com/previews/";
  function esc(t){return String(t==null?"":t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
  function cards(items){
    return '<div class="te-posts">'+items.map(function(i){
      return '<a class="te-post" href="'+esc(i.url)+'"><span class="te-post-img" style="background:#111 url('+esc(i.image||"")+') center 40%/cover no-repeat"></span>'+
             '<span class="te-post-body"><span class="te-post-date">Race preview &middot; '+esc(i.date_label)+'</span><strong>'+esc(i.title)+'</strong></span></a>';
    }).join("")+'</div>';
  }
  function blogBlock(){
    /* Mirrors the Squarespace blog grid below it: 4vw side padding, 3 columns, 50px gap, 3:2 images, Roboto. */
    var css='<style>.tpv{padding:8px 4vw 56px;margin:0 0 56px;border-bottom:1px solid rgba(0,0,0,.12);font-family:Roboto,"Helvetica Neue",Arial,sans-serif}'+
      '.tpv-head{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:10px 24px;margin:0 0 28px}'+
      '.tpv-k{display:block;color:#8A6D12;font-size:13px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;margin:0 0 8px}'+
      '.tpv h2{font-size:clamp(28px,3.4vw,40px);line-height:1.05;text-transform:uppercase;letter-spacing:-.01em;margin:0}'+
      '.tpv-head p{margin:8px 0 0;color:#555;font-size:16px}'+
      '.tpv-all{color:#000;font-weight:700;font-size:14px;text-transform:uppercase;letter-spacing:.06em;text-decoration:none;border-bottom:2px solid #D4AF37;padding-bottom:2px;white-space:nowrap}'+
      '.tpv-g{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:50px}'+
      '.tpv-c{display:flex;flex-direction:column;text-decoration:none;color:#000}'+
      '.tpv-img{display:block;width:100%;aspect-ratio:3/2;overflow:hidden;background:#111;margin:0 0 18px}'+
      '.tpv-img img{display:block;width:100%;height:100%;object-fit:cover;object-position:50% 40%;transition:transform .4s ease}'+
      '.tpv-c:hover .tpv-img img{transform:scale(1.03)}'+
      '.tpv-d{font-size:12.8px;color:#000;margin:0 0 10px}.tpv-d b{color:#8A6D12;font-weight:700;letter-spacing:.06em;text-transform:uppercase}'+
      '.tpv-t{font-size:clamp(22px,2.1vw,30px);line-height:1.12;letter-spacing:-.02em;font-weight:500;margin:0 0 12px}'+
      '.tpv-x{font-size:14.4px;line-height:1.3;color:#333;margin:0 0 14px}.tpv-m{font-size:14.4px;text-decoration:underline}'+
      '.tpv-w{position:relative}'+
      '.tpv-nav{position:absolute;top:0;z-index:2;width:42px;height:42px;border-radius:50%;border:1px solid rgba(0,0,0,.18);background:#fff;color:#000;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;box-shadow:0 2px 10px rgba(0,0,0,.12);transform:translateY(-50%);transition:background .2s,color .2s,border-color .2s}'+
      '.tpv-nav:hover{background:#000;color:#D4AF37;border-color:#000}.tpv-nav[hidden]{display:none}.tpv-nav svg{width:18px;height:18px}'+
      '.tpv-next{right:calc(-2vw - 21px)}.tpv-prev{left:calc(-2vw - 21px)}'+
      '@media (max-width:1000px){.tpv-g{grid-template-columns:repeat(2,minmax(0,1fr));gap:36px}}'+
      '@media (max-width:640px){.tpv-g{grid-template-columns:1fr;gap:40px}.tpv{padding:8px 6vw 40px}.tpv-next{right:10px}.tpv-prev{left:10px}}</style>';
    return css+'<section class="tpv" aria-label="Race previews"><div class="tpv-head"><div><span class="tpv-k">Free picks &middot; big races</span><h2>This Week&rsquo;s Race Previews</h2>'+
      '<p>The field, how the race sets up and our picks for the biggest races.</p></div><a class="tpv-all" href="'+BASE+'">All race previews &rarr;</a></div>'+
      '<div class="tpv-w"><button type="button" class="tpv-nav tpv-prev" aria-label="Newer race previews" hidden><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg></button>'+
      '<div class="tpv-g"></div>'+
      '<button type="button" class="tpv-nav tpv-next" aria-label="Earlier race previews" hidden><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg></button></div></section>';
  }
  function blogCards(items){
    return items.map(function(i){return '<a class="tpv-c" href="'+esc(i.url)+'"><span class="tpv-img">'+(i.image?'<img src="'+esc(i.image)+'" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src=\''+esc(i.card||"")+'\'">':'')+'</span>'+
        '<span class="tpv-d"><b>Race preview</b> &middot; '+esc(i.date_label)+' &middot; '+esc(i.track)+'</span><span class="tpv-t">'+esc(i.title)+'</span>'+
        (i.description?'<span class="tpv-x">'+esc(i.description)+'</span>':'')+'<span class="tpv-m">Read the preview</span></a>';}).join("");
  }
  function pager(root, all){
    var g=root.querySelector(".tpv-g"), prev=root.querySelector(".tpv-prev"), next=root.querySelector(".tpv-next"), page=0, per=3;
    function place(){var im=g.querySelector(".tpv-img"); var y=im?im.offsetTop+im.offsetHeight/2:120; prev.style.top=next.style.top=y+"px";}
    function show(){
      g.innerHTML=blogCards(all.slice(page*per,page*per+per));
      prev.hidden=page===0; next.hidden=(page+1)*per>=all.length;
      place(); [].forEach.call(g.querySelectorAll("img"),function(im){im.addEventListener("load",place);});
    }
    next.addEventListener("click",function(){page++;show();});
    prev.addEventListener("click",function(){page--;show();});
    window.addEventListener("resize",place);
    show();
  }
  function run(){
    var hosts=[].slice.call(document.querySelectorAll("[data-tp-previews]"));
    var onBlog=/^\/blog\/?$/.test(location.pathname);
    if(!hosts.length && !onBlog) return;
    fetch(BASE+"feed.json?v="+Math.floor(Date.now()/600000)).then(function(r){return r.json();}).then(function(f){
      var all=(f.all&&f.all.length)?f.all:(f.upcoming&&f.upcoming.length?f.upcoming:f.recent||[]);
      var items=all.slice(0,3);
      if(!items.length) return;
      hosts.forEach(function(h){var t=h.querySelector("[data-tp-previews-list]")||h; t.innerHTML=cards(items); h.hidden=false;});
      if(onBlog && !document.querySelector(".tpv")){
        var list=document.querySelector(".blog-list, .blog-basic-grid, .blog-side-by-side-wrapper, .blog-alternating-side-by-side-wrapper, .blog-single-column, .blog-masonry");
        if(list){var d=document.createElement("div"); d.innerHTML=blogBlock(); list.parentNode.insertBefore(d,list); pager(d,all);}
      }
    }).catch(function(){});
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",run); else run();
})();
