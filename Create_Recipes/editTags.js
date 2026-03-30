let tag_id_counter = 0;
function addTag() {
    tag_id_counter++;

    const container = document.getElementById('Add_Tags');
    const row = document.createElement('div');

    row.id = "tag" + tag_id_counter;

    row.innerHTML = `
    <fieldset class="tag">
        <button type="button" class="btn btn-remove" onclick="removeTag()">- Remove</button>
        # <input id="tag${tag_id_counter}" type="text" placeholder = "(e.g Gluten Free, High Protein)" required>
    </fieldset>
    <br>
    `;
}
function removeTag() {
    tag_id_counter--;
}