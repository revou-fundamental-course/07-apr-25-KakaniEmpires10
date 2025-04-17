document.addEventListener("DOMContentLoaded", () => {
  const userName = prompt("Masukkan nama Anda: ");

  const name = document.getElementById("user-name");
  const form = document.getElementById("form-submit");
  const formSubscribe = document.getElementById("subscribe-form");
  const footerDate = document.getElementById("date");
  const slides = document.querySelectorAll(".slide");
  const dots = document.querySelectorAll(".dot");

  //---------------- Dynamic user name at snackbar -------------------//

  if (userName) {
    name.textContent = userName;
  } else {
    name.textContent = "Pengunjung";
  }

  //---------------- Footer Dynamic Year -------------------//

  const currentYear = new Date().getFullYear();
  footerDate.innerHTML = currentYear;

  //---------------- Banner Slide -------------------//

  let currentIndex = 0;
  let interval;
  const slideInterval = 5000;

  // Function to show specific slide
  function showSlide(index) {
    // Handle infinite loop
    if (index >= slides.length) {
      currentIndex = 0;
    } else if (index < 0) {
      currentIndex = slides.length - 1;
    } else {
      currentIndex = index;
    }

    // Update slides
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
      if (i === currentIndex) {
        slide.classList.add("active");
      }
    });

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.remove("active");
      if (i === currentIndex) {
        dot.classList.add("active");
      }
    });
  }

  // Auto slide function
  function startAutoSlide() {
    interval = setInterval(() => {
      showSlide(currentIndex + 1);
    }, slideInterval);
  }

  // Reset interval when manual navigation is used
  function resetInterval() {
    clearInterval(interval);
    startAutoSlide();
  }

  // Event listeners for dots
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const index = parseInt(dot.getAttribute("data-index"));
      showSlide(index);
      resetInterval();
    });
  });

  showSlide(0);
  startAutoSlide();

  //---------------- swiper for profile card -------------------//

  const swiper = new Swiper(".swiper", {
    loop: true,

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },

    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
  });

  //---------------- form validation -------------------//

  function showError(fieldName, message) {
    const errorSpan = document.querySelector(`.err-message.${fieldName}`);
    if (errorSpan) {
      errorSpan.textContent = message;
      errorSpan.style.display = "block";
    }
  }

  function clearError(fieldName) {
    const errorSpan = document.querySelector(`.err-message.${fieldName}`);
    if (errorSpan) {
      errorSpan.textContent = "";
      errorSpan.style.display = "none";
    }
  }

  function validateForm() {
    let isValid = true;
    const name = document.getElementById("name");
    const tgl_lahir = document.getElementById("tgl_lahir");
    const message = document.getElementById("message");
    const genderEl = document.querySelector('input[name="gender"]:checked');

    const nameRegex = /^[a-zA-Z\s]+$/;

    // Validasi Nama
    if (name.value.trim() === "") {
      showError("name", "Nama wajib diisi.");
      isValid = false;
    } else if (!nameRegex.test(name.value.trim())) {
      showError("name", "Nama hanya boleh berisi huruf dan spasi.");
      isValid = false;
    } else {
      clearError("name");
    }

    // validasi Tanggal Lahir
    if (tgl_lahir.value === "") {
      showError("tgl_lahir", "Tanggal lahir wajib diisi.");
      isValid = false;
    } else {
      clearError("tgl_lahir");
    }

    // Validasi Pesan
    if (message.value.trim() === "") {
      showError("message", "Pesan tidak boleh kosong.");
      isValid = false;
    } else if (message.value.trim().length < 10) {
      showError("message", "Pesan tidak boleh kurang dari 10 karakter.");
      isValid = false;
    } else {
      clearError("message");
    }
    console.log(message.value.trim());
    if (isValid) {
      document.getElementById("output-name").textContent = name.value.trim();
      document.getElementById("output-tgl").textContent = tgl_lahir.value;
      document.getElementById("output-gender").textContent = genderEl
        ? genderEl.value
        : "-";
      document.getElementById("output-message").textContent =
        message.value.trim();

      form.reset();
    }

    return isValid;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    validateForm();
  });

  formSubscribe.addEventListener("submit", function (e) {
    e.preventDefault();
    const email = document.getElementById("email").value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
      showError("email", "Email wajib diisi.");
    } else if (!emailRegex.test(email)) {
      showError("email", "Format email tidak valid.");
    } else {
      clearError("email");

      document.getElementById("output-email").textContent = email;

      formSubscribe.reset();
    }
  });

  //---------------- Hamburger Menu -------------------//

  const navWrapper = document.querySelector(".nav-wrapper");
  const hamburgerMenu = document.createElement("div");
  hamburgerMenu.className = "hamburger-menu";
  hamburgerMenu.innerHTML = "<span></span><span></span><span></span>";

  // Insert hamburger before the navigation menu
  const navMenu = document.querySelector(".nav-menu");
  navWrapper.insertBefore(hamburgerMenu, navMenu);

  // Add event listener to hamburger menu
  hamburgerMenu.addEventListener("click", function () {
    navMenu.classList.toggle("active");
    hamburgerMenu.classList.toggle("active");
  });

  // Close menu when clicking on a nav item
  const navItems = document.querySelectorAll(".nav-item a");
  navItems.forEach((item) => {
    item.addEventListener("click", function () {
      navMenu.classList.remove("active");
      hamburgerMenu.classList.remove("active");
    });
  });

  // Handle window resize to reset menu state
  window.addEventListener("resize", function () {
    if (window.innerWidth > 767) {
      navMenu.classList.remove("active");
      hamburgerMenu.classList.remove("active");
    }
  });
});
