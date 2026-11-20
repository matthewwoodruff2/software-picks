/* TracksideProfits site polish (loaded on every tracksideprofits.com page from Code Injection > Header).
   Source: picks-engine/site_assets/site.js, published to picks.tracksideprofits.com/site/site.js
   - builds one site footer around the "Free horse racing picks by track" links (which stay plain HTML for Google)
   - adds the price line to the homepage "Four Ways" cards that don't have one
   - homepage "Latest From the Blog": round arrows to page back through older posts, 3 at a time */
(function () {
  var LOGO = "https://picks.tracksideprofits.com/media/favicon-512.png";
  var YT = "https://www.youtube.com/@TracksideProfits";
  function esc(t) { return String(t == null ? "" : t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }

  function footer() {
    var row = document.querySelector(".tp-trackrow");
    if (!row || row.classList.contains("tp-sitefoot")) return;
    var cols = (window.TE_FOOTER_LINKS || []).map(function (c) {
      var links = (c.links || []).filter(function (l) { return !/picks\.tracksideprofits\.com\/results/.test(l.link); });
      if (/contact/i.test(c.heading)) links = links.concat([{ text: "YouTube", link: YT }]);
      return '<div class="tp-sf-col"><h3>' + esc(c.heading) + "</h3><ul>" + links.map(function (l) {
        return '<li><a href="' + esc(l.link) + '">' + esc(l.text) + "</a></li>";
      }).join("") + "</ul></div>";
    }).join("");
    var top = document.createElement("div");
    top.className = "tp-sf-top";
    top.innerHTML = '<div class="tp-sf-brand"><a class="tp-sf-logo" href="/"><img src="' + LOGO + '" alt="" width="36" height="36">Trackside<span>Profits</span></a>' +
      "<p>Wagering-first horse racing coverage: free daily picks, big-race previews and Blueprints, and every result tracked.</p>" +
      '<a class="tp-sf-yt" href="' + YT + '" target="_blank" rel="noopener">&#9654; Watch on YouTube</a></div>' + cols;
    row.insertBefore(top, row.firstChild);
    var bottom = document.createElement("div");
    bottom.className = "tp-sf-bottom";
    bottom.innerHTML = "<span>There are no guaranteed winners. Past results do not guarantee future results. Wager responsibly. " +
      "If you or someone you know has a gambling problem, call 1-800-GAMBLER. Must be 21+ to wager.</span>" +
      "<span>&copy; " + new Date().getFullYear() + " TracksideProfits</span>";
    row.appendChild(bottom);
    row.classList.add("tp-sitefoot");
    document.documentElement.classList.add("tp-foot-ready");
  }

  function prices() {
    var want = { "wagering lab": "Free, always", "blueprints": "$29.99 per Blueprint" };
    [].forEach.call(document.querySelectorAll("#te .te-path"), function (card) {
      if (card.querySelector(".te-path-price")) return;
      var h = card.querySelector("h3"), btn = card.querySelector(".te-btn");
      var txt = h && want[h.textContent.trim().toLowerCase()];
      if (!txt || !btn) return;
      var p = document.createElement("p");
      p.className = "te-path-price";
      p.textContent = txt;
      card.insertBefore(p, btn);
    });
  }

  /* ---- Homepage blog cards: arrows to see earlier posts (same look as the race-preview arrows) ---- */
  var ARW = { p: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 5l-7 7 7 7"/></svg>',
              n: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5l7 7-7 7"/></svg>' };
  function pagerCss() {
    if (document.getElementById("tp-pg-css")) return;
    var st = document.createElement("style"); st.id = "tp-pg-css";
    st.textContent = ".tp-pg{position:relative}.tp-pg-nav{position:absolute;top:0;z-index:3;width:42px;height:42px;border-radius:50%;border:1px solid rgba(0,0,0,.18);background:#fff;color:#000;display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;box-shadow:0 2px 10px rgba(0,0,0,.14);transform:translateY(-50%);transition:background .2s,color .2s,border-color .2s}" +
      ".tp-pg-nav:hover{background:#000;color:#D4AF37;border-color:#000}.tp-pg-nav[hidden]{display:none}.tp-pg-next{right:-21px}.tp-pg-prev{left:-21px}" +
      "@media (max-width:767px){.tp-pg-next{right:8px}.tp-pg-prev{left:8px}}";
    document.head.appendChild(st);
  }
  window.TPPager = function (box, items, render, per) {
    per = per || 3; if (!box || items.length <= per || box.getAttribute("data-tp-pg")) return;
    box.setAttribute("data-tp-pg", "1"); pagerCss(); box.classList.add("tp-pg");
    var page = 0, prev = document.createElement("button"), next = document.createElement("button");
    prev.type = next.type = "button"; prev.className = "tp-pg-nav tp-pg-prev"; next.className = "tp-pg-nav tp-pg-next";
    prev.setAttribute("aria-label", "Newer"); next.setAttribute("aria-label", "Earlier"); prev.innerHTML = ARW.p; next.innerHTML = ARW.n;
    function place() {
      var im = box.querySelector(".te-post-img"); if (!im) return;
      var y = im.getBoundingClientRect().top - box.getBoundingClientRect().top + im.offsetHeight / 2;
      prev.style.top = next.style.top = y + "px";
    }
    function show() {
      var old = box.querySelector(".te-posts"), d = document.createElement("div");
      d.innerHTML = render(items.slice(page * per, page * per + per));
      if (old) old.parentNode.replaceChild(d.firstChild, old); else box.appendChild(d.firstChild);
      prev.hidden = page === 0; next.hidden = (page + 1) * per >= items.length; place();
    }
    prev.addEventListener("click", function () { page--; show(); });
    next.addEventListener("click", function () { page++; show(); });
    box.appendChild(prev); box.appendChild(next); window.addEventListener("resize", place); show();
  };
  function blogPager() {
    var box = document.querySelector("[data-te-latest-posts]"); if (!box || box.getAttribute("data-tp-pg")) return;
    var tries = 0;
    (function wait() {
      if (!box.querySelector(".te-post")) { if (tries++ < 40) setTimeout(wait, 250); return; }
      fetch("/blog?format=json").then(function (r) { return r.json(); }).then(function (j) {
        var it = (j.items || []).slice(0, 12), M = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        window.TPPager(box, it, function (xs) {
          return '<div class="te-posts">' + xs.map(function (p) {
            var d = new Date(p.publishOn || p.addedOn || 0), img = p.assetUrl ? (p.assetUrl + "?format=750w") : "";
            var t = document.createElement("div"); t.innerHTML = String(p.title || "");
            return '<a class="te-post" href="' + esc(p.fullUrl) + '"><span class="te-post-img"' + (img ? ' style="background-image:url(\'' + img.replace(/'/g, "%27") + '\')"' : "") +
              '></span><span class="te-post-body"><span class="te-post-date">' + M[d.getMonth()] + " " + d.getDate() + ", " + d.getFullYear() +
              "</span><strong>" + esc(t.textContent) + "</strong></span></a>";
          }).join("") + "</div>";
        });
      }).catch(function () {});
    })();
  }

  function run() { try { footer(); } catch (e) {} try { prices(); } catch (e) {} try { blogPager(); } catch (e) {} }
  window.addEventListener("resize", function () { });
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
  window.addEventListener("load", run);
})();
