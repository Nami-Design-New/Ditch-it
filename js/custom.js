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
  // Get the current URL path
  var currentPath = window.location.pathname.split("/").pop();
  $("header .navLink , .profileNavCol a").each(function () {
    var linkPath = $(this).attr("href").split("/").pop();
    if (linkPath === currentPath) {
      $(this).addClass("active");
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
  //popular Slider
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
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 1,
      },
      992: {
        slidesPerView: 2,
      },
      1200: {
        slidesPerView: 3,
      },
    },
  });
  // Function to generate a random delay within a range
  function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  // Initialize each slideItems separately
  var slideItems = document.querySelectorAll(".slideItems");
  slideItems.forEach(function (slider) {
    var swiper = slider.querySelector(".swiper");
    var pagination = slider.querySelector(".swiper-pagination");
    var nextBtn = slider.querySelector(".swiper-button-next");
    var prevBtn = slider.querySelector(".swiper-button-prev");
    var delay = getRandomDelay(2000, 5000); // Random delay between 2000ms and 5000ms
    new Swiper(swiper, {
      pagination: {
        el: pagination,
        clickable: true,
      },
      navigation: {
        nextEl: nextBtn,
        prevEl: prevBtn,
      },
      slidesPerView: "auto",
      watchSlidesProgress: true,
      spaceBetween: 10,
      speed: 700,
      autoplay: {
        delay: delay,
        disableOnInteraction: false,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
      },
    });
  });
  // item Details Slider
  var itemDetailsSliderThumbs = new Swiper(".itemDetailsSlider .thumbs", {
    // loop: true,
    spaceBetween: 8,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
      0: {
        slidesPerView: 3,
      },
      576: {
        slidesPerView: 4,
      },
      992: {
        slidesPerView: 5,
        direction: "vertical",
      },
    },
  });
  var itemDetailsSliderSlider = new Swiper(".itemDetailsSlider .slider", {
    // loop: true,
    spaceBetween: 8,
    pagination: {
      el: ".itemDetailsSlider .swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".itemDetailsSlider .swiper-button-next",
      prevEl: ".itemDetailsSlider .swiper-button-prev",
    },
    thumbs: {
      swiper: itemDetailsSliderThumbs,
    },
  });
  // text length
  $(".item .itemInfo .title , .item .itemInfo .location span").each(
    function () {
      var text = $(this).text();
      if (text.length > 35) {
        var truncatedText =
          $.trim(text).substring(0, 35).split(" ").slice(0, -1).join(" ") +
          "...";
        $(this).text(truncatedText);
      }
    }
  );
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
          $(this).attr("data-aos-delay", (index + 1) * 50);
        }
      });
    });
  }
  // aos
  AOS.init({
    offset: 20,
    delay: 50,
    duration: 500,
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
$(document).ready(function () {
  $("#profileImageInput").on("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        $("#profileImagePreview").attr("src", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  });
});
// filter
$("#openfilter").on("click", function () {
  $("#filter").addClass("active");
});
$("#closefilter").on("click", function () {
  $("#filter").removeClass("active");
});
