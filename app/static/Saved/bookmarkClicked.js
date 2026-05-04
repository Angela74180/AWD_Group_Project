function addBookmark(bookmark) {
    bookmark.target.setAttribute("class", "bi bi-bookmark-fill");
    bookmark.target.setAttribute("onclick", "removeBookmark(event)");
}

function removeBookmark(bookmark) {
    bookmark.target.setAttribute("class", "bi bi-bookmark");
    bookmark.target.setAttribute("onclick", "addBookmark(event)");
}