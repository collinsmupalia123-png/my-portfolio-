// smooth fade-in animation
document.querySelectorAll(".section").forEach(section => {
  section.style.opacity = 0;
  section.style.transform = "translateY(30px)";

  window.addEventListener("scroll", () => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      section.style.opacity = 1;
      section.style.transform = "translateY(0)";
      section.style.transition = "0.8s ease";
    }
  });
});
