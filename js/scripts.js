document.addEventListener("DOMContentLoaded", function () {
  var splide = new Splide("#events-slider", {
    padding: "15px",
    direction: "rtl",
    perPage: 4,
    gap: "1rem",
    drag: "free",
    snap: true,
    arrows: false, // غیرفعال کردن arrows پیشفرض
    pagination: false, // غیرفعال کردن pagination پیشفرض
    breakpoints: {
      1200: {
        perPage: 4,
      },
      900: {
        perPage: 3,
      },
      600: {
        perPage: 2,
        focus: "center",
        gap: "0.6rem",
        fixedWidth: "calc(66.666% - 0.6rem)",
      },
    },
  });

  // mount اسلایدر
  splide.mount();

  // گرفتن دکمه‌های سفارشی
  const prevBtn = document.querySelector(".splide-offer-prev-btn");
  const nextBtn = document.querySelector(".splide-offer-next-btn");

  // اضافه کردن event listener برای دکمه‌ها
  if (prevBtn) {
    prevBtn.addEventListener("click", function () {
      splide.go("<");
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", function () {
      splide.go(">");
    });
  }

  // به‌روزرسانی وضعیت دکمه‌ها هنگام تغییر اسلاید
  splide.on("moved", function () {
    updateButtonStates();
  });

  // تابع برای به‌روزرسانی وضعیت دکمه‌ها
  function updateButtonStates() {
    const index = splide.index;
    const length = splide.length;

    if (prevBtn) {
      prevBtn.disabled = index === 0;
    }

    if (nextBtn) {
      nextBtn.disabled = index >= length - splide.options.perPage;
    }
  }

  // مقداردهی اولیه وضعیت دکمه‌ها
  updateButtonStates();

  // category===========================================================================================
  var categorySplide = new Splide("#categories", {
    perPage: 7,
    padding: "20px",
    gap: "1.5rem",
    arrows: false,
    pagination: false,
    direction: "rtl",
    breakpoints: {
      1024: { perPage: 5 },
      768: { perPage: 4 },
      480: { perPage: 4 },
    },
  });
  categorySplide.mount();

  const prevBtnCategory = document.querySelector(".splide-category-prev-btn");
  const nextBtnCategory = document.querySelector(".splide-category-next-btn");

  // اضافه کردن event listener برای دکمه‌ها
  if (prevBtnCategory) {
    prevBtnCategory.addEventListener("click", function () {
      categorySplide.go("<");
    });
  }

  if (nextBtnCategory) {
    nextBtnCategory.addEventListener("click", function () {
      categorySplide.go(">");
    });
  }

  // به‌روزرسانی وضعیت دکمه‌ها هنگام تغییر اسلاید
  categorySplide.on("moved", function () {
    updateButtonStatesCategory();
  });

  // تابع برای به‌روزرسانی وضعیت دکمه‌ها
  function updateButtonStatesCategory() {
    const index = categorySplide.index;
    const length = categorySplide.length;

    if (prevBtnCategory) {
      prevBtnCategory.disabled = index === 0;
    }

    if (nextBtnCategory) {
      nextBtnCategory.disabled = index >= length - categorySplide.options.perPage;
    }
  }

  // مقداردهی اولیه وضعیت دکمه‌ها
  updateButtonStatesCategory();
});

$(document).ready(function () {
  function updateCountdown() {
    $(".countdown-timer").each(function () {
      // برای هر تایمر شمارش معکوس
      const endDateStr = $(this).data("end-date"); // تاریخ پایان
      const endDate = new Date(endDateStr);
      const now = new Date();
      const timeLeft = endDate - now;
      // alert(endDateStr);
      // alert(endDate);
      // alert(now);

      if (timeLeft > 0) {
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        $(this)
          .find(".days")
          .html(
            pad(days) + '<span class="d-block text-dark timer-label">روز</span>'
          );
        $(this)
          .find(".hours")
          .html(
            pad(hours) +
              '<span class="d-block text-dark timer-label">ساعت</span>'
          );
        $(this)
          .find(".minutes")
          .html(
            pad(minutes) +
              '<span class="d-block text-dark timer-label">دقیقه</span>'
          );
        $(this)
          .find(".seconds")
          .html(
            pad(seconds) +
              '<span class="d-block text-dark timer-label">ثانیه</span>'
          );
      } else {
        $(this)
          .find(".days")
          .html(0 + '<span class="d-block text-dark timer-label">روز</span>');
        $(this)
          .find(".hours")
          .html(0 + '<span class="d-block text-dark timer-label">ساعت</span>');
        $(this)
          .find(".minutes")
          .html(0 + '<span class="d-block text-dark timer-label">دقیقه</span>');
        $(this)
          .find(".seconds")
          .html(0 + '<span class="d-block text-dark timer-label">ثانیه</span>');
      }
    });

    function pad(num) {
      return num < 10 ? "0" + num : num;
    }
  }

  updateCountdown(); // اجرای اولیه
  setInterval(updateCountdown, 1000); // بروزرسانی هر ثانیه
});
