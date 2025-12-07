let productsData = [];

// Function to render 5 purchased products with 1 review each
const renderPurchaseHistory = () => {
    const reviewListContainer = document.getElementById('product-list');
    reviewListContainer.innerHTML = '';

    // Lọc ra các sản phẩm có review
    const productsWithReviews = productsData.filter(p => p.reviews && p.reviews.length > 0);

    if (productsWithReviews.length === 0) {
        reviewListContainer.innerHTML = '<p style="text-align: center; color: #777; margin-top: 20px;">Chưa có lịch sử mua hàng.</p>';
        return;
    }

    // Lấy tối đa 5 sản phẩm
    const productsToShow = productsWithReviews.slice(0, 5);

    // Render từng sản phẩm
    productsToShow.forEach(product => {
        const review = product.reviews[0]; // lấy review đầu tiên

        // Tạo sao từ số rating
        const stars = "★".repeat(review.rating) + "☆".repeat(5 - review.rating);

        const reviewHtml = `
        <div class="product-review-item">
            <div class="review-item">
            <img src="${product.image}" alt="${product.name}" width="60">
                <div class="product-info">
                    <div class="product-details">
                        <h4>${product.name}</h4>
                        <div class="product-brand">${product.brand}</div>
                    </div>
                    <div class="product-rating">${stars}</div>
                </div>
            </div>
            <div class="individual-review-item">
                <div class="review-header">
                    <span class="review-date">${review.date}</span>
                </div>
                <div class="review-text">
                    <p>${review.text}</p>
                </div>
            </div>
        </div>
    `;

        reviewListContainer.innerHTML += reviewHtml;
    });

};

// Function to fetch data and then initialize the page
const initializePage = async () => {
    try {
        const response = await fetch('../data/product.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        productsData = await response.json();

        // Render 5 sản phẩm trong lịch sử mua hàng
        renderPurchaseHistory();
    } catch (error) {
        console.error("Could not fetch the products data:", error);
        document.getElementById('product-list').innerHTML = '<p style="text-align: center; color: red; margin-top: 20px;">Không thể tải dữ liệu lịch sử mua hàng. Vui lòng thử lại sau.</p>';
    }
};

// Initial rendering of the page
document.addEventListener('DOMContentLoaded', initializePage);
