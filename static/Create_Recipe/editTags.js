let tag_id_counter = 0;

// document.addEventListener("DOMContentLoaded", addTag);

function addTag() {
    tag_id_counter++;

    let container = document.getElementById("Tags");

    let newTag = document.createElement("fieldset");
    newTag.setAttribute("id", "tag" + tag_id_counter);
    newTag.setAttribute("class", "tag");
    newTag.innerHTML = `
        <button type="button" class="btn btn-remove" onclick="removeTag(event)">- Remove</button>
        # <input type="text" placeholder = "(e.g Gluten Free, High Protein)" required>
    `;

    container.appendChild(newTag);
}

function removeTag(removeButton) {
    removeButton.target.parentElement.remove();
}