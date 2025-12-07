// Hàm hỗ trợ để tạo chuỗi HTML chứa các icon ngôi sao dựa trên điểm rating
function generateStarIcons(rating) {
    let starsHtml = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        starsHtml += `<i class="fas fa-star"></i>`;
    }
    if (hasHalfStar) {
        starsHtml += `<i class="fas fa-star-half-alt"></i>`;
    }
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += `<i class="far fa-star"></i>`;
    }

    return starsHtml;
}

// Hàm format tiền tệ (Ví dụ: 85000 -> 85.000 VNĐ)
function formatCurrency(amount) {
    return amount.toLocaleString('vi-VN') + ' VNĐ';
}

// Logic chính của trang chi tiết sản phẩm
document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get('id'));

    const mainContainer = document.getElementById('product-detail-section');
    const breadcrumbContainer = document.getElementById('breadcrumb-container');
    const productInfoSection = document.getElementById('product-info-section');
    const relatedProductsSection = document.getElementById('related-products-section');
    const reviewsListContainer = document.getElementById('reviews-list-container');
    const newReviewInput = document.getElementById('new-review-text');
    const submitReviewBtn = document.getElementById('submit-review-btn');


    if (!productId) {
        mainContainer.innerHTML = '<p>Không tìm thấy sản phẩm này. Vui lòng trở về trang danh sách.</p>';
        return;
    }

    fetch('../data/product.json')
        .then(res => {
            if (!res.ok) {
                throw new Error('Lỗi khi fetch dữ liệu: ' + res.statusText);
            }
            return res.json();
        })
        .then(allProducts => {
            const product = allProducts.find(p => p.id === productId);

            if (product) {
                renderProductDetails(product, allProducts);
            } else {
                mainContainer.innerHTML = '<p>Không tìm thấy sản phẩm với ID này.</p>';
            }
        })
        .catch(error => {
            console.error('Lỗi khi tải dữ liệu sản phẩm:', error);
            mainContainer.innerHTML = '<p>Lỗi: Không thể tải thông tin sản phẩm. Vui lòng kiểm tra lại đường dẫn file JSON.</p>';
        });

    // Hàm render toàn bộ chi tiết sản phẩm

    function renderProductDetails(product, allProducts) {
        breadcrumbContainer.innerHTML = `
            <span><a href="index.html">Trang chủ</a></span> >
            <span><a href="product.html">Rau Củ Quả</a></span> >
            <span>${product.name}</span>
        `;

        mainContainer.innerHTML = `
            <div class="product-images">
                <div class="main-image">
                    <img id="main-product-image" src="${product.mainImage}" alt="${product.name}">
                </div>
                <div class="thumbnail-gallery" id="thumbnail-gallery">
                    ${product.thumbnails && product.thumbnails.length > 0 ?
                product.thumbnails.map(thumb => `
                            <img src="${thumb}" alt="${product.name} thumbnail">
                        `).join('') : ''}
                </div>
            </div>

            <div class="product-info-detail">
                <h1>${product.name}</h1>
                <p class="brand">Thương hiệu: <strong>${product.brand}</strong></p>
                <p class="category">Loại: <strong>${product.category}</strong></p>
                <div class="rating-stars">
                    ${generateStarIcons(product.rating)}
                    <span class="rating-value">${product.rating} sao</span>
                </div>
                
                <div class="price-section">
                    <span class="unit-price" data-unit-price="${product.unitPrice}">${formatCurrency(product.unitPrice)}</span>
                    <div class="quantity-control">
                        <button id="qty-minus">-</button>
                        <input type="number" id="qty-input" value="1" min="1">
                        <button id="qty-plus">+</button>
                    </div>
                </div>

                <p class="total-price">Tổng cộng: <span id="total-price-value">${formatCurrency(product.unitPrice)}</span></p>
                <button class="add-to-cart-btn">Thêm vào giỏ hàng</button>
            </div>
        `;

        // Render các phần riêng biệt
        renderProductInfo(product);
        renderRelatedProducts(product, allProducts);
        renderCustomerReviews(product.reviews);

        // Thêm sự kiện cho các chức năng tương tác
        setupImageGallery();
        setupQuantityControls(product.unitPrice);

        // Gán sự kiện cho nút gửi đánh giá
        submitReviewBtn.addEventListener('click', () => {
            const reviewText = newReviewInput.value.trim();
            if (reviewText) {
                alert('Đánh giá của bạn đã được gửi: ' + reviewText);
                newReviewInput.value = ''; // Xóa nội dung input
            } else {
                alert('Vui lòng nhập nội dung đánh giá.');
            }
        });
    }

    // Hàm render thông tin sản phẩm
    function renderProductInfo(product) {
        productInfoSection.innerHTML = `
            <h2>Thông tin sản phẩm</h2>
            <p>${product.description}</p>
        `;
    }

    // Hàm render sản phẩm tương tự
    function renderRelatedProducts(currentProduct, allProducts) {
        const relatedProducts = allProducts.filter(p =>
            p.category === currentProduct.category && p.id !== currentProduct.id
        ).slice(0, 4);

        if (relatedProducts.length > 0) {
            relatedProductsSection.innerHTML = `
                <h2>Sản phẩm tương tự</h2>
                <div class="related-products-grid">
                    ${relatedProducts.map(p => `
                        <div class="product-card" onclick="window.location.href='product-detail.html?id=${p.id}'">
                            <img src="${p.mainImage}" alt="${p.name}">
                            <h3>${p.name}</h3>
                            <p class="price">${formatCurrency(p.unitPrice)}</p>
                        </div>
                    `).join('')}
                </div>
            `;
        } else {
            relatedProductsSection.innerHTML = '<h2>Sản phẩm tương tự</h2><p>Chưa có sản phẩm tương tự.</p>';
        }
    }

    // Hàm render đánh giá khách hàng
    function renderCustomerReviews(reviews) {
        if (reviews && reviews.length > 0) {
            reviewsListContainer.innerHTML = `
                <ul class="reviews-list">
                    ${reviews.map(review => `
                        <li>
                            <div class="avatar">
                                <i class="fas fa-user"></i>
                            </div>
                            <div class="review-content">
                                <strong>${review.user}</strong>
                                <p>${review.text}</p>
                                <span class="review-date">${review.date}</span>
                            </div>
                        </li>
                    `).join('')}
                </ul>
            `;
        } else {
            reviewsListContainer.innerHTML = '<p>Chưa có đánh giá nào cho sản phẩm này.</p>';
        }
    }

    // Hàm xử lý thay đổi ảnh nhỏ
    function setupImageGallery() {
        const mainImage = document.getElementById('main-product-image');
        const thumbnails = document.querySelectorAll('#thumbnail-gallery img');

        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                mainImage.src = thumb.src;
                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
            });
        });
        if (thumbnails.length > 0) {
            thumbnails[0].classList.add('active');
        }
    }

    // Hàm xử lý tăng giảm số lượng và tính tổng giá
    function setupQuantityControls(unitPrice) {
        const qtyInput = document.getElementById('qty-input');
        const qtyPlusBtn = document.getElementById('qty-plus');
        const qtyMinusBtn = document.getElementById('qty-minus');
        const totalPriceValue = document.getElementById('total-price-value');

        function updateTotalPrice() {
            const quantity = parseInt(qtyInput.value);
            const total = quantity * unitPrice;
            totalPriceValue.textContent = formatCurrency(total);
        }

        qtyPlusBtn.addEventListener('click', () => {
            qtyInput.value = parseInt(qtyInput.value) + 1;
            updateTotalPrice();
        });

        qtyMinusBtn.addEventListener('click', () => {
            if (parseInt(qtyInput.value) > 1) {
                qtyInput.value = parseInt(qtyInput.value) - 1;
                updateTotalPrice();
            }
        });

        qtyInput.addEventListener('input', updateTotalPrice);
    }
});