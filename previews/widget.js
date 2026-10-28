/* TracksideProfits race previews widget. Squarespace: <div data-tp-previews hidden>...</div> + this script.
   On /blog it inserts its own block above the post list. Data: feed.json next to this file. */
(function(){
  var BASE = "https://picks.tracksideprofits.com/previews/";
  function esc(t){return String(t==null?"":t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");}
  function cards(items){
    return '<div class="te-posts">'+items.map(function(i){
      return '<a class="te-post" href="'+esc(i.url)+'"><span class="te-post-img" style="background:#111;display:flex;align-items:flex-end;padding:14px;color:#D4AF37;font-weight:700;letter-spacing:.06em;text-transform:uppercase;font-size:13px">'+esc(i.track)+' &middot; '+esc(i.day)+'</span>'+
             '<span class="te-post-body"><span class="te-post-date">Race preview &middot; '+esc(i.date_label)+'</span><strong>'+esc(i.title)+'</strong></span></a>';
    }).join("")+'</div>';
  }
  function blogBlock(items){
    var css='<style>.tpv{max-width:1240px;margin:0 auto 28px;padding:0 4vw}.tpv h2{font-size:clamp(22px,3vw,30px);text-transform:uppercase;margin:0 0 6px}.tpv p{margin:0 0 14px;color:#555}'+
      '.tpv-g{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:14px}.tpv-g a{display:block;border:1px solid #e3e3e3;border-top:4px solid #D4AF37;border-radius:12px;padding:16px;text-decoration:none;color:#111;background:#fff}'+
      '.tpv-g a span{display:block;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#8A6D12;margin-bottom:6px}.tpv-g a b{font-size:17px;line-height:1.3}.tpv-all{display:inline-block;margin-top:12px;color:#8A6D12;font-weight:600}</style>';
    return css+'<section class="tpv" aria-label="Race previews"><h2>This Week&rsquo;s Race Previews</h2><p>The field, how the race sets up and our picks for the biggest races.</p><div class="tpv-g">'+
      items.map(function(i){return '<a href="'+esc(i.url)+'"><span>'+esc(i.track)+' &middot; '+esc(i.date_label)+'</span><b>'+esc(i.title)+'</b></a>';}).join("")+
      '</div><a class="tpv-all" href="'+BASE+'">All race previews &rarr;</a></section>';
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
