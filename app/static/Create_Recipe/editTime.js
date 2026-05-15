// This function splits time into cooking and prep or combines thme into a total
function splitTime(timeDict){
    let container = document.getElementById("Time");

    if (document.getElementById("timeCheckbox").checked) {
        container.innerHTML = `
        <span style="display: inline-block; width: 90px; margin-top: 2%">Prep Time: </span><input name="prepHours" step="1" type = "number" min = "0" style="width: 60px; height: 25px; margin-bottom: 1%;" value = "${timeDict["prepTime"][0]}"> hour/s <input name="prepMins" step="1" type = "number" min = "0" style="width: 60px; height: 25px;" value = "${timeDict["prepTime"][1]}"> min/s
        <br>
        <span style="display: inline-block; width: 90px; margin-top: 1%">Cooking Time: </span><input name="cookHours" step="1" type = "number" min = "0" style="width: 60px; height: 25px;" value = "${timeDict["cookingTime"][0]}"> hour/s <input name="cookMins" step="1" type = "number" min = "0" style="width: 60px; height: 25px;" value = "${timeDict["cookingTime"][1]}"> min/s
        `;
    }
    else{
        container.innerHTML = `
        <span style="display: inline-block; width: 90px; margin-top: 2%">Total Time: </span><input name="totalHours" step="1" type = "number" min = "0" style="width: 60px; height: 25px;" value = "${timeDict["totalTime"][0]}"> hour/s <input name="totalMins" step="1" type = "number" min = "0" style="width: 60px; height: 25px;" value = "${timeDict["totalTime"][1]}"> min/s
        `;
    }

}