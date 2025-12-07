// blog-detail.js - Xử lý logic cho trang chi tiết bài viết

document.addEventListener('DOMContentLoaded', () => {
    console.log("blog-detail.js đã được tải.");

    // Lấy ID bài viết từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = parseInt(urlParams.get('id'));

    console.log("postId từ URL:", postId);
    
    // Log để kiểm tra mảng dữ liệu đã được tải chưa
    console.log("Dữ liệu blogPosts đã tải:", typeof blogPosts !== 'undefined' ? blogPosts : "Chưa tải");

    const blogContentWrapper = document.getElementById('blog-content-wrapper');

    if (postId) {
        // Tìm bài viết tương ứng trong mảng dữ liệu
        const currentPost = blogPosts.find(p => p.id === postId);
        
        console.log("Bài viết được tìm thấy:", currentPost);

        if (currentPost) {
            // Cập nhật tiêu đề trang bằng phương thức chuẩn
            document.title = currentPost.title + " - Guni Farm";

            // Hiển thị nội dung bài viết
            blogContentWrapper.innerHTML = `
                <div class="blog-detail-content">
                    <h1>${currentPost.title}</h1>
                    <div class="blog-content-text">
                        ${currentPost.content}
                    </div>
                </div>
            `;
            
            // Lấy tất cả bài viết cùng chủ đề, sắp xếp theo ID để đảm bảo thứ tự
            const categoryPosts = blogPosts
                .filter(post => post.category === currentPost.category)
                .sort((a, b) => a.id - b.id);
            
            // Tìm index của bài viết hiện tại trong mảng cùng chủ đề
            const currentIndex = categoryPosts.findIndex(p => p.id === postId);
            
            // Tìm bài viết trước và sau
            const previousPost = categoryPosts[currentIndex - 1];
            const nextPost = categoryPosts[currentIndex + 1];

            // Tạo các nút điều hướng
            let navigationHtml = '<div class="blog-navigation">';
            if (previousPost) {
                navigationHtml += `<a href="blog-detail.html?id=${previousPost.id}" class="prev-post-btn"><i class="fas fa-arrow-left"></i> Quay lại bài viết</a>`;
            } else {
                // Nếu không có bài viết trước, vẫn tạo một thẻ a trống để giữ bố cục
                navigationHtml += '<span></span>';
            }
            if (nextPost) {
                navigationHtml += `<a href="blog-detail.html?id=${nextPost.id}" class="next-post-btn">Bài viết tiếp theo <i class="fas fa-arrow-right"></i></a>`;
            } else {
                // Nếu không có bài viết sau, vẫn tạo một thẻ a trống để giữ bố cục
                navigationHtml += '<span></span>';
            }
            navigationHtml += '</div>';

            // Thêm các nút điều hướng vào cuối nội dung bài viết
            blogContentWrapper.querySelector('.blog-detail-content').innerHTML += navigationHtml;

        } else {
            blogContentWrapper.innerHTML = '<div class="error-message">Không tìm thấy bài viết này.</div>';
            document.title = "Bài viết không tồn tại - Guni Farm";
            console.error(`Không tìm thấy bài viết với ID: ${postId}`);
        }
    } else {
        blogContentWrapper.innerHTML = '<div class="error-message">Vui lòng chọn một bài viết để xem.</div>';
        document.title = "Lỗi - Guni Farm";
        console.error("Không tìm thấy ID bài viết trên URL.");
    }
});
