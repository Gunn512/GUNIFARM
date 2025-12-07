//  ============================ RENDER DU LIEU ==============================
document.addEventListener("DOMContentLoaded", () => {
  fetch("product.json")
    .then((res) => res.json())
    .then((products) => {
      // Lấy 4 sản phẩm nổi bật đầu tiên
      const featuredProducts = products.slice(0, 4);

      const featuredProductsContainer = document.getElementById(
        "featured-products-container"
      );
      if (featuredProductsContainer) {
        featuredProducts.forEach((product) => {
          // Sử dụng hàm chung để tạo card sản phẩm
          const productCard = createProductCard(product);
          featuredProductsContainer.appendChild(productCard);
        });
      }
    })
    .catch((error) => console.error("Lỗi khi tải dữ liệu sản phẩm:", error));
});

// ========================= JAVA CHO ICON USER ================================
function goToAccountPage() {
  // KIEM TRA TRANG THAI DANG NHAP
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    window.location.href = "profile.html";
  } else {
    window.location.href = "login.html";
  }
}

// ========================= JAVACRIPT ICON BACKTOP ================================
// HIEN NUT KHI CUON XUONG 1000
window.onscroll = function () {
  const btn = document.getElementById("back-top");
  if (
    document.body.scrollTop > 1000 ||
    document.documentElement.scrollTop > 1000
  ) {
    btn.style.display = "block";
  } else {
    btn.style.display = "none";
  }
};

// ANIMATION
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// ============================ CHATBOX ==========================
let chatBox = document.querySelector("#chat-window");
let chatToggle = document.querySelector("#chat-tab");
let chatInput = document.querySelector("#chat-input");
let chatContent = document.querySelector("#chat-body");

let isChatOpen = false;

// HIEN CHAT KHI XUONG 1000PX
window.addEventListener("scroll", () => {
  if (window.scrollY > 1000) {
    chatToggle.style.display = "block";
  } else if (!isChatOpen) {
    chatToggle.style.display = "none";
  }
});

// MO CHATBOX
chatToggle.addEventListener("click", () => {
  chatBox.style.display = "flex";
  isChatOpen = true;
});

// CLICK RA NGOAI
document.addEventListener("click", (e) => {
  if (!chatBox.contains(e.target) && !chatToggle.contains(e.target)) {
    if (!chatInput.value.trim()) {
      chatBox.style.display = "none";
      isChatOpen = false;
    }
  }
});

// GUI
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && chatInput.value.trim() !== "") {
    const msg = document.createElement("div");
    msg.className = "chat-message user";
    msg.textContent = chatInput.value;
    chatContent.appendChild(msg);
    chatInput.value = "";
    chatContent.scrollTop = chatContent.scrollHeight;
  }
});
