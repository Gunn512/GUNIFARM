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

// window.addEventListener("DOMContentLoaded", () => {
//   includeHTML("#offer", "../html/shared/_offer.html");
//   includeHTML("#header-placeholder", "../html/shared/_header.html");
//   includeHTML("#navbar-placeholder", "../html/shared/_navbar.html");
//   includeHTML("#footer", "../html/shared/_footer.html");
//   includeHTML("#copyright", "../html/shared/_copyright.html");
// });

window.addEventListener("DOMContentLoaded", () => {
  includeHTML("#offer", "./html/shared/_offer.html");
  includeHTML("#header-placeholder", "./html/shared/_header.html");
  includeHTML("#navbar-placeholder", "./html/shared/_navbar.html");
  includeHTML("#footer", "./html/shared/_footer.html");
  includeHTML("#copyright", "./html/shared/_copyright.html");
});

// window.addEventListener("DOMContentLoaded", () => {
//   includeHTML("#offer", "html/shared/_offer.html");
//   includeHTML("#header-placeholder", "html/shared/_header.html");
//   includeHTML("#navbar-placeholder", "html/shared/_navbar.html");
//   includeHTML("#footer", "html/shared/_footer.html");
//   includeHTML("#copyright", "html/shared/_copyright.html");
// });
