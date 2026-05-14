document.addEventListener("DOMContentLoaded", function() {

    let successTimer = null;

    function validate() {
        let pwNext = document.getElementById("pwNext").value;
        let pwConfirm = document.getElementById("pwConfirm").value;
        let mismatch = pwNext && pwConfirm && pwNext !== pwConfirm;

        document.getElementById("pwMismatch").hidden = !mismatch;
        document.getElementById("pwSaveBtn").disabled = !(
            document.getElementById("pwCurrent").value && pwNext && pwConfirm && !mismatch
        );
    }

    for (let el of document.querySelectorAll("#pwCurrent, #pwNext, #pwConfirm")) {
        el.addEventListener("input", validate);
    }

    document.getElementById("pwSaveBtn").addEventListener("click", () => {
        fetch("/update_password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                current: document.getElementById("pwCurrent").value,
                new: document.getElementById("pwNext").value
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                document.getElementById("pwCurrent").value = "";
                document.getElementById("pwNext").value = "";
                document.getElementById("pwConfirm").value = "";
                validate();
                document.getElementById("pwSuccess").hidden = false;
                clearTimeout(successTimer);
                successTimer = setTimeout(() => { document.getElementById("pwSuccess").hidden = true; }, 3000);
            } else {
                alert(data.message);
            }
        })
        .catch(() => alert("Something went wrong. Please try again."));
    });

});