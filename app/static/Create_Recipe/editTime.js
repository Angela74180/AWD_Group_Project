function splitTime(timeDict){
    let container = document.getElementById("Time");

    if (document.getElementById("timeCheckbox").checked) {
        container.innerHTML = `
        <span style="display: inline-block; width: 90px; margin-top: 2%">Prep Time: </span><input name="prepHours" type = "number" min = "0" style="width: 60px; height: 25px; margin-bottom: 1%;" value = "${timeDict["prepTime"][0]}"> hour/s <input name="prepMins" type = "number" min = "0" style="width: 60px; height: 25px;" value = "${timeDict["prepTime"][1]}"> min/s
        <br>
        <span style="display: inline-block; width: 90px; margin-top: 1%">Cooking Time: </span><input name="cookHours" type = "number" min = "0" style="width: 60px; height: 25px;" value = "${timeDict["cookingTime"][0]}"> hour/s <input name="cookMins" type = "number" min = "0" style="width: 60px; height: 25px;" value = "${timeDict["cookingTime"][1]}"> min/s
        `;
    }
    else{
        container.innerHTML = `
        <span style="display: inline-block; width: 90px; margin-top: 2%">Total Time: </span><input name="totalHours" type = "number" min = "0" style="width: 60px; height: 25px;" value = "${timeDict["totalTime"][0]}"> hour/s <input name="totalMins" type = "number" min = "0" style="width: 60px; height: 25px;" value = "${timeDict["totalTime"][1]}"> min/s
        `;
    }

}