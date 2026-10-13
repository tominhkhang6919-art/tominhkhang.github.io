/* ========================================================
   LOGIC.JS - XỬ LÝ TOÀN BỘ TƯƠNG TÁC NGƯỜI DÙNG BẰNG JAVASCRIPT THUẦN
   ======================================================== */

// Lắng nghe sự kiện DOMContentLoaded để đảm bảo HTML đã dựng xong trước khi chạy mã JS
document.addEventListener("DOMContentLoaded", () => {

  /* --------------------------------------------------------
     1. ĐÓNG / MỞ MENU TRÊN THIẾT BỊ DI ĐỘNG (MOBILE HAMBURGER MENU)
     -------------------------------------------------------- */
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Khi click vào nút 3 gạch
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      // Bật/tắt class 'active' trên menu để trượt ra/vào
      navMenu.classList.toggle("active");
      // Bật/tắt class 'open' trên nút để đổi 3 gạch thành dấu X
      navToggle.classList.toggle("open");
    });
  }

  // Tự động đóng menu lại khi bấm vào bất kỳ mục liên kết nào
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        navToggle.classList.remove("open");
      }
    });
  });


  /* --------------------------------------------------------
     2. TỰ ĐỘNG ĐỔI MÀU MENU KHI CUỘN TRANG (SCROLL SPY)
     -------------------------------------------------------- */
  const sections = document.querySelectorAll("section[id]");

  function highlightNavOnScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 100; // Trừ hao chiều cao của thanh header cố định
      const sectionId = section.getAttribute("id");

      // Tìm thẻ link trong menu tương ứng với section này
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

  // Lắng nghe sự kiện người dùng cuộn chuột
  window.addEventListener("scroll", highlightNavOnScroll);


  /* --------------------------------------------------------
     3. XỬ LÝ FORM LIÊN HỆ & THÔNG BÁO PHẢN HỒI (CONTACT FORM)
     -------------------------------------------------------- */
  const contactForm = document.getElementById("contact-form");
  const formAlert = document.getElementById("form-alert");
  const submitBtn = document.getElementById("submit-btn");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      // 1. Chặn hành vi tải lại trang mặc định của trình duyệt
      event.preventDefault();

      // 2. Lấy giá trị và xóa khoảng trắng thừa ở hai đầu bằng .trim()
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const subject = document.getElementById("subject").value.trim();
      const message = document.getElementById("message").value.trim();

      // 3. Kiểm tra xem người dùng có bỏ trống trường nào không
      if (!name || !email || !subject || !message) {
        showAlert("Vui lòng điền đầy đủ tất cả các trường có dấu (*).", "error");
        return;
      }

      // 4. Kiểm tra định dạng email bằng Regular Expression (Regex)
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        showAlert("Địa chỉ email không đúng định dạng. Vui lòng kiểm tra lại!", "error");
        return;
      }

      // 5. Hiệu ứng đang gửi tin nhắn
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = "<span>Đang gửi tin nhắn...</span>";

      // 6. Gửi email thật tới Formspree bằng Fetch API (không bị chuyển hướng trang)
      const formData = new FormData(contactForm);

      fetch("https://formspree.io/f/xdeawnkr", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      })
        .then((response) => {
          if (response.ok) {
            showAlert(`Cảm ơn bạn ${name}! Tin nhắn đã được gửi thành công đến Tô Minh Khang.`, "success");
            contactForm.reset();
          } else {
            return response.json().then((data) => {
              if (data && data.errors) {
                const errorMsg = data.errors.map((err) => err.message).join(", ");
                showAlert("Có lỗi: " + errorMsg, "error");
              } else {
                showAlert("Không thể gửi tin nhắn lúc này. Vui lòng thử lại sau!", "error");
              }
            });
          }
        })
        .catch(() => {
          showAlert("Lỗi kết nối mạng! Vui lòng thử lại hoặc gửi trực tiếp qua email.", "error");
        })
        .finally(() => {
          // Mở lại nút gửi
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnText;

          // Tự động ẩn thông báo sau 6 giây
          setTimeout(() => {
            if (formAlert) {
              formAlert.style.display = "none";
              formAlert.className = "form-alert";
            }
          }, 6000);
        });
    });
  }

  // Hàm hiển thị thông báo với kiểu màu (success: xanh lá, error: đỏ)
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
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

});

