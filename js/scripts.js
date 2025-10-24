document.addEventListener("DOMContentLoaded", function () {
  var splide = new Splide("#events-slider", {
    padding: "5rem",
    direction: "rtl",
    perPage: 5,
    gap: "1.2rem",
    drag: "free",
    snap: true,
    breakpoints: {
      1200: {
        perPage: 4,
      },
      900: {
        perPage: 3,
      },
      600: {
        perPage: 2, // مقدار صحیح قرار بدید
        focus: "center", // اسلاید وسط رو focus کنه
        gap: "0.6rem",
        fixedWidth: "calc(66.666% - 0.6rem)", // دو سوم عرض نمایشگر
      },
    },
  });

  splide.mount();

  new Splide("#categories", {
    perPage: 8,
    gap: "1rem",
    arrows: true,
    pagination: false,
    direction: "rtl",
    breakpoints: {
      1024: { perPage: 5 },
      768: { perPage: 4 },
      480: { perPage: 4 },
    },
  }).mount();
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
