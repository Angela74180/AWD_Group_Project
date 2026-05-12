function makeBookmark() {
    let bookmark = document.createElement("i");
    bookmark.setAttribute("class", "bi bi-bookmark");
    bookmark.setAttribute("onclick", "addBookmark(event)");


    return bookmark;
}

function addBookmark(bookmark) {
    let recipe_id = bookmark.target.parentElement.getAttribute("recipe_id");
    let user_id = document.getElementById("recipe_banner_div").getAttribute("user_id");

    fetch("/updateBookmark", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ recipe_id: recipe_id, user_id: user_id, bookmark_status: "on"})
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


function removeBookmark(bookmark) {

    let recipe_id = bookmark.target.parentElement.getAttribute("recipe_id");
    let user_id = document.getElementById("recipe_banner_div").getAttribute("user_id");

    fetch("/updateBookmark", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ recipe_id: recipe_id, user_id: user_id, bookmark_status: "off"})
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