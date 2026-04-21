let appliance_id_counter = 0;

// document.addEventListener("DOMContentLoaded", addAppliance);

function chosenAppliance(appliance, extraData) {

    let details = appliance.parentElement.getElementsByTagName("div")[0];
    details.innerHTML = "";

    if (appliance.value == "Microwave") {
        details.innerHTML = `
        Wattage: <input type = "number" style="margin-top: 2%" placeholder = "(e.g 850, 1000, 1200)" min = "400" value = "${handleQuotes(extraData)}" required> W</input>
        `;
    }

    if (appliance.value == "Other") {
        details.innerHTML = `
        Appliance/Special Equipment Name: <input type = "text" style="margin-top: 2%" value = "${handleQuotes(extraData)}" required></input>
        `;
    }
}

function addAppliance(applianceDict) {
    appliance_id_counter++;

    let container = document.getElementById("Appliances");

    let newAppliance = document.createElement("fieldset");
    newAppliance.setAttribute("id", "appliance" + appliance_id_counter);
    newAppliance.setAttribute("class", "appliance");
    newAppliance.innerHTML = `
        <button type="button" class="btn btn-remove" onclick="removeAppliance(event)">- Remove</button>
        <input class="equipment_input" list="equipment" placeholder = "Appliance/Equipment" onchange="chosenAppliance(event.target, '')" value = "${handleQuotes(applianceDict["name"])}" required>
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
        <div id="applianceDetails"></div>
        <textarea placeholder="(Optional) Notes: 500 Character Limit" rows = "2" maxlength="500" style="margin-top: 2%">${handleQuotes(applianceDict["desc"])}</textarea>
    `;
    container.appendChild(newAppliance);

    chosenAppliance(newAppliance.getElementsByTagName("input")[0], applianceDict["extraData"]);
}

function removeAppliance(removeButton) {
    removeButton.target.parentElement.remove();
}

