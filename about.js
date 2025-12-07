// about.js - Logic cho trang giới thiệu và đánh giá khách hàng

document.addEventListener('DOMContentLoaded', () => {
    console.log("about.js đã được tải.");

    // Dữ liệu đánh giá mẫu
    const allReviews = [
        { id: 1, name: "Nguyễn Thu Hà", email: "ha.nt@gmail.com", avatar: "../IMG/avatar/6.jpg", stars: 5, feedback: "Rau củ quả rất tươi ngon, giao hàng nhanh chóng. Sẽ ủng hộ lâu dài!" },
        { id: 2, name: "Trần Minh Tuấn", email: "tuan.tm@yahoo.com", avatar: "../IMG/avatar/7.jpg", stars: 5, feedback: "Sản phẩm chất lượng, đóng gói cẩn thận. Rất hài lòng với dịch vụ của Guni Farm." },
        { id: 3, name: "Phạm Thị Yến", email: "yen.pt@hotmail.com", avatar: "../IMG/avatar/8.jpg", stars: 4, feedback: "Đã thử nhiều loại sản phẩm và đều rất ưng ý. Giá cả hợp lý." },
        { id: 4, name: "Lê Văn Lộc", email: "loc.lv@gmail.com", avatar: "../IMG/avatar/9.jpg", stars: 5, feedback: "Dịch vụ khách hàng rất tốt, tư vấn nhiệt tình. Hạt giống nảy mầm đều." },
        { id: 5, name: "Đặng Thị Mai", email: "mai.dt@gmail.com", avatar: "../IMG/avatar/10.jpg", stars: 4, feedback: "Mua bộ dụng cụ làm vườn rất tiện lợi. Mong Guni Farm có thêm nhiều sản phẩm mới." },
        { id: 6, name: "Vũ Đình Khiêm", email: "khiem.vd@gmail.com", avatar: "../IMG/avatar/11.jpg", stars: 5, feedback: "Rau cải xoong tươi, sạch, nấu canh rất ngọt. Cảm ơn Guni Farm!" },
        { id: 7, name: "Hoàng Minh Đức", email: "duc.hm@gmail.com", avatar: "../IMG/avatar/12.jpg", stars: 5, feedback: "Trái cây ở đây luôn tươi ngon, không bị dập. Giao hàng đúng hẹn." },
        { id: 8, name: "Bùi Thị Lan", email: "lan.bt@gmail.com", avatar: "../IMG/avatar/7.jpg", stars: 4, feedback: "Sản phẩm phân bón hữu cơ hiệu quả, vườn rau phát triển tốt." },
        { id: 9, name: "Ngô Văn Tình", email: "tinh.nv@gmail.com", avatar: "../IMG/avatar/8.jpg", stars: 5, feedback: "Mua rau ở Guni Farm rất yên tâm, không lo hóa chất. Giao hàng nhanh và chuyên nghiệp." },
    ];

    const testimonialsContainer = document.getElementById('testimonials-container');
    const showMoreBtn = document.getElementById('show-more-reviews-btn');
    const userReviewForm = document.getElementById('user-review-form');
    const ratingStars = document.querySelector('.rating-stars');

    let visibleReviews = 6;
    let selectedRating = 0;

    // Hàm render số sao
    function renderStars(rating) {
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                starsHtml += `<i class="fas fa-star"></i>`;
            } else {
                starsHtml += `<i class="far fa-star"></i>`;
            }
        }
        return starsHtml;
    }

    // Hàm hiển thị các đánh giá
    function renderReviews() {
        testimonialsContainer.innerHTML = ''; // Xóa các đánh giá cũ
        const reviewsToShow = allReviews.slice(0, visibleReviews);

        if (reviewsToShow.length > 0) {
            reviewsToShow.forEach(review => {
                const card = document.createElement('div');
                card.classList.add('testimonial-card');
                card.innerHTML = `
                    <div class="customer-info">
                        <img src="${review.avatar}" alt="${review.name}'s avatar">
                        <h4>${review.name}</h4>
                    </div>
                    <div class="rating-stars">
                        ${renderStars(review.stars)}
                    </div>
                    <p>"${review.feedback}"</p>
                `;
                testimonialsContainer.appendChild(card);
            });
        } else {
            testimonialsContainer.innerHTML = '<p>Chưa có đánh giá nào.</p>';
        }

        // Ẩn nút "Xem thêm" nếu đã hiển thị hết
        if (visibleReviews >= allReviews.length) {
            showMoreBtn.style.display = 'none';
        } else {
            showMoreBtn.style.display = 'block';
        }
    }

    // Xử lý sự kiện khi nhấn nút "Xem thêm"
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', () => {
            visibleReviews += 6;
            renderReviews();
        });
    }

    // Xử lý chọn sao trong form
    if (ratingStars) {
        ratingStars.addEventListener('click', (e) => {
            const star = e.target.closest('i');
            if (star) {
                const value = parseInt(star.dataset.value);
                selectedRating = value;
                // Cập nhật lại màu sao
                const stars = ratingStars.querySelectorAll('i');
                stars.forEach((s, index) => {
                    if (index < value) {
                        s.classList.add('fas');
                        s.classList.remove('far');
                    } else {
                        s.classList.add('far');
                        s.classList.remove('fas');
                    }
                });
            }
        });
    }

    // Xử lý gửi form đánh giá
    if (userReviewForm) {
        userReviewForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('review-name').value;
            const email = document.getElementById('review-email').value;
            const feedback = document.getElementById('review-feedback').value;

            if (selectedRating === 0) {
                alert("Vui lòng chọn số sao đánh giá.");
                return;
            }

            // Tạo đối tượng đánh giá mới (tạm thời log ra console)
            const newReview = {
                name: name,
                email: email,
                rating: selectedRating,
                feedback: feedback,
                date: new Date().toLocaleDateString('vi-VN')
            };

            console.log("Đánh giá mới của người dùng:", newReview);
            alert("Cảm ơn bạn đã gửi đánh giá. Đánh giá của bạn sẽ được hiển thị sau khi được kiểm duyệt!");

            // Reset form
            userReviewForm.reset();
            selectedRating = 0;
            // Reset sao
            const stars = ratingStars.querySelectorAll('i');
            stars.forEach(s => {
                s.classList.add('far');
                s.classList.remove('fas');
            });
        });
    }

    // Khởi tạo hiển thị lần đầu
    renderReviews();
});
