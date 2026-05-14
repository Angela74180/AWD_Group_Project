document.addEventListener("DOMContentLoaded", function() {

    for (let btn of document.querySelectorAll(".tab-btn")) {
        btn.addEventListener("click", () => {
            for (let b of document.querySelectorAll(".tab-btn")) b.classList.remove("active");
            btn.classList.add("active");

            for (let pane of document.querySelectorAll(".tab-pane")) {
                pane.hidden = pane.id !== `${btn.dataset.tab}-tab`;
            }
        });
    }

});