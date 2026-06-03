let jobsData = [];

let activeCategory = "all";

const urlParams =
new URLSearchParams(
    window.location.search
);

const initialSearch =
urlParams.get("search") || "";

const initialLocation =
urlParams.get("location") || "";

const modal = document.getElementById("jobModal");
const closeModal = document.querySelector(".close-modal");
const applyConfirmBtn = document.querySelector(".apply-confirm-btn");

/* =========================
   LOAD JSON
========================= */

fetch("../data/jobs.json")
    .then(response => response.json())
    .then(data => {

        jobsData = data;

        const searchInput =
        document.getElementById(
            "jobSearch"
        );

        const locationInput =
        document.getElementById(
            "locationSearch"
        );

        if (searchInput) {

            searchInput.value =
            initialSearch;

        }

        if (locationInput) {

            locationInput.value =
            initialLocation;

        }

        filterJobs();

    })
    .catch(error => {

        console.error(
            "Failed to load jobs:",
            error
        );

    });

/* =========================
   RENDER JOBS
========================= */

function renderJobs(jobs) {

    const container =
    document.getElementById("jobsContainer");

    if (!container) return;

    container.innerHTML = "";

    jobs.forEach((job, index) => {

        container.innerHTML += `

        <div class="job-card">

            <div class="job-header">

                <div class="job-icon">

                    <img
                        src="${job.icon}"
                        alt="${job.title}"
                    >

                </div>

                <button
                    class="bookmark-btn"
                    data-id="${job.id}"
                >

                    <img
                        src="../Icons/bookmark.png"
                        alt="Bookmark"
                    >

                </button>

            </div>

            <h3>${job.title}</h3>

            <p class="company-name">
                ${job.company}
            </p>

            <div class="job-location">

                <img
                    src="../Icons/location.png"
                    alt=""
                >

                <span>
                    ${job.location}
                </span>

            </div>

            <p class="salary">
                ${job.salary}
            </p>

            <p class="experience">
                ${job.experience}+ Years Experience
            </p>

            <button
                class="apply-btn"
                data-id="${job.id}"
            >
                Apply Now
            </button>

        </div>

        `;

    });

    attachBookmarks();
    attachApplyButtons();

}

/* =========================
   FILTER SYSTEM
========================= */

function filterJobs() {

    const searchText =
    document.getElementById("jobSearch")
    ?.value
    .toLowerCase()
    .trim() || "";

    const locationText =
    document.getElementById("locationSearch")
    ?.value
    .toLowerCase()
    .trim() || "";

    const selectedEmployment =

    Array.from(
        document.querySelectorAll(
            ".employment-filter:checked"
        )
    ).map(item => item.value);

    const selectedExperience =

    Array.from(
        document.querySelectorAll(
            ".experience-filter:checked"
        )
    ).map(item => Number(item.value));

    const filteredJobs =

    jobsData.filter(job => {

        const matchSearch =

            job.title
            .toLowerCase()
            .includes(searchText)

            ||

            job.company
            .toLowerCase()
            .includes(searchText)

            ||

            job.location
            .toLowerCase()
            .includes(searchText);

        const matchLocation =

            locationText === ""

            ||

            job.location
            .toLowerCase()
            .includes(locationText);

        const matchCategory =


            activeCategory === "all"

            ||

            (
                job.category &&
                job.category
                .trim()
                .toLowerCase() === activeCategory
            );

        const matchEmployment =

            selectedEmployment.length === 0

            ||

            selectedEmployment.includes(
                job.employment
            );

        const matchExperience =

            selectedExperience.length === 0

            ||

            selectedExperience.some(
                exp =>
                job.experience >= exp
            );

        return (

            matchSearch

            &&

            matchLocation

            &&

            matchCategory

            &&

            matchEmployment

            &&

            matchExperience

        );

    });

    renderJobs(filteredJobs);

}

/* =========================
   CATEGORY FILTER
========================= */

document
.querySelectorAll(".category-pill")
.forEach(button => {

    button.addEventListener("click", () => {

        document
        .querySelectorAll(".category-pill")
        .forEach(btn => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        activeCategory =
        button.textContent
        .trim()
        .toLowerCase();

        console.log(
            "Selected category:",
            activeCategory
        );

        filterJobs();

    });

});

/* =========================
   SEARCH EVENTS
========================= */

document
.getElementById("jobSearch")
?.addEventListener(
    "input",
    filterJobs
);

document
.getElementById("locationSearch")
?.addEventListener(
    "input",
    filterJobs
);

document
.querySelectorAll(
    ".employment-filter"
)
.forEach(input => {

    input.addEventListener(
        "change",
        filterJobs
    );

});

document
.querySelectorAll(
    ".experience-filter"
)
.forEach(input => {

    input.addEventListener(
        "change",
        filterJobs
    );

});

/* =========================
   BOOKMARK SYSTEM
========================= */

function attachBookmarks() {

    let savedJobs =

    JSON.parse(
        localStorage.getItem(
            "savedJobs"
        )
    ) || [];

    document
    .querySelectorAll(
        ".bookmark-btn"
    )
    .forEach(button => {

        const id =
        Number(
            button.dataset.id
        );

        button.style.opacity =

        savedJobs.includes(id)
        ? "1"
        : "0.4";

        button.onclick = () => {

            if (
                savedJobs.includes(id)
            ) {

                savedJobs =
                savedJobs.filter(
                    item =>
                    item !== id
                );

            } else {

                savedJobs.push(id);

            }

            localStorage.setItem(
                "savedJobs",
                JSON.stringify(
                    savedJobs
                )
            );

            button.style.opacity =

            savedJobs.includes(id)
            ? "1"
            : "0.4";

        };

    });

}

/* =========================
   APPLY BUTTONS
========================= */

function attachApplyButtons() {

    document
    .querySelectorAll(
        ".apply-btn"
    )
    .forEach(button => {

        button.onclick = () => {

            if (modal) {

                modal.classList.add(
                    "active"
                );

            }

        };

    });

}

/* =========================
   MODAL
========================= */

if (closeModal) {

    closeModal.onclick = () => {

        modal.classList.remove(
            "active"
        );

    };

}

window.addEventListener(
    "click",
    (e) => {

        if (
            e.target === modal
        ) {

            modal.classList.remove(
                "active"
            );

        }

    }
);

if (applyConfirmBtn) {

    applyConfirmBtn.onclick = () => {

        alert(
            "Application submitted successfully!"
        );

        modal.classList.remove(
            "active"
        );

    };

}