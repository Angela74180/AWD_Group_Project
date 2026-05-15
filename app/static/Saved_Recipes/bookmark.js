// This function Creates an element that acts as a bookmark
function makeBookmark(bookmark_on) {
    let bookmark = document.createElement("i");

    if (bookmark_on){
        bookmark.setAttribute("class", "bi bi-bookmark-fill");
        bookmark.setAttribute("onclick", "removeBookmark(event)");
    }
    else{
        bookmark.setAttribute("class", "bi bi-bookmark");
        bookmark.setAttribute("onclick", "addBookmark(event)");
    }

    return bookmark;
}

// This function is triggered when someone adds a banner. It changes the element presented and updates the database
function addBookmark(bookmark) {
    let recipe_id = bookmark.target.parentElement.getAttribute("recipe_id");

    let csrfToken = document.querySelector('meta[name="csrf-token"]').content;

    fetch("/updateBookmark", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken
        },
        body: JSON.stringify({ recipe_id: recipe_id, bookmark_status: "on"})
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            bookmark.target.setAttribute("class", "bi bi-bookmark-fill");
            bookmark.target.setAttribute("onclick", "removeBookmark(event)");
        }
        else{
            alert("Bookmark Failed")
        }
    })
    .catch(error => {
        alert("Bookmark Failed");
    });
}

// This function is triggered when someone removes a banner. It changes the element presented and updates the database
function removeBookmark(bookmark) {

    let recipe_id = bookmark.target.parentElement.getAttribute("recipe_id");

    let csrfToken = document.querySelector('meta[name="csrf-token"]').content;

    fetch("/updateBookmark", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrfToken
        },
        body: JSON.stringify({ recipe_id: recipe_id, bookmark_status: "off"})
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            bookmark.target.setAttribute("class", "bi bi-bookmark");
            bookmark.target.setAttribute("onclick", "addBookmark(event)");
        }
        else{
            alert("Bookmark Failed")
        }
    })
    .catch(error => {
        alert("Bookmark Failed");
    });
}