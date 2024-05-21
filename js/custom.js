$(document).ready(function () {
  $(".navbar-toggler").on("click", function () {
    // Toggle the "show" class on the navbar-nav element
    $(".navbar-nav").toggleClass("show");
  });
  // Add a click event listener to the document
  $(document).on("click", function (event) {
    // Check if the clicked element is not part of the navbar
    if (!$(event.target).closest(".navbar").length) {
      // Remove the "show" class from the navbar-nav element
      $(".navbar-nav").removeClass("show");
    }
  });
  //navbar ainmation
  $(window).scroll(function () {
    var appScroll = $(document).scrollTop();
    if (appScroll >= 1) {
      $("header").addClass("headerAnimate");
    } else {
      $("header").removeClass("headerAnimate");
    }
  });
  //mainSlider
  function calculateAutoplayDelay(video, minimumDelay) {
    if (video) {
      const videoDuration = video.duration * 1000;
      return Math.max(videoDuration, minimumDelay);
    }
    return minimumDelay;
  }
  const mainSlider = new Swiper(".mainSlider", {
    spaceBetween: 0,
    loop: true,
    centeredSlides: true,
    speed: 500,
    effect: "fade",
    autoplay: {
      delay: 2000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".mainSlider .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".mainSlider .swiper-button-next",
      prevEl: ".mainSlider .swiper-button-prev",
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },
    on: {
      init: function () {
        setAutoplayDelay(this);
      },
      slideChange: function () {
        pauseAllVideos();
        const activeSlide = this.slides[this.activeIndex];
        const activeVideo = activeSlide.querySelector(".mainSlider video");
        if (activeVideo) {
          activeVideo.play();
          setAutoplayDelay(this);
        }
      },
    },
  });
  function setAutoplayDelay(slider) {
    const activeSlide = slider.slides[slider.activeIndex];
    const activeVideo = activeSlide.querySelector(".mainSlider video");
    const autoplayDelay = calculateAutoplayDelay(activeVideo, 8000);
    slider.params.autoplay.delay = autoplayDelay;
    slider.autoplay.start();
    console.log("Swiper Autoplay Delay:", autoplayDelay);
  }
  function pauseAllVideos() {
    const allVideos = document.querySelectorAll(".mainSlider video");
    allVideos.forEach(function (video) {
      video.pause();
    });
  }

  //populr Slider
  var popular = new Swiper(".popular .swiper", {
    pagination: {
      el: ".popular .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".popular .swiper-button-next",
      prevEl: ".popular .swiper-button-prev",
    },
    // centeredSlides: true,
    // loop: true,
    slidesPerView: "auto",
    watchSlidesProgress: true,
    spaceBetween: 10,
    speed: 700,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 2,
      },
      576: {
        slidesPerView: 3,
      },
      768: {
        slidesPerView: 4,
      },
      991: {
        slidesPerView: 5,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });

  // text length
  $(".item .itemInfo .title , .item .itemInfo .location span").each(function () {
    var text = $(this).text();
    if (text.length > 35) {
      var truncatedText =
        $.trim(text).substring(0, 35).split(" ").slice(0, -1).join(" ") + "...";
      $(this).text(truncatedText);
    }
  });
  // text length
  $(".item .itemInfo .description").each(function () {
    var text = $(this).text();
    if (text.length > 110) {
      var truncatedText =
        $.trim(text).substring(0, 110).split(" ").slice(0, -1).join(" ") +
        "...";
      $(this).text(truncatedText);
    }
  });
});
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
// ////////////////////////////////////////
$(document).ready(function () {
  //spinner
  $(".preloader").delay(1000).fadeOut(300);
  //aos Delay
  if ($(window).width() > 768) {
    $("section").each(function () {
      const sectionDivs = $(this).find("[data-aos]");
      sectionDivs.each(function (index) {
        // Check if data-aos-delay is not already set
        if (!$(this).attr("data-aos-delay")) {
          $(this).attr("data-aos-delay", (index + 1) * 100);
        }
      });
    });
  }
  // aos
  AOS.init({
    offset: 20,
    delay: 50,
    duration: 750,
    once: true,
  });
  // lozad
  const observer = lozad(".lazy", {
    loaded: function (el) {
      el.parentNode.classList.add("loaded");
    },
  });
  observer.observe();
  // parallax
  var parallaxImage = document.getElementsByClassName("parallax");
  new simpleParallax(parallaxImage, {
    delay: 1,
    transition: "cubic-bezier(0,0,0,1)",
  });
  // tooltip
  const tooltipTriggerList = document.querySelectorAll(
    '[data-bs-toggle="tooltip"]'
  );
  const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
  );
  // counter up
  const counterUp = window.counterUp.default;
  const callback = (entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting && !el.classList.contains("is-visible")) {
        counterUp(el, {
          duration: 3000,
          delay: 16,
        });
        el.classList.add("is-visible");
      }
    });
  };
  const IO = new IntersectionObserver(callback, { threshold: 1 });
  const elements = document.querySelectorAll(".counterUp");
  elements.forEach((el) => IO.observe(el));
});
function highlight(el) {
  el.previousElementSibling.classList.add("h");
}
function dehighlight(el) {
  if (el.value === "") {
    el.previousElementSibling.classList.remove("h");
  }
}
// profile Image Input
document
  .getElementById("profileImageInput")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        document
          .getElementById("profileImagePreview")
          .setAttribute("src", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  });
