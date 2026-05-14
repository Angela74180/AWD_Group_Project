document.addEventListener("DOMContentLoaded", function() {

    let savedTimer = null;

    document.getElementById("nameEditBtn").addEventListener("click", () => {
        document.getElementById("nameInput").value = currentName;
        document.getElementById("nameViewRow").hidden = true;
        document.getElementById("nameEditRow").hidden = false;
        document.getElementById("nameInput").focus();
    });

    document.getElementById("nameCancelBtn").addEventListener("click", () => {
        document.getElementById("nameEditRow").hidden = true;
        document.getElementById("nameViewRow").hidden = false;
    });

    document.getElementById("nameSaveBtn").addEventListener("click", saveName);
    document.getElementById("nameInput").addEventListener("keydown", e => { if (e.key === "Enter") saveName(); });

    function saveName() {
        let val = document.getElementById("nameInput").value.trim();
        if (!val) return;

        fetch("/update_username", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username: val })
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                currentName = val;
                document.getElementById("nameDisplay").textContent = val;
                document.getElementById("headerName").textContent = val;
                document.getElementById("nameEditRow").hidden = true;
                document.getElementById("nameViewRow").hidden = false;
                document.getElementById("nameSavedAlert").hidden = false;
                clearTimeout(savedTimer);
                savedTimer = setTimeout(() => { document.getElementById("nameSavedAlert").hidden = true; }, 2000);
            } else {
                alert(data.message);
            }
        })
        .catch(() => alert("Something went wrong. Please try again."));
    }

});