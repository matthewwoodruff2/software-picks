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
  function blogBlock(items){
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
      '@media (max-width:1000px){.tpv-g{grid-template-columns:repeat(2,minmax(0,1fr));gap:36px}}'+
      '@media (max-width:640px){.tpv-g{grid-template-columns:1fr;gap:40px}.tpv{padding:8px 6vw 40px}}</style>';
    return css+'<section class="tpv" aria-label="Race previews"><div class="tpv-head"><div><span class="tpv-k">Free picks &middot; big races</span><h2>This Week&rsquo;s Race Previews</h2>'+
      '<p>The field, how the race sets up and our picks for the biggest races.</p></div><a class="tpv-all" href="'+BASE+'">All race previews &rarr;</a></div><div class="tpv-g">'+
      items.map(function(i){return '<a class="tpv-c" href="'+esc(i.url)+'"><span class="tpv-img">'+(i.image?'<img src="'+esc(i.image)+'" alt="" loading="lazy" referrerpolicy="no-referrer" onerror="this.onerror=null;this.src=\''+esc(i.card||"")+'\'">':'')+'</span>'+
        '<span class="tpv-d"><b>Race preview</b> &middot; '+esc(i.date_label)+' &middot; '+esc(i.track)+'</span><span class="tpv-t">'+esc(i.title)+'</span>'+
        (i.description?'<span class="tpv-x">'+esc(i.description)+'</span>':'')+'<span class="tpv-m">Read the preview</span></a>';}).join("")+
      '</div></section>';
  }
  function run(){
    var hosts=[].slice.call(document.querySelectorAll("[data-tp-previews]"));
    var onBlog=/^\/blog\/?$/.test(location.pathname);
    if(!hosts.length && !onBlog) return;
    fetch(BASE+"feed.json?v="+Math.floor(Date.now()/600000)).then(function(r){return r.json();}).then(function(f){
      var items=(f.upcoming&&f.upcoming.length?f.upcoming:f.recent||[]).slice(0,3);
      if(!items.length) return;
      hosts.forEach(function(h){var t=h.querySelector("[data-tp-previews-list]")||h; t.innerHTML=cards(items); h.hidden=false;});
      if(onBlog && !document.querySelector(".tpv")){
        var list=document.querySelector(".blog-list, .blog-basic-grid, .blog-side-by-side-wrapper, .blog-alternating-side-by-side-wrapper, .blog-single-column, .blog-masonry");
        if(list){var d=document.createElement("div"); d.innerHTML=blogBlock(items); list.parentNode.insertBefore(d,list);}
      }
    }).catch(function(){});
  }
  if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",run); else run();
})();
