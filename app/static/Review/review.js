// ─────────────────────────────────────────────────────────────
// Inject modal AFTER DOM is ready
// ─────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {
    const modalHTML = `
    <div id="reviewModal" style="display:none; position:fixed; inset:0; z-index:9999;
         background:rgba(0,0,0,0.5); justify-content:center; align-items:center;">

        <div style="background:#fff; border-radius:10px; padding:30px;
                    width:min(480px,90vw); box-shadow:0 8px 30px rgba(0,0,0,0.2);
                    position:relative; font-family:'Bahnschrift Light', sans-serif;">

            <button onclick="closeReviewModal()" style="position:absolute; top:12px; right:16px;
                background:none; border:none; font-size:1.4rem; cursor:pointer; color:#888;">
                &times;
            </button>

            <h5 id="reviewModalTitle" style="margin-bottom:16px; font-size:1.2rem;">
                Leave a Review
            </h5>

            <!-- Rating -->
            <div id="ratingSection" style="margin-bottom:16px;">
                <label style="display:block; margin-bottom:6px; font-weight:600;">Rating</label>

                <div id="starRow" style="display:flex; gap:6px; font-size:1.6rem; cursor:pointer;">
                    <span class="star" data-val="1">&#9733;</span>
                    <span class="star" data-val="2">&#9733;</span>
                    <span class="star" data-val="3">&#9733;</span>
                    <span class="star" data-val="4">&#9733;</span>
                    <span class="star" data-val="5">&#9733;</span>
                </div>

                <input type="hidden" id="ratingValue" value="0">
            </div>

            <!-- Review -->
            <div id="reviewSection" style="margin-bottom:20px;">
                <label for="reviewText" style="display:block; margin-bottom:6px; font-weight:600;">
                    Your Review
                </label>

                <textarea id="reviewText" rows="4"
                    placeholder="Share your thoughts about this recipe..."
                    style="width:100%; padding:10px; border:1px solid #ccc;
                        border-radius:6px; box-sizing:border-box; resize:none;
                        font-family:inherit;"></textarea>
            </div>

            <div style="display:flex; gap:10px; justify-content:flex-end;">
                <button onclick="closeReviewModal()" class="btn btn-secondary btn-sm">
                    Cancel
                </button>

                <button onclick="submitReview()" class="btn btn-primary btn-sm">
                    Submit
                </button>
            </div>
        </div>
    </div>`;

    document.body.insertAdjacentHTML("beforeend", modalHTML);
    setupStars();
});


// ─────────────────────────────────────────────────────────────
// Load reviews after page fully loads
// ─────────────────────────────────────────────────────────────
window.addEventListener("load", () => {
    const divMain = document.querySelector(".div_main");
    
    if (divMain) {
        const reviewsSection = document.createElement("div");
        reviewsSection.className = "reviews-section";
        reviewsSection.id = "reviewsSection";

        reviewsSection.innerHTML = `
            <h3>Reviews</h3>
            <div id="reviewsList"></div>
        `;
        
        // Append INSIDE div_main at the bottom
        divMain.appendChild(reviewsSection);
    }
    
    loadReviews();
});


// ─────────────────────────────────────────────────────────────
// Recipe ID helper
// ─────────────────────────────────────────────────────────────
function getRecipeId() {
    return document.getElementById("recipe_banner_div")
        ?.getAttribute("data-recipe-id");
}


