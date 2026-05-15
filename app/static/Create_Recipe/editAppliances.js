let appliance_id_counter = 0;

// document.addEventListener("DOMContentLoaded", addAppliance);

// This function displays the elements where the author has to add extra data
function chosenAppliance(appliance, extraData) {

    let details = appliance.parentElement.getElementsByTagName("div")[0];
    details.innerHTML = `<input name="extraData" type = "hidden" value = ""></input>`;

    if (appliance.value == "Microwave") {
        details.innerHTML = `
        Wattage: <input name="extraData" type = "number" style="margin-bottom: 2%" placeholder = "(e.g 850, 1000, 1200)" min = "400" value = "${handleQuotes(extraData)}" required> W</input>
        `;
    }

    if (appliance.value == "Other") {
        details.innerHTML = `
        Appliance/Special Equipment Name: <input name="extraData" type = "text" style="margin-bottom: 2%" value = "${handleQuotes(extraData)}" required></input>
        `;
    }
}

// This function adds a new appliance section to the create recipes page
function addAppliance(applianceDict) {
    appliance_id_counter++;

    let container = document.getElementById("Appliances");

    let newAppliance = document.createElement("fieldset");
    newAppliance.setAttribute("id", "appliance" + appliance_id_counter);
    newAppliance.setAttribute("class", "appliance");
    newAppliance.innerHTML = `
        <button type="button" class="btn btn-remove" onclick="removeAppliance(event)">- Remove</button>
        <input name="applianceName" maxlength="100" class="equipment_input" list="equipment" style="margin-bottom: 2%" placeholder = "Appliance/Equipment" onchange="chosenAppliance(event.target, '')" value = "${handleQuotes(applianceDict["name"])}" required>
        <datalist id="equipment">
            <option value = "Other"></option>
            <option value = "Oven"></option>
            <option value = "Stove"></option>
            <option value = "Microwave"></option>
            <option value = "Refrigerator"></option>
            <option value = "Freezer"></option>
            <option value = "Blender"></option>
            <option value = "Kettle"></option>
            <option value = "Toaster"></option>
            <option value = "Cutting Board"></option>
            <option value = "Mixer"></option>
            <option value = "BBQ Grill"></option>
            <option value = "Food Proccessor"></option>
            <option value = "Air Fryer"></option>
            <option value = "Slow Cooker"></option>
            <option value = "Deep Fryer"></option>
            <option value = "Coffee Grinder"></option>
            <option value = "Pressure Cooker"></option>
            <option value = "Rice Cooker"></option>
            <option value = "Sandwich Maker/Press"></option>
            <option value = "Waffle Maker"></option>
            <option value = "Juicer"></option>
            <option value = "Milk Frother"></option>
            <option value = "Ice Cream Maker"></option>
            <option value = "Bread Maker"></option>
            <option value = "Spiralizer"></option>
            <option value = "Pasta Maker"></option>
            <option value = "Sous Vide Cooker"></option>
            <option value = "Garlic Press"></option>
            <option value = "Meat Tenderizer"></option>
            <option value = "Sushi Roller"></option>
            <option value = "Kitchen Blowtorch"></option>
            <option value = "Thermometers"></option>
            <option value = "Digital Scales"></option>
        </datalist>
        <div id="applianceDetails"><input name="extraData" maxlength="100" type = "hidden" value = ""></input></div>
        <textarea name="applianceDescription"placeholder="(Optional) Notes: 500 Character Limit" rows = "2" maxlength="500">${handleQuotes(applianceDict["desc"])}</textarea>
    `;
    container.appendChild(newAppliance);

    chosenAppliance(newAppliance.getElementsByTagName("input")[0], applianceDict["extraData"]);
}

// This function removes the selected appliance div from the create recipes page
function removeAppliance(removeButton) {
    removeButton.target.parentElement.remove();
}

// This function adds a new appliance input to the filter bar in the explore page
function makeFilterAppliance(){
    let line = document.createElement("div");
    let remove = document.createElement("button");
    remove.innerText = "-"
    remove.setAttribute("style", "border-color: #00000000; background-color: #00000000;");
    remove.setAttribute("onclick", "removeAppliance(event)");

    line.appendChild(remove);

    let input = document.createElement("input");
    input.setAttribute("style", "width: 130px");

    line.appendChild(input);

    document.getElementById("filter_appliances").appendChild(line);
}

