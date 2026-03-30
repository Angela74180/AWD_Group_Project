function previewRecipe() {
  let previewPage = document.open("", "Recipe Preview", "width=600,height=400");
  previewPage.document.write("<html><head><title>Recipe Preview</title></head><body>");
  previewPage.document.write("<h1>" + document.getElementById("recipeName").value + "</h1>");

  let estimatedHours = document.getElementById("estimatedHours").value;
  let estimatedMins = document.getElementById("estimatedMins").value;
  if (estimatedMins >= 60) {
    estimatedHours =  parseInt(estimatedHours) + 1;
    estimatedMins = parseInt(estimatedMins) - 60;
  }
  previewPage.document.write("Estimated Cooking Time: ");
  if (estimatedHours == 1) {
    previewPage.document.write("<b>" + estimatedHours + " hour</b>");
  }
  else if (estimatedHours > 1) {
    previewPage.document.write("<b>" + estimatedHours + " hours</b>");
  }
  if (estimatedHours > 0 && estimatedMins > 0) {
    previewPage.document.write("<b> and </b>");
  }
  if (estimatedMins == 1) {
    previewPage.document.write("<b>" + estimatedMins + " minute</b>");
  }
  else if (estimatedMins > 1) {
    previewPage.document.write("<b>" + estimatedMins + " minutes</b>");
  }

  previewPage.document.write("<br>");
  previewPage.document.write(document.getElementById("Description").value);

  previewPage.document.write("<br>");
  previewPage.document.write("<h3>Ingredients:</h3>");



  let units = document.getElementById("ingredientUnits1").value;
  previewPage.document.write("- ")

  // To Taste does not get a quantity
  if (units != '"To Taste"') {
    previewPage.document.write(document.getElementById("ingredientQuantity1").value);
  }

  // Units of measurement directly follow the quantity
  if (units[0] != '"') {
    previewPage.document.write(units)
  }
  // If the unit is whole or to taste, we do not state this here
  else if (units != '"Whole"' && units != '"To Taste"') {
    previewPage.document.write(" " + units)
  }

  previewPage.document.write(" " + document.getElementById("ingredientName1").value);

  // To Taste is stated after the ingredient
  if (units == '"To Taste"') {
    previewPage.document.write(" to taste");
  }

  previewPage.document.write("<br>");




  units = document.getElementById("ingredientUnits2").value;
  previewPage.document.write("- ")

  // To Taste does not get a quantity
  if (units != '"To Taste"') {
    previewPage.document.write(document.getElementById("ingredientQuantity2").value);
  }

  // Units of measurement directly follow the quantity
  if (units[0] != '"') {
    previewPage.document.write(units)
  }
  // If the unit is whole or to taste, we do not state this here
  else if (units != '"Whole"' && units != '"To Taste"') {
    previewPage.document.write(" " + units)
  }

  previewPage.document.write(" " + document.getElementById("ingredientName2").value);

  // To Taste is stated after the ingredient
  if (units == '"To Taste"') {
    previewPage.document.write(" to taste");
  }

  previewPage.document.write("<br>");




  units = document.getElementById("ingredientUnits3").value;
  previewPage.document.write("- ")

  // To Taste does not get a quantity
  if (units != '"To Taste"') {
    previewPage.document.write(document.getElementById("ingredientQuantity3").value);
  }

  // Units of measurement directly follow the quantity
  if (units[0] != '"') {
    previewPage.document.write(units)
  }
  // If the unit is whole or to taste, we do not state this here
  else if (units != '"Whole"' && units != '"To Taste"') {
    previewPage.document.write(" " + units)
  }

  previewPage.document.write(" " + document.getElementById("ingredientName3").value);

  // To Taste is stated after the ingredient
  if (units == '"To Taste"') {
    previewPage.document.write(" to taste");
  }

  previewPage.document.write("<br>");




  units = document.getElementById("ingredientUnits4").value;
  previewPage.document.write("- ")

  // To Taste does not get a quantity
  if (units != '"To Taste"') {
    previewPage.document.write(document.getElementById("ingredientQuantity4").value);
  }

  // Units of measurement directly follow the quantity
  if (units[0] != '"') {
    previewPage.document.write(units)
  }
  // If the unit is whole or to taste, we do not state this here
  else if (units != '"Whole"' && units != '"To Taste"') {
    previewPage.document.write(" " + units)
  }

  previewPage.document.write(" " + document.getElementById("ingredientName4").value);

  // To Taste is stated after the ingredient
  if (units == '"To Taste"') {
    previewPage.document.write(" to taste");
  }

  previewPage.document.write("<br>");




  units = document.getElementById("ingredientUnits5").value;
  previewPage.document.write("- ")

  // To Taste does not get a quantity
  if (units != '"To Taste"') {
    previewPage.document.write(document.getElementById("ingredientQuantity5").value);
  }

  // Units of measurement directly follow the quantity
  if (units[0] != '"') {
    previewPage.document.write(units)
  }
  // If the unit is whole or to taste, we do not state this here
  else if (units != '"Whole"' && units != '"To Taste"') {
    previewPage.document.write(" " + units)
  }

  previewPage.document.write(" " + document.getElementById("ingredientName5").value);

  // To Taste is stated after the ingredient
  if (units == '"To Taste"') {
    previewPage.document.write(" to taste");
  }

  previewPage.document.write("<br>");

  previewPage.document.write("<br>");
  previewPage.document.write("<h3>Required Appliances:</h3>");

  previewPage.document.write("<br>");
  previewPage.document.write("<h3>Method:</h3>");

  previewPage.document.write("<br>");
  previewPage.document.write("<br>");
  previewPage.document.write("<br>");
  previewPage.document.write("<br>");
  previewPage.document.write("<br>");
  previewPage.document.write("<br>");
  previewPage.document.write("<br>");
}