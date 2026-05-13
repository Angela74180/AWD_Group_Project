document.addEventListener("DOMContentLoaded", function() {

  const pwCurrent= document.getElementById("pwCurrent");
  const pwNext = document.getElementById("pwNext");
  const pwConfirm = document.getElementById("pwConfirm");
  const pwSaveBtn= document.getElementById("pwSaveBtn");
  const pwSuccess = document.getElementById("pwSuccess");
  const pwMismatch = document.getElementById("pwMismatch");
  let successTimer = null;

  function validate() {
    const mismatch = pwNext.value && pwConfirm.value && pwNext.value !== pwConfirm.value;
    pwMismatch.hidden = !mismatch;
    pwSaveBtn.disabled = !(pwCurrent.value && pwNext.value && pwConfirm.value && !mismatch);
  }

  [pwCurrent, pwNext, pwConfirm].forEach(el => el.addEventListener("input", validate));

  pwSaveBtn.addEventListener("click", () => {
    fetch("/update_password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ current: pwCurrent.value, new: pwNext.value })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        pwCurrent.value = pwNext.value = pwConfirm.value = "";
        validate();
        pwSuccess.hidden = false;
        clearTimeout(successTimer);
        successTimer = setTimeout(() => { pwSuccess.hidden = true; }, 3000);
      } else {
        alert(data.message);
      }
    })
    .catch(() => alert("Something went wrong. Please try again."));
  });

});
