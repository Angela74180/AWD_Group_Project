document.addEventListener("DOMContentLoaded", function() {

  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tab;
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      document.querySelectorAll(".tab-pane").forEach(p => {
        p.hidden = p.id !== `${target}-tab`;
      });
    });
  });

});
