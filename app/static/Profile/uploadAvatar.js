document.addEventListener("DOMContentLoaded", function() {

    let avatarClickTargets = ["avatarWrap", "uploadPhotoBtn", "avatarSmall"];
    for (let id of avatarClickTargets) {
        document.getElementById(id).addEventListener("click", () => document.getElementById("avatar-input").click());
    }

    document.getElementById("avatar-input").addEventListener("change", e => {
        let file = e.target.files[0];
        if (!file) return;

        if (file.size > 100 * 1024) {
            alert("Image must be under 100KB. Please choose a smaller image or compress it first.");
            document.getElementById("avatar-input").value = "";
            return;
        }

        let reader = new FileReader();
        reader.onload = ev => compressAndSync(ev.target.result);
        reader.readAsDataURL(file);

        document.getElementById("avatar-input").value = "";
    });

    function compressAndSync(imageData) {
        let img = new Image();
        img.onload = () => {
            let canvas = document.createElement("canvas");

            let maxSize = 256;
            let scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
            canvas.width  = img.width  * scale;
            canvas.height = img.height * scale;

            canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);

            let compressed = canvas.toDataURL("image/jpeg", 0.7);
            syncAvatars(compressed);
        };
        img.src = imageData;
    }

    function syncAvatars(imageData) {
        let avatarDisplay = document.getElementById("avatarDisplay");

        if (avatarDisplay) {
            if (avatarDisplay.tagName === "IMG") {
                avatarDisplay.src = imageData;
            } else {
                let img = document.createElement("img");
                img.src = imageData;
                img.id = "avatarDisplay";
                img.className = "avatar-display-img";
                img.alt = "Profile Picture";
                avatarDisplay.replaceWith(img);
            }
        }

        document.getElementById("avatarSmall").innerHTML = `<img src="${imageData}" class="avatar-small-img">`;

        fetch("/upload_avatar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ image: imageData })
        })
        .then(res => res.json())
        .then(data => { if (!data.success) alert("Failed to save photo: " + data.message); })
        .catch(() => alert("Something went wrong saving your photo."));
    }

});