let step_id_counter = 0;

// document.addEventListener("DOMContentLoaded", addStep);

function addStep(stepDict){
    step_id_counter++;

    let container = document.getElementById("Steps");

    let step_num = container.children.length + 1;

    let newStep = document.createElement("fieldset");
    newStep.setAttribute("id", "step" + step_id_counter);
    newStep.setAttribute("class", "step");
    newStep.innerHTML = `
        <legend>Step ${step_num}</legend>
        <button type="button" class="btn btn-remove" onclick="removeStep(event)">- Remove</button>
        <input type = "text" placeholder = "Name Step (e.g Prep)" value = "${handleQuotes(stepDict["name"])}">
        <br>
        <textarea placeholder="500 Character Limit" rows = "2" maxlength="500" style="margin-top: 2%" required>${handleQuotes(stepDict["desc"])}</textarea>
        (Optional) Step Picture: <input type = "file" accept=".jpg, .png, .jpeg, .webp" onchange="validatePhoto(event.target)">
        <div></div>
    `;

    container.appendChild(newStep);
}

function removeStep(removeButton){
    removeButton.target.parentElement.remove();

    let container = document.getElementById("Steps");

    let step_num = 1;
    for (step of container.childNodes){
        step.querySelector("legend").innerText = "Step " + step_num;
        step_num++;
    }

}