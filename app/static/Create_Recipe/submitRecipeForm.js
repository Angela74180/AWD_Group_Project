function handleRecipeForm() {
    //Time
    let time_split = document.getElementById("timeCheckbox").checked;
    let times = document.getElementById("Time").getElementsByTagName("input");
    let total_time = 0;
    // If there is no value in a input it sets the time there to 0
    for (let i = 0; i < times.length; i++){
        if (times[i].value == ""){
            times[i].value = "0";
        }
        total_time += Number(times[i].value);
    }

    if (total_time == 0){
        alert("A recipe must take a minimum of 1 minute");
        times[times.length - 1].focus(); 
        return false;
    }

    //Description
    let description = document.getElementById("Description").value;

    if (!description){
        alert("A recipe must have a description");
        document.getElementById("Description").focus(); 
        return false;
    }


    // I am not validating the Units in ingredient as there may be units that I haven't included that you need to use

    //Ingredients
    let ingredients = document.getElementById("Ingredients").childNodes
    if (ingredients.length == 0){
        alert("Your recipe must have at least 1 ingredient.");
        return false;
    }
    

    //Steps
    let steps = document.getElementById("Steps").childNodes
    if (steps.length == 0){
        alert("Your recipe must have at least 1 Step.");
        return false;
    }

    ///////////////////////////////////////VALIDATE PHOTOS!!!!11

    return true;
}

