function validatePhoto(photo) {
    let photo_div = photo.nextElementSibling;
    photo_div.innerHTML = "";

    if (photo.value != "") {

        // .jpg, .png, .jpeg, .webp

        // Read and display the image
        let reader = new FileReader();
        let image = document.createElement("img");
        let source = "";

        reader.onload = function (e) {
            image.setAttribute("src", e.target.result);
            image.setAttribute("class", "preview_image");
            // preview.src = e.target.result; // Set image source to base64 data
        };

        reader.onerror = function () {
            alert('Error reading file.');
        };

        reader.readAsDataURL(photo.files[0]); // Convert file to base64 string

        photo_div.appendChild(image);

    }
}

// function showPhoto() {

// }