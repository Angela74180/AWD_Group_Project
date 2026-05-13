document.addEventListener("DOMContentLoaded", function() {

  const nameViewRow = document.getElementById("nameViewRow");
  const nameEditRow = document.getElementById("nameEditRow");
  const nameDisplay = document.getElementById("nameDisplay");
  const nameInput = document.getElementById("nameInput");
  const nameEditBtn = document.getElementById("nameEditBtn");
  const nameSaveBtn = document.getElementById("nameSaveBtn");
  const nameCancelBtn = document.getElementById("nameCancelBtn");
  const nameSavedAlert = document.getElementById("nameSavedAlert");
  const headerName= document.getElementById("headerName");
  let savedTimer = null;

  nameEditBtn.addEventListener("click", () => {
    nameInput.value = currentName;
    nameViewRow.hidden = true;
    nameEditRow.hidden = false;
    nameInput.focus();
  });

  nameCancelBtn.addEventListener("click", () => {
    nameEditRow.hidden = true;
    nameViewRow.hidden = false;
  });

  nameSaveBtn.addEventListener("click", saveName);
  nameInput.addEventListener("keydown", e => { if (e.key === "Enter") saveName(); });

  function saveName() {
    const val = nameInput.value.trim();
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
        nameDisplay.textContent = val;
        headerName.textContent = val;
        nameEditRow.hidden = true;
        nameViewRow.hidden = false;
        nameSavedAlert.hidden = false;
        clearTimeout(savedTimer);
        savedTimer = setTimeout(() => { nameSavedAlert.hidden = true; }, 2000);
      } else {
        alert(data.message);
      }
    })
    .catch(() => alert("Something went wrong. Please try again."));
  }

});
