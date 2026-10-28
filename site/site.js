/* TracksideProfits site polish (loaded on every tracksideprofits.com page from Code Injection > Header).
   Source: picks-engine/site_assets/site.js, published to picks.tracksideprofits.com/site/site.js
   - builds one site footer around the "Free horse racing picks by track" links (which stay plain HTML for Google)
   - adds the price line to the homepage "Four Ways" cards that don't have one */
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
    top.innerHTML = '<div class="tp-sf-brand"><a class="tp-sf-logo" href="/"><img src="' + LOGO + '" alt="" width="46" height="46">Trackside<span>Profits</span></a>' +
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

  function run() { try { footer(); } catch (e) {} try { prices(); } catch (e) {} }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", run); else run();
  window.addEventListener("load", run);
})();
