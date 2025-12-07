async function includeHTML(selector, file) {
  try {
    const el = document.querySelector(selector);
    if (!el) return;
    const res = await fetch(file);
    const html = await res.text();
    el.innerHTML = html;

    if (window.lucide) {
      lucide.createIcons();
    }
  } catch (err) {
    console.error("Include error:", err);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  includeHTML("#offer", "offer.html");
  includeHTML("#header-placeholder", "header.html");
  includeHTML("#navbar-placeholder", "navbar.html");
  includeHTML("#footer", "footer.html");
  includeHTML("#copyright", "copyright.html");
});
