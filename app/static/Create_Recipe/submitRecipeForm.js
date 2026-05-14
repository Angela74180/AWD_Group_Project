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


    



    // DO COVER PHOTO

    // // Ingredients
    // // Format = [ingredientName, ingredientQuantity, ingredientUnits, ingredientDescription]
    // let ingredientList = [];
    // for (ingredient of document.getElementById("Ingredients").childNodes){
    //     let ingredientDetails = [];

    //     if (ingredient.childNodes[3].value == "") {
    //         alert("Your ingredient needs name");
    //         return false;
    //     }
    //     if (ingredient.childNodes[5].value == "" && ingredient.childNodes[7].value != '"To Taste"') {
    //         alert("Your ingredient needs a quantity");
    //         return false;
    //     }
    //     if (ingredient.childNodes[7].value != "") {
    //         alert("Your ingredient needs units");
    //         return false;
    //     }

    //     ingredientDetails.push(ingredient.childNodes[3].value);
    //     ingredientDetails.push(ingredient.childNodes[5].value);
    //     ingredientDetails.push(ingredient.childNodes[7].value);
    //     ingredientDetails.push(ingredient.childNodes[13].value);

    //     ingredientList.push(ingredientDetails);

    //     alert(ingredient.childNodes[7]);

    // }


    // if (ingredientList.length == 0) {
    //     alert("Your recipe must have at least 1 ingredient");
    //     return false;
    // }



    // console.log(tagList);

    // console.log(ingredientList);

    alert("Recipe has successfully been published");
    return true;
}



























// function getRecipeInfo(){
//     let recipe_details_dict = {}



//     // FIX THIS PLEASE ANG?????????????????
//     recipe_details_dict["recipeCoverImage"] = "";


//     let ingredients = [];
//     for (ingredient of document.getElementById("Ingredients").childNodes){
//         ingredients.push({"name": ingredient.getElementsByTagName("input")[0].value, "quantity": ingredient.getElementsByTagName("input")[1].value, "units": ingredient.getElementsByTagName("input")[2].value, "desc": ingredient.getElementsByTagName("textarea")[0].value});
//     }
//     recipe_details_dict["ingredients"] = ingredients;

//     let appliances = [];
//     for (appliance of document.getElementById("Appliances").childNodes){
//         let name = appliance.getElementsByTagName("input")[0].value;
//         let desc = appliance.getElementsByTagName("textarea")[0].value;
//         let extraData = ""
//         if (name == "Microwave" || name == "Other"){
//             extraData = appliance.getElementsByTagName("div")[0].getElementsByTagName("input")[0].value;
//         }
//         appliances.push({"name": name, "extraData": extraData, "desc": desc})
//     }
//     recipe_details_dict["appliances"] = appliances;

//     let steps = [];
//     for (step of document.getElementById("Steps").childNodes){
//         steps.push({"name": step.getElementsByTagName("input")[0].value, "desc": step.getElementsByTagName("textarea")[0].value})
//     }
//     recipe_details_dict["steps"] = steps;

//     console.log(recipe_details_dict);
//     return recipe_details_dict;
// }