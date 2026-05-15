// This function creates a shopping list of all the ingredients in the selected recipes
function makeShoppingList(){
    ingredient_dict = {}

    for (let recipe of ingredients_list){
        for (let ingredient of recipe){

            let ingredient_sentence = "- ";

            ingredient_sentence += ingredient["quantity"];

            // Units of measurement directly follow the quantity
            if (["mL", "L", "g", "kg", "fl oz", "oz", "lb"].includes(ingredient["units"])) {
                ingredient_sentence += ingredient["units"];
            }
            // If the unit is whole or to taste, we do not state this here
            else if (ingredient["units"] != '"Whole"' && ingredient["units"] != '"To Taste"') {
                ingredient_sentence += " " + ingredient["units"];
            }

            if (ingredient["desc"] != "") {
                ingredient_sentence +="  (" + ingredient["desc"] + ")";
            }


            //Add it to the dict
            if (ingredient["name"] in ingredient_dict){
                ingredient_dict[ingredient["name"]].push(ingredient_sentence);
            }
            else{
                ingredient_dict[ingredient["name"]] = [ingredient_sentence];
            }
        }
    }

    let shoppingPage = window.open("", "Shopping List");
    shoppingPage.document.body.innerHTML = "";
    shoppingPage.document.write('<html><head>');
    shoppingPage.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">');
    shoppingPage.document.write('<link rel="stylesheet" href="/static/custom.css">');
    shoppingPage.document.write('</head><body><div style="margin: 2%">');
    shoppingPage.document.write('<h1> ~ Shopping List ~ </h1>');
    shoppingPage.document.write("<br>");

    for (let ingredient_type in ingredient_dict) {
        shoppingPage.document.write("<h4>&nbsp;&nbsp;" + ingredient_type + "</h4>");
        for (let sentence of ingredient_dict[ingredient_type]){
            shoppingPage.document.write("<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + sentence + "</p>");
        }
        shoppingPage.document.write("<br>");
    }

    shoppingPage.document.write('</div></body></html>');
}