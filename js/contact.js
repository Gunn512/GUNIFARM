// contact.js - Xử lý logic cho trang liên hệ

document.addEventListener('DOMContentLoaded', () => {
    console.log("contact.js đã được tải.");

    // Xử lý form liên hệ
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Lấy dữ liệu từ form
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const phone = document.getElementById('contact-phone').value;
            const message = document.getElementById('contact-message').value;
            
            // In dữ liệu ra console (thực tế sẽ gửi lên server)
            console.log("Form liên hệ đã được gửi:", {
                name,
                email,
                phone,
                message
            });

            // Hiển thị thông báo thành công
            alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.");

            // Reset form
            contactForm.reset();
        });
    }

    // Xử lý FAQ accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const parentItem = question.parentElement;
            parentItem.classList.toggle('active');
        });
    });
});
