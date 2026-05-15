let tag_id_counter = 0;

// document.addEventListener("DOMContentLoaded", addTag);

// This function adds a new tag section to the create recipes page
function addTag(tagName) {
    tag_id_counter++;

    let container = document.getElementById("Tags");

    let newTag = document.createElement("fieldset");
    newTag.setAttribute("id", "tag" + tag_id_counter);
    newTag.setAttribute("class", "tag");
    newTag.innerHTML = `
        <button type="button" class="btn btn-remove" onclick="removeTag(event)">- Remove</button>
        # <input name="tagName" maxlength="80" type="text" placeholder = "(e.g Gluten Free, High Protein)" value = "${handleQuotes(tagName)}" required>
    `;

    container.appendChild(newTag);
}

// This function removes the selected tag div from the create recipes page
function removeTag(removeButton) {
    removeButton.target.parentElement.remove();
}

// This function adds a new tag input to the filter bar in the explore page
function makeFilterTag(){
    let line = document.createElement("div");
    let remove = document.createElement("button");
    remove.innerText = "-"
    remove.setAttribute("style", "border-color: #00000000; background-color: #00000000;");
    remove.setAttribute("onclick", "removeTag(event)");

    line.appendChild(remove);

    let input = document.createElement("input");
    input.setAttribute("style", "width: 130px");

    line.appendChild(input);

    document.getElementById("filter_tags").appendChild(line);
}
