document.addEventListener("DOMContentLoaded", function() {

    for (let btn of document.querySelectorAll(".eye-btn")) {
        btn.addEventListener("click", () => {
            let input = document.getElementById(btn.dataset.target);
            let showing = input.type === "password";
            input.type = showing ? "text" : "password";
            btn.textContent = showing ? "🙈" : "👁️";
        });
    }

});