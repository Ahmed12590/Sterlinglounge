

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
 






