document.addEventListener("DOMContentLoaded", function() {

  document.querySelectorAll(".eye-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const input = document.getElementById(btn.dataset.target);
      const showing = input.type === "password";
      input.type = showing ? "text" : "password";
      btn.textContent = showing ? "🙈" : "👁️";
    });
  });

});