// ─────────────────────────────────────────────────────────────
// Load and display reviews
// ─────────────────────────────────────────────────────────────
function loadReviews() {
    const recipeId = getRecipeId();
    if (!recipeId) {
        console.warn("Recipe ID not found");
        return;
    }

    fetch(`/get_reviews/${recipeId}`)
        .then(res => res.json())
        .then(data => {
            const reviewsList = document.getElementById("reviewsList");
            if (!reviewsList) {
                console.error("reviewsList element not found");
                return;
            }

            reviewsList.innerHTML = "";

            if (data.reviews.length === 0) {
                reviewsList.innerHTML = "<p>No reviews yet. Be the first to review!</p>";
                return;
            }

            data.reviews.forEach(review => {
                const stars = "★".repeat(review.rating || 0) + "☆".repeat(5 - (review.rating || 0));
                const reviewHTML = `
                    <div style="padding: 15px; margin: 10px 0; border: 1px solid #ddd; border-radius: 8px;">
                        <div style="display: flex; justify-content: space-between; align-items: center;">
                            <strong>${review.author}</strong>
                            <span style="color: #f5a623; font-size: 1.2rem;">${stars}</span>
                        </div>
                        <p style="margin: 10px 0; color: #555;">${review.body || "No text review"}</p>
                        <small style="color: #999;">${review.created_at}</small>
                    </div>
                `;
                reviewsList.innerHTML += reviewHTML;
            });
        })
        .catch(err => console.error("Error loading reviews:", err));
}


// ─────────────────────────────────────────────────────────────
// Star logic
// ─────────────────────────────────────────────────────────────
function setupStars() {
    document.querySelectorAll(".star").forEach(star => {
        star.addEventListener("mouseover", () => highlightStars(star.dataset.val));
        star.addEventListener("mouseout", resetStarHighlight);
        star.addEventListener("click", () => selectRating(star.dataset.val));
    });
}

function highlightStars(val) {
    document.querySelectorAll(".star").forEach(s => {
        s.style.color = s.dataset.val <= val ? "#f5a623" : "#ccc";
    });
}

function resetStarHighlight() {
    const selected = document.getElementById("ratingValue").value;
    highlightStars(selected);
}

function selectRating(val) {
    document.getElementById("ratingValue").value = val;
    highlightStars(val);
}


// ─────────────────────────────────────────────────────────────
// Modal control
// ─────────────────────────────────────────────────────────────
function openReviewModal(recipeId, mode) {
    const modal = document.getElementById("reviewModal");
    if (!modal) return;

    const showRating = (mode === "rate" || mode === "review_rate");
    const showReview = (mode === "review" || mode === "review_rate");

    const titles = {
        review: "Leave a Review",
        rate: "Rate this Recipe",
        review_rate: "Rate & Review"
    };

    document.getElementById("reviewModalTitle").textContent =
        titles[mode] || "Leave a Review";

    document.getElementById("ratingSection").style.display =
        showRating ? "block" : "none";

    document.getElementById("reviewSection").style.display =
        showReview ? "block" : "none";

    document.getElementById("ratingValue").value = "0";
    document.getElementById("reviewText").value = "";
    document.querySelectorAll(".star").forEach(s => s.style.color = "#ccc");

    modal.style.display = "flex";
}

function closeReviewModal() {
    const modal = document.getElementById("reviewModal");
    if (modal) modal.style.display = "none";
}


// close when clicking outside
document.addEventListener("click", (e) => {
    const modal = document.getElementById("reviewModal");
    if (e.target === modal) closeReviewModal();
});


// ─────────────────────────────────────────────────────────────
// Submit review (GLOBAL so onclick works)
// ───────────────────────────────────────────────���─────────────
window.submitReview = function () {
    const rating = parseInt(document.getElementById("ratingValue").value) || null;
    const reviewText = document.getElementById("reviewText").value.trim();
    const recipeId = getRecipeId();

    if (!recipeId) {
        alert("Missing recipe ID");
        return;
    }

    if (!rating && !reviewText) {
        alert("Please add a rating or write a review.");
        return;
    }

    fetch("/submit_review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            recipe_id: recipeId,
            rating: rating,
            body: reviewText
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            closeReviewModal();
            alert("Review submitted!");
            loadReviews();
        } else {
            alert(data.message || "Error submitting review");
        }
    })
    .catch(err => {
        console.error("Fetch error:", err);
        alert("Something went wrong");
    });
};


// ─────────────────────────────────────────────────────────────
// Global triggers (buttons in HTML)
// ─────────────────────────────────────────────────────────────
window.review = function (event) {
    openReviewModal(getRecipeId(), "review");
};

window.rate = function (event) {
    openReviewModal(getRecipeId(), "rate");
};

window.review_rate = function (event) {
    openReviewModal(getRecipeId(), "review_rate");
};