// This function validates and displays a photo in create recipe
function validatePhoto(photo) {
    let photo_div = photo.nextElementSibling;
    photo_div.innerHTML = "";

    if (photo.value != "") {

        // Read and display the image
        let reader = new FileReader();
        let image = document.createElement("img");
        let source = "";

        reader.onload = function (e) {
            // Restrict image size to 100k (AKA 136K in base 64 format)
            if (e.target.result.length > 136000){
                alert("The image selected is too large. Images must be less than 100K");
                photo.value = "";
            }
            else{
                image.setAttribute("src", e.target.result);
                image.setAttribute("class", "preview_image");
                photo_div.nextElementSibling.value = e.target.result;
            }
        };

        reader.onerror = function () {
            alert('Error reading file.');
        };

        let file_extension = photo.value.split('.').pop();
        if (file_extension != "jpg" && file_extension != "png" && file_extension != "jpeg" && file_extension != "webp"){
            alert("The image must be a .jpg, .jpeg, .png or a .webp");
            photo.value = "";
            return;
        }

        reader.readAsDataURL(photo.files[0]); // Convert file to base64 string

        photo_div.appendChild(image);

    }
}

// function showPhoto() {

// }