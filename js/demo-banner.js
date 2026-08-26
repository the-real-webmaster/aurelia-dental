(function () {
  const CONTACT_URL = "https://github.com/the-real-webmaster";

  if (document.querySelector("[data-demo-banner]")) return;

  const banner = document.createElement("div");
  banner.className = "demo-banner";
  banner.setAttribute("data-demo-banner", "");
  banner.setAttribute("role", "note");
  banner.innerHTML =
    '<div class="demo-banner__inner">' +
    "<p><strong>Демо-проект</strong> — пример сайта для стоматологии. Не является сайтом реальной клиники.</p>" +
    '<a href="' + CONTACT_URL + '" target="_blank" rel="noopener noreferrer">Связаться с автором</a>' +
    "</div>";

  document.body.prepend(banner);
  document.body.classList.add("has-demo-banner");
})();
