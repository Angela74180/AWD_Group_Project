let ingredient_id_counter = 0;

// document.addEventListener("DOMContentLoaded", addIngredient);

function addIngredient() {
    ingredient_id_counter++;

    let container = document.getElementById("Ingredients");

    let newIngredient = document.createElement("fieldset");
    newIngredient.setAttribute("id", "ingredient" + ingredient_id_counter);
    newIngredient.setAttribute("class", "ingredient");
    newIngredient.innerHTML = `
        <button type="button" class="btn btn-remove" onclick="removeIngredient(event)">- Remove</button>
        <input type = "text" placeholder = "Ingredient Name" required> 
        <input type = "number" min = "0" placeholder = "Quantity (e.g 750, 0.25)">
        <input list="units" placeholder = "Units" required>
        <datalist id="units">
            <option value = '"Whole"'>(For ingredients that aren't to be divided, e.g eggs)</option>
            <option value = "mL">Millilitres</option>
            <option value = "L">Litres</option>
            <option value = "g">Grams</option>
            <option value = "kg">Kilograms</option>
            <option value = "fl oz">Fluid ounces</option>
            <option value = "oz">Ounces</option>
            <option value = "lb">Pound</option>
            <option value = "tsp">Teaspoon</option>
            <option value = "tbsp">Tablespoon</option>
            <option value = "Cup"></option>
            <option value = "Pint"></option>
            <option value = "Quart"></option>
            <option value = "Gallon"></option>
            <option value = '"Handfull"'></option>
            <option value = '"Pinch"'></option>
            <option value = '"Dash"'></option>
            <option value = '"Sprinkle"'></option>
            <option value = '"Splash"'></option>
            <option value = '"Stick"'></option>
            <option value = '"Pat"'></option>
            <option value = '"To Taste"'>(Quantity will not be included when published)</option>
        </datalist>
        <br>
        <textarea placeholder="(Optional) Notes: 500 Character Limit" rows = "2" maxlength="500" style="margin-top: 2%"></textarea>
    `;

    container.appendChild(newIngredient);
}

function removeIngredient(removeButton) {
    removeButton.target.parentElement.remove();
}