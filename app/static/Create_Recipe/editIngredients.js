let ingredient_id_counter = 0;

// document.addEventListener("DOMContentLoaded", addIngredient);

function addIngredient(ingredientDict) {
    ingredient_id_counter++;

    let container = document.getElementById("Ingredients");

    let newIngredient = document.createElement("fieldset");
    newIngredient.setAttribute("id", "ingredient" + ingredient_id_counter);
    newIngredient.setAttribute("class", "ingredient");
    newIngredient.innerHTML = `
        <button type="button" class="btn btn-remove" onclick="removeIngredient(event)">- Remove</button>
        <input name="ingredientName" maxlength="50" type = "text" style="margin-bottom: 2%" placeholder = "Ingredient Name" value = "${handleQuotes(ingredientDict["name"])}" required> 
        <input name="ingredientQuantity" type = "number" step="0.001" style="width: 100px; margin-bottom: 2%" min = "0" placeholder = "Quantity (e.g 750, 0.25)" value = "${ingredientDict["quantity"]}" required>
        <input name="ingredientUnits" list="units" style="width: 100px; margin-bottom: 2%" placeholder = "Units" value = "${handleQuotes(ingredientDict["units"])}" required>
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
            <option value = '"Tin"'></option>
            <option value = '"Handfull"'></option>
            <option value = '"Pinch"'></option>
            <option value = '"Dash"'></option>
            <option value = '"Sprinkle"'></option>
            <option value = '"Drizzle"'></option>
            <option value = '"Splash"'></option>
            <option value = '"Stick"'></option>
            <option value = '"Pat"'></option>
            <option value = '"Slices"'></option>
            <option value = '"To Taste"'>(Quantity will not be included when published)</option>
        </datalist>
        <br>
        <textarea name="ingredientDescription" placeholder="(Optional) Notes: 500 Character Limit" rows = "2" maxlength="500">${handleQuotes(ingredientDict["desc"])}</textarea>
    `;

    container.appendChild(newIngredient);
}

function removeIngredient(removeButton) {
    removeButton.target.parentElement.remove();
}


function makeFilterIngredient(){
    let line = document.createElement("div");
    let remove = document.createElement("button");
    remove.innerText = "-"
    remove.setAttribute("style", "border-color: #00000000; background-color: #00000000;");
    remove.setAttribute("onclick", "removeIngredient(event)");

    line.appendChild(remove);

    let input = document.createElement("input");
    input.setAttribute("style", "width: 130px");

    line.appendChild(input);

    document.getElementById("filter_ingredients").appendChild(line);
}