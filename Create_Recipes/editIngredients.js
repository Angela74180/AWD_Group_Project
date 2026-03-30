let ingredient_id_counter = 0;
function addIngredient() {
    let ingredients_list = document.getElementsByClassName("ingredient");
    let ingredient_num = ingredients_list.length + 1
    ingredient_id_counter++;

    const container = document.getElementById('Add_Ingredients');
    const row = document.createElement('div');

    row.id = "ingredient" + ingredient_id_counter;

    row.innerHTML = `
    <fieldset class="ingredient">
        <button type="button" class="btn btn-remove" onclick="removeIngredient('${row.id}')">- Remove</button>
        <legend class = "ingredient_num">Ingredient ${ingredient_num}:</legend>
        <input id="ingredientName${ingredient_id_counter}" type = "text" placeholder = "Ingredient Name" required> 
        <input id="ingredientQuantity${ingredient_id_counter}" type = "number" min = "0" placeholder = "Quantity (e.g 750, 0.25)" required>
        <input id="ingredientUnits${ingredient_id_counter}" list="units" placeholder = "Units" required>
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
        <textarea name = "notes${ingredient_id_counter}" rows="1" cols="45" placeholder="Notes (optional)"></textarea>
    </fieldset> 
    <br>
    `;
    container.appendChild(row);

}
function removeIngredient(rowId) {
    document.getElementById(rowId).remove();

    let ingredients_list = document.getElementsByClassName("ingredient");
    let counter = 0;

    for (let ingredient of ingredients_list) {
        counter++;
        ingredient.getElementsByClassName("ingredient_num")[0].innerText = "Ingredient " + counter + ":";
    }
}