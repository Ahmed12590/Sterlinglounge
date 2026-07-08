const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");

menuToggle.addEventListener("click", () => {
  menuToggle.classList.toggle("active");
  navMenu.classList.toggle("active");
});

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.classList.remove("active");
    navMenu.classList.remove("active");
  });
});


// preloader //

const preloader = document.querySelector(".preloader");

window.addEventListener("load", () => {
  setTimeout(() => {
    preloader.classList.add("hide");
  }, 900);
});




// bottom to top // 
  const backToTop = document.querySelector(".back-to-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("show");
  } else {
    backToTop.classList.remove("show");
  }
});

backToTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});



 


const reviewTrack = document.querySelector(".review-track");
  const reviewCards = document.querySelectorAll(".review-card");
  const reviewPrev = document.querySelector(".review-prev");
  const reviewNext = document.querySelector(".review-next");
  const reviewDots = document.querySelector(".review-dots");

  let reviewIndex = 0;

  function getVisibleCards() {
    if (window.innerWidth <= 520) return 1;
    if (window.innerWidth <= 768) return 2;
    if (window.innerWidth <= 1024) return 3;
    return 4;
  }

  function getMaxIndex() {
    return Math.max(0, reviewCards.length - getVisibleCards());
  }

  function createDots() {
    reviewDots.innerHTML = "";
    for (let i = 0; i <= getMaxIndex(); i++) {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.addEventListener("click", () => {
        reviewIndex = i;
        updateReviewSlider();
      });
      reviewDots.appendChild(dot);
    }
  }

  function updateReviewSlider() {
    const cardWidth = reviewCards[0].offsetWidth;
    const gap = parseInt(getComputedStyle(reviewTrack).gap) || 0;
    const maxIndex = getMaxIndex();

    if (reviewIndex > maxIndex) reviewIndex = maxIndex;
    if (reviewIndex < 0) reviewIndex = 0;

    reviewTrack.style.transform = `translateX(-${reviewIndex * (cardWidth + gap)}px)`;

    const dots = reviewDots.querySelectorAll("button");
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === reviewIndex);
    });
  }

  reviewNext.addEventListener("click", () => {
    reviewIndex++;

    if (reviewIndex > getMaxIndex()) {
      reviewIndex = 0;
    }

    updateReviewSlider();
  });

  reviewPrev.addEventListener("click", () => {
    reviewIndex--;

    if (reviewIndex < 0) {
      reviewIndex = getMaxIndex();
    }

    updateReviewSlider();
  });

  window.addEventListener("resize", () => {
    createDots();
    updateReviewSlider();
  });

  createDots();
  updateReviewSlider();
 



// toggle section ///


//   const projectTabs = document.querySelectorAll(".project-tab");
// const projectRows = document.querySelectorAll(".book-row");

// projectTabs.forEach((tab) => {
//   tab.addEventListener("click", () => {
//     const target = tab.getAttribute("data-tab");

//     projectTabs.forEach((btn) => btn.classList.remove("active"));
//     tab.classList.add("active");

//     projectRows.forEach((row) => {
//       row.classList.remove("active");

//       if (row.getAttribute("data-content") === target) {
//         row.classList.add("active");
//       }
//     });
//   });
// });












const projectTabs = document.querySelectorAll(".project-tab");
const projectSliders = document.querySelectorAll(".project-slider");

function getProjectVisibleCards() {
  return window.innerWidth <= 650 ? 1 : 2;
}

function updateProjectSlider(slider) {
  const track = slider.querySelector(".project-track");
  const cards = slider.querySelectorAll(".project-card");
  const currentIndex = Number(slider.dataset.index || 0);
  const gap = parseInt(getComputedStyle(track).gap) || 0;
  const cardWidth = cards[0].offsetWidth;
  const maxIndex = Math.max(0, cards.length - getProjectVisibleCards());
  const fixedIndex = Math.min(currentIndex, maxIndex);

  slider.dataset.index = fixedIndex;
  track.style.transform = `translateX(-${fixedIndex * (cardWidth + gap)}px)`;
}

projectTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.tab;

    projectTabs.forEach((btn) => btn.classList.remove("active"));
    tab.classList.add("active");

    projectSliders.forEach((slider) => {
      slider.classList.remove("active");

      if (slider.dataset.content === target) {
        slider.classList.add("active");
        updateProjectSlider(slider);
      }
    });
  });
});

projectSliders.forEach((slider) => {
  slider.dataset.index = 0;

  const prev = slider.querySelector(".project-prev");
  const next = slider.querySelector(".project-next");
  const cards = slider.querySelectorAll(".project-card");

  next.addEventListener("click", () => {
    const maxIndex = Math.max(0, cards.length - getProjectVisibleCards());
    let index = Number(slider.dataset.index || 0);

    index = index >= maxIndex ? 0 : index + 1;
    slider.dataset.index = index;

    updateProjectSlider(slider);
  });

  prev.addEventListener("click", () => {
    const maxIndex = Math.max(0, cards.length - getProjectVisibleCards());
    let index = Number(slider.dataset.index || 0);

    index = index <= 0 ? maxIndex : index - 1;
    slider.dataset.index = index;

    updateProjectSlider(slider);
  });
});

window.addEventListener("resize", () => {
  projectSliders.forEach(updateProjectSlider);
});

projectSliders.forEach(updateProjectSlider);










// popup form js
document.addEventListener("DOMContentLoaded", function () {
  const popup = document.getElementById("contactPopup");
  const popupOpenBtns = document.querySelectorAll(".open-popup");
  const popupClose = document.querySelector(".popup-close");

  if (!popup) return;

  popupOpenBtns.forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      popup.classList.add("show");
      document.body.classList.add("popup-active");
    });
  });

  if (popupClose) {
    popupClose.addEventListener("click", function () {
      popup.classList.remove("show");
      document.body.classList.remove("popup-active");
    });
  }

  popup.addEventListener("click", function (e) {
    if (e.target === popup) {
      popup.classList.remove("show");
      document.body.classList.remove("popup-active");
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      popup.classList.remove("show");
      document.body.classList.remove("popup-active");
    }
  });
});