document.addEventListener("DOMContentLoaded", function() {

  const avatarInput= document.getElementById("avatar-input");
  const avatarWrap = document.getElementById("avatarWrap");
  const uploadPhotoBtn = document.getElementById("uploadPhotoBtn");
  const avatarSmall = document.getElementById("avatarSmall");
  let avatarDisplay = document.getElementById("avatarDisplay");

  [avatarWrap, uploadPhotoBtn, avatarSmall].forEach(el =>
    el.addEventListener("click", () => avatarInput.click())
  );

  function syncAvatars(imageData) {
    if (avatarDisplay) {
      if (avatarDisplay.tagName === "IMG") {
        avatarDisplay.src = imageData;
      } else {
        const img = Object.assign(document.createElement("img"), {
          src: imageData, id: "avatarDisplay",
          className: "avatar-display-img", alt: "Profile Picture"
        });
        avatarDisplay.replaceWith(img);
        avatarDisplay = document.getElementById("avatarDisplay");
      }
    }

    avatarSmall.innerHTML = `<img src="${imageData}" class="avatar-small-img">`;

    fetch("/upload_avatar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: imageData })
    })
    .then(res => res.json())
    .then(data => { if (!data.success) alert("Failed to save photo: " + data.message); })
    .catch(() => alert("Something went wrong saving your photo."));
  }

  avatarInput.addEventListener("change", e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => syncAvatars(ev.target.result);
    reader.readAsDataURL(file);
    avatarInput.value = "";
  });

});
