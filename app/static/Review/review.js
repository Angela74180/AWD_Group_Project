document.addEventListener("DOMContentLoaded", () => {
    console.log(recipe_details_dict["signed_in"])
    if (recipe_details_dict["signed_in"]){ 
        injectModal();
    }
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
        <!--<button class="review-modal-close" style="float:right" onclick="closeReviewModal()">&times;</button>-->

        <h5 id="reviewModalTitle" class="review-modal-title">Leave a Review</h5>

        <div id="ratingSection" class="review-modal-section">
            <label class="review-modal-label">Taste</label>
            <div id="tasteStarRow" class="review-star-row">
                <span class="star taste-star" data-val="1">&#9733;</span>
                <span class="star taste-star" data-val="2">&#9733;</span>
                <span class="star taste-star" data-val="3">&#9733;</span>
                <span class="star taste-star" data-val="4">&#9733;</span>
                <span class="star taste-star" data-val="5">&#9733;</span>
            </div>
            <input type="hidden" id="tasteValue" value="0">

            <label class="review-modal-label" style="margin-top:12px;">Accuracy</label>
            <div id="accuracyStarRow" class="review-star-row">
                <span class="star accuracy-star" data-val="1">&#9733;</span>
                <span class="star accuracy-star" data-val="2">&#9733;</span>
                <span class="star accuracy-star" data-val="3">&#9733;</span>
                <span class="star accuracy-star" data-val="4">&#9733;</span>
                <span class="star accuracy-star" data-val="5">&#9733;</span>
            </div>
            <input type="hidden" id="accuracyValue" value="0">

            <label class="review-modal-label" style="margin-top:12px;">Timings</label>
            <select id="timingValue" class="review-modal-select">
                <option value="">-- Select --</option>
                <option value="1">Took Much More Time</option>
                <option value="2">Took More Time</option>
                <option value="3">Took a Little More Time</option>
                <option value="4">Perfect</option>
                <option value="5">Took a Little Less Time</option>
                <option value="6">Took Less Time</option>
                <option value="7">Took Much Less Time</option>
            </select>
        </div>

        <div id="reviewSection" class="review-modal-section">
            <label for="reviewText" class="review-modal-label">Your Review</label>
            <textarea id="reviewText" class="review-modal-textarea" rows="4" maxlength="500" placeholder="Share your thoughts about this recipe..."></textarea>
        </div>

        <div class="review-modal-actions">
            <!--<button onclick="closeReviewModal()" class="btn btn-secondary btn-sm">Cancel</button>-->
            <button onclick="submitReview()" class="btn btn-primary btn-sm">Submit</button>
        </div>
    `;

    modal.appendChild(box);
    document.getElementById("addReviews").appendChild(modal);

    // modal.addEventListener("click", e => { if (e.target === modal) closeReviewModal(); });
}


function injectReviewsSection() {
    let divMain = document.querySelector(".div_main");
    if (!divMain || document.getElementById("reviewsSection")) return;

    let section = document.createElement("div");
    section.id = "reviewsSection";
    section.className = "reviews-section";
    // section.innerHTML = `<h3>Reviews</h3><div id="reviewsList"></div>`;

    divMain.appendChild(section);
}


function getRecipeId() {
    return document.getElementById("recipe_banner_div")?.getAttribute("recipe_id");
}


function loadReviews() {
    let recipeId = getRecipeId();
    if (!recipeId) return;

    fetch(`/get_reviews/${recipeId}`)
        .then(res => res.json())
        .then(data => {
            let list = document.getElementById("displayReviews");
            if (!list) return;

            list.innerHTML = "";

            if (data.avg_taste || data.avg_accuracy) {
                let tasteStars    = data.avg_taste    ? "★".repeat(Math.round(data.avg_taste))    + "☆".repeat(5 - Math.round(data.avg_taste))    : "N/A";
                let accuracyStars = data.avg_accuracy ? "★".repeat(Math.round(data.avg_accuracy)) + "☆".repeat(5 - Math.round(data.avg_accuracy)) : "N/A";
                list.innerHTML += `
                    <p class="review-avg-rating">
                        <b>Avg Taste: ${tasteStars} (${data.avg_taste ?? "N/A"} / 5)</b> &nbsp;|&nbsp;
                        <b>Avg Accuracy: ${accuracyStars} (${data.avg_accuracy ?? "N/A"} / 5)</b>
                    </p>
                `;
                document.getElementById("avgs").innerHTML += `
                    <p class="review-avg-rating">
                        <b>Avg Taste: ${tasteStars} (${data.avg_taste ?? "N/A"} / 5)</b> &nbsp;|&nbsp;
                        <b>Avg Accuracy: ${accuracyStars} (${data.avg_accuracy ?? "N/A"} / 5)</b>
                    </p>
                `;
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


const TIMING_LABELS = {
    1: "Took Much More Time",
    2: "Took More Time",
    3: "Took a Little More Time",
    4: "Perfect",
    5: "Took a Little Less Time",
    6: "Took Less Time",
    7: "Took Much Less Time"
};

function makeReviewCard(review) {
    let tasteStars    = review.taste_rating    ? "★".repeat(review.taste_rating)    + "☆".repeat(5 - review.taste_rating)    : "N/A";
    let accuracyStars = review.accuracy_rating ? "★".repeat(review.accuracy_rating) + "☆".repeat(5 - review.accuracy_rating) : "N/A";
    let timingLabel   = review.timing_rating   ? TIMING_LABELS[review.timing_rating] : "N/A";

    let card = document.createElement("div");
    card.className = "review-card";
    card.innerHTML = `
        <div class="review-card-header">
            <strong>${review.author}</strong>
            <small class="review-card-date">${review.created_at}</small>
        </div>
        <div class="review-card-ratings">
            <span>Taste: <span class="review-card-stars">${tasteStars}</span></span>
            <span>Accuracy: <span class="review-card-stars">${accuracyStars}</span></span>
            <span>Timing: <b>${timingLabel}</b></span>
        </div>
        <p class="review-card-body">${review.body || ""}</p>
        <div class="review-card-footer">
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
    let csrfToken = document.querySelector('meta[name="csrf-token"]').content;

    fetch("/like_review", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRFToken": csrfToken },
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
    setupStarRow("taste-star", "tasteValue");
    setupStarRow("accuracy-star", "accuracyValue");
}

function setupStarRow(className, inputId) {
    for (let star of document.querySelectorAll(`.${className}`)) {
        star.addEventListener("mouseover", () => highlightStarRow(className, star.dataset.val));
        star.addEventListener("mouseout",  () => highlightStarRow(className, document.getElementById(inputId).value));
        star.addEventListener("click",     () => {
            document.getElementById(inputId).value = star.dataset.val;
            highlightStarRow(className, star.dataset.val);
        });
    }
}

function highlightStarRow(className, val) {
    for (let star of document.querySelectorAll(`.${className}`)) {
        star.style.color = star.dataset.val <= val ? "#f5a623" : "#ccc";
    }
}




function submitReview() {
    let taste    = parseInt(document.getElementById("tasteValue").value)    || null;
    let accuracy = parseInt(document.getElementById("accuracyValue").value) || null;
    let timing   = parseInt(document.getElementById("timingValue").value)   || null;
    let body     = document.getElementById("reviewText").value.trim();
    let recipeId = getRecipeId();

    if (!recipeId) { alert("Missing recipe ID"); return; }
    if (!taste && !accuracy && !timing && !body) { alert("Please fill in at least one field."); return; }

    let csrfToken = document.querySelector('meta[name="csrf-token"]').content;

    fetch("/submit_review", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-CSRFToken": csrfToken },
        body: JSON.stringify({ recipe_id: recipeId, taste, accuracy, timing, body })
    })
    .then(res => {
        if (res.status === 401) {
            alert("You must be logged in to submit a review.");
            return null;
        }
        return res.json();
        })
        
    .then(data => {
        if (!data) return; 
        if (data.success) {
            loadReviews();
            document.getElementById("tasteValue").value = "0";
            document.getElementById("accuracyValue").value = "0";
            document.getElementById("timingValue").value = "";
            document.getElementById("reviewText").value = "";
            highlightStarRow("taste-star", 0);
            highlightStarRow("accuracy-star", 0);
        } else {
            alert(data.message || "Error submitting review");
        }
    })
    .catch(err => { console.error("Fetch error:", err); alert("You must be logged in to submit a review."); });
}

