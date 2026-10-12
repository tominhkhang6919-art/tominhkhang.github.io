/* ========================================================
   SCRIPT.JS - XỬ LÝ TƯƠNG TÁC NGƯỜI DÙNG BẰNG JAVASCRIPT THUẦN
   ======================================================== */

// Đảm bảo toàn bộ mã JS chỉ chạy sau khi trình duyệt đã tải xong cấu trúc DOM
document.addEventListener("DOMContentLoaded", () => {

  /* --------------------------------------------------------
     1. ĐÓNG / MỞ MENU TRÊN THIẾT BỊ DI ĐỘNG (MOBILE MENU)
     -------------------------------------------------------- */
  // Lấy các phần tử cần tương tác từ DOM
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Khi click vào nút 3 gạch (hamburger button)
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      // Toggle class 'active' trên menu để trượt menu ra/vào
      navMenu.classList.toggle("active");
      // Toggle class 'open' trên nút để biến 3 gạch thành dấu X
      navToggle.classList.toggle("open");
    });
  }

  // Tự động đóng menu khi người dùng bấm vào bất kỳ liên kết nào trong menu
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        navToggle.classList.remove("open");
      }
    });
  });


  /* --------------------------------------------------------
     2. ĐỔI MÀU MENU KHI CUỘN ĐẾN TỪNG MỤC (SCROLL SPY)
     -------------------------------------------------------- */
  const sections = document.querySelectorAll("section[id]");

  function highlightNavOnScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100; // Trừ khoảng trống thanh header
      const sectionId = section.getAttribute("id");

      // Tìm thẻ <a> có href trỏ đến section này
      const targetNavLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

      if (targetNavLink) {
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          targetNavLink.classList.add("active");
        } else {
          targetNavLink.classList.remove("active");
        }
      }
    });
  }

  // Lắng nghe sự kiện người dùng cuộn chuột (scroll)
  window.addEventListener("scroll", highlightNavOnScroll);


  /* --------------------------------------------------------
     3. XỬ LÝ GỬI FORM LIÊN HỆ (CONTACT FORM HANDLING)
     -------------------------------------------------------- */
  const contactForm = document.getElementById("contact-form");
  const formAlert = document.getElementById("form-alert");
  const submitBtn = document.getElementById("submit-btn");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      // Ngăn chặn hành vi mặc định của form (là load lại trang web)
      event.preventDefault();

      // Lấy dữ liệu từ các ô input và loại bỏ khoảng trắng thừa ở hai đầu bằng .trim()
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      // Kiểm tra tính hợp lệ cơ bản (Client-side validation)
      if (!name || !email || !subject || !message) {
        showAlert("Vui lòng điền đầy đủ tất cả các trường có dấu (*).", "error");
        return;
      }

      // Kiểm tra định dạng email bằng biểu thức chính quy (Regex) đơn giản
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showAlert("Địa chỉ email không đúng định dạng. Vui lòng kiểm tra lại!", "error");
        return;
      }

      // Giả lập trạng thái đang gửi tin nhắn
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = "<span>Đang gửi tin nhắn...</span>";

      // Mô phỏng độ trễ khi gửi tin qua mạng (sau 1 giây sẽ hoàn tất)
      setTimeout(() => {
        // Hiển thị thông báo thành công
        showAlert(`Cảm ơn bạn ${name}! Tin nhắn của bạn đã được ghi nhận. Tôi sẽ phản hồi sớm nhất có thể.`, "success");

        // Xóa trắng các ô nhập liệu sau khi gửi thành công
        contactForm.reset();

        // Khôi phục lại trạng thái ban đầu của nút bấm
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        // Tự động ẩn thông báo sau 6 giây
        setTimeout(() => {
          formAlert.style.display = "none";
          formAlert.className = "form-alert";
        }, 6000);

      }, 1000);
    });
  }

  // Hàm tiện ích để hiển thị thông báo với kiểu màu tương ứng (success / error)
  function showAlert(messageText, alertType) {
    if (!formAlert) return;
    formAlert.textContent = messageText;
    formAlert.className = `form-alert ${alertType}`;
  }


  /* --------------------------------------------------------
     4. NÚT CUỘN LÊN ĐẦU TRANG (BACK TO TOP)
     -------------------------------------------------------- */
  const backToTopBtn = document.getElementById("back-to-top");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", (event) => {
      event.preventDefault();
      // Cuộn mượt về đỉnh trang
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

});

