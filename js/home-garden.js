// Thiet lap bien
let currentPage = 1;
const productsPerPage = 8;
let allProducts = [];

// Lay phan tu tu DOM
const productListContainer = document.getElementById("product-home-garden");
const paginationContainer = document.getElementById("pagination");

// ================== HAM RENDER SAN PHAM ==========================

// Xoa san pham cu truoc khi render cai moi
function renderProducts() {
    productListContainer.innerHTML = "";

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToRender = allProducts.slice(startIndex, endIndex);
    
    productsToRender.forEach(product => {
        const productCardHTML = `
            <div class="product-card" data-product-id="${product.id}" data-aos="fade-up" data-aos-duration="1500" data-aos-offset="100">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3 class="product-name">${product.name}</h3>
                    <p class="product-brand">Bran: <span class="brand-name">${product.brand}</span></p>
                    <p class="product-category">Loại: <span class="category-name">${product.category}</span></p>
                    <div class="product-star-icon">
                        ${generateStarIcons(product.rating)}
                        <span class="rating">${product.rating}</span>
                    </div>
                    <div class="product-price-cart">
                        <span class="product-price">${product.price}</span>
                        <button class="add-to-cart" data-id="${product.id}">
                            <i class="fas fa-shopping-basket ibag"></i>
                        </button>
                    </div>
                </div>
            </div>`;
        
        // Tạo một thẻ div mới và thêm nội dung HTML
        const productCard = document.createElement('div');
        productCard.innerHTML = productCardHTML.trim();

        // Thêm sự kiện click vào thẻ product-card
        productCard.querySelector('.product-card').addEventListener('click', (e) => {
            // Ngăn sự kiện click lan truyền lên phần tử cha nếu click vào nút "Thêm vào giỏ"
            if (e.target.closest('.add-to-cart')) {
                return;
            }
            
            // Lấy id của sản phẩm từ thuộc tính data-product-id
            const productId = e.currentTarget.dataset.productId;
            
            // Chuyển hướng đến trang chi tiết sản phẩm với id trên URL
            window.location.href = `product-detail.html?id=${productId}`;
        });

        productListContainer.appendChild(productCard.firstElementChild);
    });
}


// ==================== HAM RENDER PHAN TRANG ==========================
function renderPagination() {
    paginationContainer.innerHTML = "";

    const totalPages = Math.ceil(allProducts.length / productsPerPage);

    // NUT TRUOC
    if (currentPage > 1) {
        const prevButton = createPaginationButton("&laquo;", currentPage - 1);
        paginationContainer.appendChild(prevButton);
    }

    // NUT SO TRANG
    for (let i = 1; i <= totalPages; i++) {
        const pageButton = createPaginationButton(i, i);
        if (i === currentPage) {
            pageButton.classList.add("active");
        }
        paginationContainer.appendChild(pageButton);
    }

    // NUT SAU
    if (currentPage < totalPages) {
        const nextButton = createPaginationButton("&raquo;", currentPage + 1);
        paginationContainer.appendChild(nextButton);
    }
}

// ======================= HAM TAO NUT PHAN TRANG =======================
function createPaginationButton(text, pageNumber) {
    const button = document.createElement("a");
    button.href = "#";
    button.innerHTML = text;
    
    button.addEventListener("click", (e) => {
        e.preventDefault();
        currentPage = pageNumber;
        renderProducts();
        renderPagination();
    });

    return button;
}

// ======================= Hàm tạo ngôi sao =======================
// Dùng để tạo chuỗi HTML chứa các icon ngôi sao dựa trên rating
function generateStarIcons(rating) {
    let starsHtml = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0; // Kiểm tra xem có phải là số lẻ (ví dụ: 4.5) không

    // Thêm các ngôi sao đầy đủ
    for (let i = 0; i < fullStars; i++) {
        starsHtml += `<i class="fas fa-star"></i>`;
    }

    // Thêm ngôi sao nửa nếu có
    if (hasHalfStar) {
        starsHtml += `<i class="fas fa-star-half-alt"></i>`;
    }

    // Thêm các ngôi sao rỗng để đủ 5 ngôi sao (nếu muốn)
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += `<i class="far fa-star"></i>`;
    }

    return starsHtml;
}

// ======================= HAM KHOI DONG =======================
function initialize() {
    fetch('../data/product.json')
        .then(res => res.json())
        .then(data => {
            // Lọc sản phẩm theo type 'home-garden' và gán vào biến toàn cục
            allProducts = data.filter(p => p.type === "home-garden");
            
            // Sau khi lọc xong, gọi hàm render để hiển thị sản phẩm và phân trang
            renderProducts();
            renderPagination();
        })
        .catch(error => {
            console.error('Lỗi khi tải dữ liệu sản phẩm:', error);
            productListContainer.innerHTML = '<p>Không thể tải dữ liệu sản phẩm.</p>';
        });
}

document.addEventListener('DOMContentLoaded', initialize);