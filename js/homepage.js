/* =====================================
   HOMEPAGE SEARCH
===================================== */

const searchBtn =
document.getElementById("searchBtn");

if (searchBtn) {

    searchBtn.addEventListener(
        "click",
        () => {

            const jobInput =
            document.getElementById(
                "jobInput"
            );

            const locationSelect =
            document.getElementById(
                "locationSelect"
            );

            const job =
            jobInput
            ? jobInput.value.trim()
            : "";

            const location =
            locationSelect
            ? locationSelect.value
            : "";

            if (!job) {

                alert(
                    "Please enter a job title."
                );

                return;

            }

            const params =
            new URLSearchParams({

                search: job,
                location: location

            });

            window.location.href =
            `Jobs.html?${params.toString()}`;

        }
    );

}

/* =====================================
   CATEGORY CARD BUTTONS
===================================== */

const cardButtons =
document.querySelectorAll(
    ".card-footer button"
);

cardButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            function () {

                const card =
                this.closest(
                    ".category-card"
                );

                if (!card) return;

                const category =
                card
                .querySelector("h3")
                .textContent;

                alert(
                    `Opening ${category} jobs`
                );

            }
        );

    }
);