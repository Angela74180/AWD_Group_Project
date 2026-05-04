function previewRecipe() {
  let previewPage = window.open("", "Recipe Preview");

  // Make page initially empty so that if there was already content there from a previous call, it is removed
  previewPage.document.body.innerHTML = "";

  previewPage.document.write('<html><head>');
  previewPage.document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">');
  previewPage.document.write('<link rel="stylesheet" href="/static/custom.css">');
  previewPage.document.write('</head><body>');
  // previewPage.document.write(`
  //   <nav class="navbar">
  //       <div class="logo">CookBook</div>
  //       <ul class="nav-links">
  //           <li><a href="index.html">Home</a></li>
  //           <li><a href="explore.html">Explore</a></li>
  //           <li><a href="my-recipes.html">My Recipes</a></li>
  //           <li><a href="saved.html">Saved</a></li>
  //           <li><a href="mykitchen.html">MyKitchen</a></li>
  //           <li><a href="profile.html">Profile</a></li>
  //       </ul>
  //   </nav>`
  // );
    
  previewPage.document.write('<div class = "div_main">');

  let recipe_details_dict = getRecipeInfo()

  // Recipe Name
  previewPage.document.write('<h1 style="border-bottom: 0px;"> ~ ' + recipe_details_dict["recipeName"] + ' ~ </h1>');

  // Author
  previewPage.document.write('<p>- '+ recipe_details_dict["author"] +'</p>');

  // Tags
  if (recipe_details_dict["tagList"].length > 0) {
    for (tag of recipe_details_dict["tagList"]){
      previewPage.document.write('<button type="button" class="btn btn-tag"> # ' + tag + '</button>');
    }
  }
  previewPage.document.write('<br><br>');
  

  // Time
  let timing = "<b> ";
  // If the time has been split into prep and cook time
  if (recipe_details_dict["timeSplit"]){
    timing += calcTime(recipe_details_dict["timeList"]["totalTime"][0], recipe_details_dict["timeList"]["totalTime"][1]) + "</b>, with an estimated " + calcTime(recipe_details_dict["timeList"]["prepTime"][0], recipe_details_dict["timeList"]["prepTime"][1]) + " of prep time and " + calcTime(recipe_details_dict["timeList"]["cookingTime"][0], recipe_details_dict["timeList"]["cookingTime"][1]) + " of cooking time";
    }
    else{
      timing += calcTime(recipe_details_dict["timeList"]["totalTime"][0], recipe_details_dict["timeList"]["totalTime"][1]) + "</b>";
    }
  timing += ".";
  previewPage.document.write('<p>A <b>' + recipe_details_dict["recipeDifficulty"] + ' ' + recipe_details_dict["recipeType"] + '</b> recipe that is estimated to take a total of' + timing + '</p>');

  // Description
  previewPage.document.write(recipe_details_dict["recipeDescription"]);

  // Photo
  previewPage.document.write("<br><br><p>COVER PHOTO GOES HERE</p>" + recipe_details_dict["recipeCoverImage"]);

  // Ingredients
  previewPage.document.write("<br><br><br>");
  previewPage.document.write("<h3>Ingredients:</h3>");
  for (ingredient of recipe_details_dict["ingredients"]){
    let ingredientName = ingredient["name"];
    let ingredientQuantity = ingredient["quantity"];
    let ingredientUnits = ingredient["units"];
    let ingredientDescription = ingredient["desc"];

    previewPage.document.write("&nbsp;&nbsp;&nbsp;&nbsp;- ");

    // To Taste does not get a quantity
    if (ingredientUnits != '"To Taste"') {
      previewPage.document.write(ingredientQuantity);
    }

    // Units of measurement directly follow the quantity
    if (["mL", "L", "g", "kg", "fl oz", "oz", "lb"].includes(ingredientUnits)) {
      previewPage.document.write(ingredientUnits)
    }
    // If the unit is whole or to taste, we do not state this here
    else if (ingredientUnits != '"Whole"' && ingredientUnits != '"To Taste"') {
      previewPage.document.write(" " + ingredientUnits)
    }

    // State the Ingredient Name
    previewPage.document.write(" " + ingredientName);

    // To Taste is stated after the ingredient
    if (ingredientUnits == '"To Taste"') {
      previewPage.document.write(" to taste");
    }

    if (ingredientDescription != "") {
      previewPage.document.write("&nbsp;&nbsp;(" + ingredientDescription + ")");
    }

    previewPage.document.write("<br>");
  }

  // Appliances
  if (recipe_details_dict["appliances"].length > 0){
    previewPage.document.write("<br><br><br>");
    previewPage.document.write("<h3>Appliances/Special Equipment:</h3>");
  }
  for (appliance of recipe_details_dict["appliances"]){

    previewPage.document.write("&nbsp;&nbsp;&nbsp;&nbsp;- ");

    if (appliance["name"] != "Other") {
      previewPage.document.write(appliance["name"]);
    }
    else {
      previewPage.document.write(appliance["extraData"]);
    }

    // If there is a microwave we need to include the wattage as well as any other notes
    if (appliance["name"] == "Microwave") {
      previewPage.document.write("&nbsp;&nbsp;(Recipe uses a " + appliance["extraData"] + " W microwave.");
      if (appliance["desc"] != "") {
        previewPage.document.write(" " + appliance["desc"]);
      }
      previewPage.document.write(")");
    }

    if (appliance["desc"] != "" && appliance["name"] != "Microwave") {
      previewPage.document.write("&nbsp;&nbsp;(");
      previewPage.document.write(appliance["desc"] + ")");
    }

    previewPage.document.write("<br>");
  }

  // Method
  previewPage.document.write("<br><br><br>");
  previewPage.document.write("<h3>Method</h3>");
  let step_num = 1;
  for (step of recipe_details_dict["steps"]){

    previewPage.document.write("<h5>Step " + step_num + ":");
    //Add the step name if there is one
    if (step["name"] != "") {
      previewPage.document.write("&nbsp;&nbsp;(" + step["name"] + ")");
    }
    previewPage.document.write("</h5>");

    previewPage.document.write("&nbsp;&nbsp;&nbsp;&nbsp;- " + step["desc"]);

    previewPage.document.write("<p>PHOTO == NUM 11</p>");

    step_num++;
  }


  previewPage.document.write('</div></body></html>');
}