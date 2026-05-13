function makeShoppingList(){
    let previewPage = window.open("", "Recipe Preview");
    previewPage.document.body.innerHTML = "";
    previewPage.document.write('<h1> ~ Shopping List ~ </h1>');
}