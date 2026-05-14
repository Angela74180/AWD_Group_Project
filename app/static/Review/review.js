document.addEventListener("DOMContentLoaded", () => {
    injectModal();
    injectReviewsSection();
    setupStars();
    loadReviews();
});


function injectModal() {
    let modal = document.createElement("div");
    modal.id = "reviewModal";
    modal.className = "review-modal";

    let box = document.createElement("div");
    box.className = "review-modal-box";

    box.innerHTML = `
        <button class="review-modal-close" onclick="closeReviewModal()">&times;</button>

        <h5 id="reviewModalTitle" class="review-modal-title">Leave a Review</h5>

        <div id="ratingSection" class="review-modal-section">
            <label class="review-modal-label">Rating</label>
            <div id="starRow" class="review-star-row">
                <span class="star" data-val="1">&#9733;</span>
                <span class="star" data-val="2">&#9733;</span>
                <span class="star" data-val="3">&#9733;</span>
                <span class="star" data-val="4">&#9733;</span>
                <span class="star" data-val="5">&#9733;</span>
            </div>
            <input type="hidden" id="ratingValue" value="0">
        </div>

        <div id="reviewSection" class="review-modal-section">
            <label for="reviewText" class="review-modal-label">Your Review</label>
            <textarea id="reviewText" class="review-modal-textarea" rows="4" placeholder="Share your thoughts about this recipe..."></textarea>
        </div>

        <div class="review-modal-actions">
            <button onclick="closeReviewModal()" class="btn btn-secondary btn-sm">Cancel</button>
            <button onclick="submitReview()" class="btn btn-primary btn-sm">Submit</button>
        </div>
    `;

    modal.appendChild(box);
    document.body.appendChild(modal);

    modal.addEventListener("click", e => { if (e.target === modal) closeReviewModal(); });
}


function injectReviewsSection() {
    let divMain = document.querySelector(".div_main");
    if (!divMain || document.getElementById("reviewsSection")) return;

    let section = document.createElement("div");
    section.id = "reviewsSection";
    section.className = "reviews-section";
    section.innerHTML = `<h3>Reviews</h3><div id="reviewsList"></div>`;

    divMain.appendChild(section);
}


function getRecipeId() {
    return document.getElementById("recipe_banner_div")?.getAttribute("data-recipe-id");
}


function loadReviews() {
    let recipeId = getRecipeId();
    if (!recipeId) return;

    fetch(`/get_reviews/${recipeId}`)
        .then(res => res.json())
        .then(data => {
            let list = document.getElementById("reviewsList");
            if (!list) return;

            list.innerHTML = "";

            if (data.avg_rating) {
                let avgStars = "★".repeat(Math.round(data.avg_rating)) + "☆".repeat(5 - Math.round(data.avg_rating));
                list.innerHTML += `<p class="review-avg-rating"><b>Average rating: ${avgStars} (${data.avg_rating} / 5)</b></p>`;
            }

            if (data.reviews.length === 0) {
                list.innerHTML += `<p>No reviews yet. Be the first to review!</p>`;
                return;
            }

            for (let review of data.reviews) {
                list.appendChild(makeReviewCard(review));
            }
        })
        .catch(err => console.error("Error loading reviews:", err));
}


function makeReviewCard(review) {
    let filled = review.rating || 0;
    let stars = "★".repeat(filled) + "☆".repeat(5 - filled);

    let card = document.createElement("div");
    card.className = "review-card";
    card.innerHTML = `
        <div class="review-card-header">
            <strong>${review.author}</strong>
            <span class="review-card-stars">${stars}</span>
        </div>
        <p class="review-card-body">${review.body || "No text review"}</p>
        <div class="review-card-footer">
            <small class="review-card-date">${review.created_at}</small>
            <button class="btn btn-sm btn-outline-secondary like-btn" data-liked="${review.liked_by_me}" onclick="likeReview(${review.id}, this)">
                👍 <span class="like-count">${review.like_count}</span>
            </button>
        </div>
    `;

    let likeBtn = card.querySelector(".like-btn");
    likeBtn.classList.toggle("liked", review.liked_by_me);
    likeBtn.title = review.liked_by_me ? "Unlike" : "Like";

    return card;
}


function likeReview(reviewId, btn) {
    fetch("/like_review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ review_id: reviewId })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            btn.dataset.liked = data.liked;
            btn.querySelector(".like-count").textContent = data.like_count;
            btn.classList.toggle("liked", data.liked);
            btn.title = data.liked ? "Unlike" : "Like";
        } else {
            alert(data.message || "Could not like review");
        }
    })
    .catch(err => console.error("Like error:", err));
}


function setupStars() {
    for (let star of document.querySelectorAll(".star")) {
        star.addEventListener("mouseover", () => highlightStars(star.dataset.val));
        star.addEventListener("mouseout", resetStarHighlight);
        star.addEventListener("click", () => selectRating(star.dataset.val));
    }
}

function highlightStars(val) {
    for (let star of document.querySelectorAll(".star")) {
        star.style.color = star.dataset.val <= val ? "#f5a623" : "#ccc";
    }
}

function resetStarHighlight() {
    highlightStars(document.getElementById("ratingValue").value);
}

function selectRating(val) {
    document.getElementById("ratingValue").value = val;
    highlightStars(val);
}


function openReviewModal(mode) {
    let modal = document.getElementById("reviewModal");
    if (!modal) return;

    let titles = { review: "Leave a Review", rate: "Rate this Recipe", review_rate: "Rate & Review" };
    document.getElementById("reviewModalTitle").textContent = titles[mode] ?? "Leave a Review";

    document.getElementById("ratingSection").style.display = (mode === "rate" || mode === "review_rate") ? "block" : "none";
    document.getElementById("reviewSection").style.display = (mode === "review" || mode === "review_rate") ? "block" : "none";

    document.getElementById("ratingValue").value = "0";
    document.getElementById("reviewText").value = "";
    for (let star of document.querySelectorAll(".star")) star.style.color = "#ccc";

    modal.style.display = "flex";
}

function closeReviewModal() {
    let modal = document.getElementById("reviewModal");
    if (modal) modal.style.display = "none";
}


function submitReview() {
    let rating = parseInt(document.getElementById("ratingValue").value) || null;
    let body = document.getElementById("reviewText").value.trim();
    let recipeId = getRecipeId();

    if (!recipeId) { alert("Missing recipe ID"); return; }
    if (!rating && !body) { alert("Please add a rating or write a review."); return; }

    fetch("/submit_review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recipe_id: recipeId, rating, body })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            closeReviewModal();
            loadReviews();
        } else {
            alert(data.message || "Error submitting review");
        }
    })
    .catch(err => { console.error("Fetch error:", err); alert("You must be logged in to submit a review."); });
}


window.review      = () => openReviewModal("review");
window.rate        = () => openReviewModal("rate");
window.review_rate = () => openReviewModal("review_rate");