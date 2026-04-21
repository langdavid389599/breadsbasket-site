const currentPage = document.body.dataset.page;

document.querySelectorAll("[data-nav]").forEach((link) => {
  if (link.dataset.nav === currentPage) {
    link.classList.add("is-active");
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
