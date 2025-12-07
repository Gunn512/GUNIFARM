// Hàm thên class active

function highlightActiveMenu() {
  // Lấy đường dẫn hiện tại
  const currentUrl = window.location.href;
  const menuLinks = document.querySelectorAll(".navbar-main a, .menu-list a");

  if (menuLinks.length === 0) return;
  menuLinks.forEach((link) => {
    if (currentUrl.includes(link.href)) {
      // Thêm class active
      link.classList.add("active");

      const parentDropdown = link.closest(".dropdown");
      if (parentDropdown) {
        const parentLink = parentDropdown.querySelector("a");
        if (parentLink) {
          parentLink.classList.add("active");
        }
      }
    }
  });

  const pathName = window.location.pathname;
  if (pathName.endsWith("/") || pathName.endsWith("index.html")) {
    menuLinks.forEach((link) => {
      if (
        link.getAttribute("href") === "index.html" ||
        link.getAttribute("href") === "./"
      ) {
        link.classList.add("active");
      }
    });
  }
}

// Hàm tìm và thay thế
async function includeHTML(selector, file) {
  try {
    const el = document.querySelector(selector);
    if (!el) return;
    const res = await fetch(file);
    const html = await res.text();
    el.innerHTML = html;

    highlightActiveMenu();

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
