// blog.js - Code cho trang blog

// Hàm để render các bài viết blog
function renderBlogPosts(category, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Không tìm thấy container có id: ${containerId}`);
        return;
    }

    // Lọc tất cả bài viết của danh mục đó
    const postsToShow = blogPosts.filter(post => post.category === category);
    
    let htmlContent = '';
    postsToShow.forEach(post => {
        htmlContent += `
            <a href="blog-detail.html?id=${post.id}" class="blog-post-card" data-aos="fade-up" data-aos-duration="1500"
      data-aos-offset="100">
                <div class="blog-image-container" >
                    <img src="${post.image}" alt="${post.title}">
                </div>
                <div class="blog-post-content">
                    <h4>${post.title}</h4>
                    <p>${post.summary}</p>
                </div>
            </a>
        `;
    });
    container.innerHTML = htmlContent;
}

// Xử lý sự kiện khi DOM đã tải xong
document.addEventListener('DOMContentLoaded', () => {
    // Render tất cả bài viết cho mỗi phần
    renderBlogPosts("organic", "organic-posts");
    renderBlogPosts("home-garden", "home-garden-posts");
    renderBlogPosts("healthy-life", "healthy-life-posts");

    // Xử lý sự kiện click cho các nút mũi tên
    document.querySelectorAll('.carousel-arrow').forEach(arrow => {
        arrow.addEventListener('click', (e) => {
            const direction = arrow.classList.contains('left-arrow') ? -1 : 1;
            const targetId = arrow.dataset.target;
            const grid = document.getElementById(targetId);

            if (!grid) {
                console.error(`Không tìm thấy phần tử có id: ${targetId}`);
                return;
            }

            const cardWidth = grid.querySelector('.blog-post-card').offsetWidth + 20; // Lấy chiều rộng của một card + gap
            const scrollAmount = cardWidth * 3;

            // Tính toán vị trí cuộn mới
            const newScrollLeft = grid.scrollLeft + direction * scrollAmount;

            // Kiểm tra và xử lý vòng lặp
            if (direction === 1) { // Cuộn sang phải
                if (grid.scrollWidth - grid.scrollLeft - grid.clientWidth < cardWidth) {
                    // Đã đến cuối, quay lại đầu
                    grid.scrollLeft = 0;
                } else {
                    grid.scrollLeft = newScrollLeft;
                }
            } else { // Cuộn sang trái
                if (grid.scrollLeft <= 0) {
                    // Đã đến đầu, cuộn sang cuối
                    grid.scrollLeft = grid.scrollWidth - grid.clientWidth;
                } else {
                    grid.scrollLeft = newScrollLeft;
                }
            }
        });
    });
});
