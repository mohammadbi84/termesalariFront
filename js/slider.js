document.addEventListener("DOMContentLoaded", function () {
  // بررسی وجود Splide
  if (typeof Splide === "undefined") {
    console.error("SplideJS is not loaded!");
    return;
  }

  // اسلایدر اصلی
  const slider = tns({
    container: ".top-slider",
    items: 1,
    slideBy: "page",
    loop: true,
    controls: false,
    autoplay: false,
    autoplayButtonOutput: false,
    nav: false,
    speed: 500,
  });

  let thumbSlider = null;

  try {
    // اسلایدر تامبنیل
    thumbSlider = new Splide(".splide", {
      type: "slide",
      perPage: 5,
      focus: 0,
      omitEnd: true,
      direction: "rtl",
      pagination: false,
      arrows: true,
      rewind: true,
      gap: "10px",
      breakpoints: {
        768: {
          perPage: 3,
        },
        576: {
          perPage: 2,
        },
      },
    });

    thumbSlider.mount();
  } catch (error) {
    console.error("Splide initialization error:", error);
    return;
  }

  const slides = document.querySelectorAll(".top-slider .item");
  const thumbs = document.querySelectorAll(".thumb-item");
  const videos = document.querySelectorAll(".top-slider video");

  let timeoutId = null;
  let isVideoPlaying = false;

  function playNextSlide() {
    if (isVideoPlaying) return;
    const info = slider.getInfo();
    const currentSlide = slides[info.index % slides.length];
    const duration = parseInt(currentSlide.dataset.duration) || 5000;
    timeoutId = setTimeout(() => {
      slider.goTo("next");
      if (thumbSlider) {
        const nextIndex = (info.index + 1) % slides.length;
        thumbSlider.go(nextIndex);
      }
    }, duration);
  }

  function updateActiveThumb(index) {
    // حذف کلاس active از همه تامبنیل‌ها
    thumbs.forEach((t) => t.classList.remove("active"));

    // اضافه کردن کلاس active به تامبنیل فعلی
    if (thumbs[index]) {
      thumbs[index].classList.add("active");
    }

    // به‌روزرسانی اسلایدر تامبنیل
    if (thumbSlider) {
      thumbSlider.go(index);
    }
  }

  // کلیک روی thumbnail
  thumbs.forEach((t, index) => {
    t.dataset.index = index; // تنظیم index به صورت داینامیک
    t.addEventListener("click", () => {
      clearTimeout(timeoutId);
      const thumbIndex = parseInt(t.dataset.index);
      slider.goTo(thumbIndex);
      if (thumbSlider) {
        thumbSlider.go(thumbIndex);
      }
    });
  });

  // مدیریت ویدیوها
  videos.forEach((video) => {
    const container = video.closest(".video-container");
    if (!container) return;

    const overlay = container.querySelector(".video-overlay");
    const cover = container.querySelector(".video-cover");
    const playBtn = container.querySelector(".btn-play");
    const stopButton = container.querySelector(".btn-stop");

    if (!overlay) return;

    const toggleVideo = () => {
      if (isVideoPlaying) {
        // توقف ویدیو
        if (playBtn) playBtn.style.display = "flex";
        if (cover) cover.style.display = "block";
        video.classList.add("d-none");
        video.pause();
        playNextSlide();
        isVideoPlaying = false;
      } else {
        // پخش ویدیو
        if (playBtn) playBtn.style.display = "none";
        if (cover) cover.style.display = "none";
        video.classList.remove("d-none");
        video.play().catch((e) => console.error("Video play error:", e));
        clearTimeout(timeoutId);
        isVideoPlaying = true;
      }
    };

    overlay.addEventListener("click", toggleVideo);
    video.addEventListener("click", toggleVideo);

    video.addEventListener("ended", () => {
      if (stopButton) stopButton.style.display = "none";
      if (playBtn) playBtn.style.display = "flex";
      if (cover) cover.style.display = "block";
      video.classList.add("d-none");
      isVideoPlaying = false;
      setTimeout(() => {
        slider.goTo("next");
        if (thumbSlider) {
          const info = slider.getInfo();
          thumbSlider.go(info.index);
        }
      }, 500);
    });

    if (overlay) {
      overlay.addEventListener("mouseover", () => {
        if (isVideoPlaying && stopButton) {
          stopButton.style.display = "flex";
        }
      });

      overlay.addEventListener("mouseleave", () => {
        if (stopButton) stopButton.style.display = "none";
      });
    }

    if (stopButton) {
      stopButton.addEventListener("click", function (e) {
        e.stopPropagation();
        toggleVideo();
      });
    }
  });

  // وقتی اسلاید اصلی تغییر کرد
  slider.events.on("indexChanged", (info) => {
    const index = info.displayIndex - 1;
    updateActiveThumb(index);
    clearTimeout(timeoutId);
    playNextSlide();
  });

  // وقتی اسلاید تامبنیل تغییر کرد
  if (thumbSlider) {
    thumbSlider.on("moved", (newIndex) => {
      clearTimeout(timeoutId);
      slider.goTo(newIndex);
    });
  }

  // شروع اسلاید اول
  playNextSlide();
  updateActiveThumb(0);
});
