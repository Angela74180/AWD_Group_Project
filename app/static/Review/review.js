// ============================================================
// REPLACE: app/static/Review/review.js
// ============================================================
// This replaces the placeholder alert() calls with a real popup modal.
// The modal is injected into the DOM once, then reused for every review button click.
// ============================================================

// ── Inject the modal HTML once when the script loads ────────────────────────
(function injectReviewModal() {
    const modalHTML = `
    <div id="reviewModal" style="display:none; position:fixed; inset:0; z-index:9999;
         background:rgba(0,0,0,0.5); justify-content:center; align-items:center;">

        <div style="background:#fff; border-radius:10px; padding:30px; width:min(480px,90vw);
                    box-shadow:0 8px 30px rgba(0,0,0,0.2); position:relative;
                    font-family:'Bahnschrift Light', sans-serif;">

            <!-- Close button -->
            <button onclick="closeReviewModal()" style="position:absolute; top:12px; right:16px;
                background:none; border:none; font-size:1.4rem; cursor:pointer; color:#888;">
                &times;
            </button>

            <h5 id="reviewModalTitle" style="margin-bottom:16px; font-size:1.2rem;">Leave a Review</h5>

            <!-- Star rating row (hidden when allow_ratings is false) -->
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

            <!-- Written review textarea (hidden when allow_reviews is false) -->
            <div id="reviewSection" style="margin-bottom:20px;">
                <label for="reviewText" style="display:block; margin-bottom:6px; font-weight:600;">
                    Your Review
                </label>
                <textarea id="reviewText" rows="4" placeholder="Share your thoughts about this recipe…"
                    style="width:100%; padding:10px; border:1px solid #ccc; border-radius:6px;
                           box-sizing:border-box; resize:none; font-family:inherit;"></textarea>
            </div>

            <div style="display:flex; gap:10px; justify-content:flex-end;">
                <button onclick="closeReviewModal()" class="btn btn-secondary btn-sm">Cancel</button>
                <button onclick="submitReview()" class="btn btn-primary btn-sm">Submit</button>
            </div>
        </div>
    </div>`;

    document.body.insertAdjacentHTML("beforeend", modalHTML);
    setupStars();
})();


// ── Star interaction ─────────────────────────────────────────────────────────
function setupStars() {
    const stars = document.querySelectorAll(".star");
    stars.forEach(star => {
        star.addEventListener("mouseover", () => highlightStars(star.dataset.val));
        star.addEventListener("mouseout",  resetStarHighlight);
        star.addEventListener("click",     () => selectRating(star.dataset.val));
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


// ── Open / close ─────────────────────────────────────────────────────────────
let _currentRecipeId = null;

function openReviewModal(recipeId, mode) {
    // mode: "review" | "rate" | "review_rate"
    _currentRecipeId = recipeId;

    const showRating = (mode === "rate" || mode === "review_rate");
    const showReview = (mode === "review" || mode === "review_rate");

    const titles = { review: "Leave a Review", rate: "Rate this Recipe", review_rate: "Rate & Review" };
    document.getElementById("reviewModalTitle").textContent = titles[mode] || "Leave a Review";

    document.getElementById("ratingSection").style.display = showRating ? "block" : "none";
    document.getElementById("reviewSection").style.display = showReview ? "block" : "none";

    // Reset fields
    document.getElementById("ratingValue").value = "0";
    document.getElementById("reviewText").value  = "";
    document.querySelectorAll(".star").forEach(s => s.style.color = "#ccc");

    const modal = document.getElementById("reviewModal");
    modal.style.display = "flex";
}

function closeReviewModal() {
    document.getElementById("reviewModal").style.display = "none";
    _currentRecipeId = null;
}

// Close modal when clicking the dark backdrop
document.addEventListener("click", function(e) {
    const modal = document.getElementById("reviewModal");
    if (e.target === modal) closeReviewModal();
});


// ── Submit ────────────────────────────────────────────────────────────────────
function submitReview() {
    const rating     = parseInt(document.getElementById("ratingValue").value) || null;
    const reviewText = document.getElementById("reviewText").value.trim();

    // Basic validation
    if (!rating && !reviewText) {
        alert("Please add a rating or write a review before submitting.");
        return;
    }

    const payload = {
        recipe_id:   _currentRecipeId,
        rating:      rating,
        body:        reviewText
    };

    fetch("/submit_review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            closeReviewModal();
            alert("Review submitted! Thank you.");
            // Optionally reload to show the new review: location.reload();
        } else {
            alert("Error: " + (data.message || "Could not submit review."));
        }
    })
    .catch(err => {
        console.error("Review submission error:", err);
        alert("Something went wrong. Please try again.");
    });
}


// ── Public trigger functions (called by existing buttons) ─────────────────────
// These replace the old alert() placeholders in the original review.js.

function review(event) {
    const recipeId = getRecipeIdFromButton(event.target);
    openReviewModal(recipeId, "review");
}

function rate(event) {
    const recipeId = getRecipeIdFromButton(event.target);
    openReviewModal(recipeId, "rate");
}

function review_rate(event) {
    const recipeId = getRecipeIdFromButton(event.target);
    openReviewModal(recipeId, "review_rate");
}

// Helper: pull the recipe id from a data attribute on the button,
// or from recipe_details_dict if it's defined on the page.
function getRecipeIdFromButton(btn) {
    return btn.closest("[data-recipe-id]")?.dataset?.recipeId
        ?? (typeof recipe_details_dict !== "undefined" ? recipe_details_dict.id : null);
}