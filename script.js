/* =====================================
   SAFE MESSAGE FUNCTION
===================================== */

function showMessage(id, message, type) {

    const box = document.getElementById(id);

    if (!box) return;

    box.textContent = message;
    box.className = "form-message " + type;
}

/* =====================================
   PASSWORD TOGGLE
===================================== */

function togglePassword(inputId) {

    const input = document.getElementById(inputId);

    if (!input) return;

    input.type =
        input.type === "password"
        ? "text"
        : "password";
}

/* =====================================
   HOMEPAGE SEARCH
===================================== */

const searchBtn =
document.getElementById("searchBtn");

if (searchBtn) {

    searchBtn.addEventListener("click", function () {

        const jobInput =
        document.getElementById("jobInput");

        const locationSelect =
        document.getElementById("locationSelect");

        const job =
        jobInput ? jobInput.value.trim() : "";

        const location =
        locationSelect
        ? locationSelect.value
        : "Anywhere";

        if (job === "") {

            alert("Please enter a job title.");
            return;
        }

        alert(
            `Searching for "${job}" in ${location}`
        );

    });

}

/* =====================================
   HOMEPAGE CATEGORY CARDS
===================================== */

const cardButtons =
document.querySelectorAll(".card-footer button");

cardButtons.forEach((button) => {

    button.addEventListener("click", function () {

        const card =
        this.closest(".category-card");

        if (!card) return;

        const category =
        card.querySelector("h3").innerText;

        alert(
            `Opening ${category} jobs`
        );

    });

});

/* =====================================
   REGISTER FORM
===================================== */

const registerForm =
document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const fullName =
            document.getElementById("fullName")?.value.trim();

            const email =
            document.getElementById("email")?.value.trim();

            const phone =
            document.getElementById("phone")?.value.trim();

            const address =
            document.getElementById("address")?.value.trim();

            const password =
            document.getElementById("password")?.value;

            const confirmPassword =
            document.getElementById("confirmPassword")?.value;

            if (
                !fullName ||
                !email ||
                !phone ||
                !address ||
                !password ||
                !confirmPassword
            ) {

                showMessage(
                    "registerMessage",
                    "Please fill all fields.",
                    "error"
                );

                return;
            }

            const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                showMessage(
                    "registerMessage",
                    "Invalid email format.",
                    "error"
                );

                return;
            }

            if (password.length < 6) {

                showMessage(
                    "registerMessage",
                    "Password must be at least 6 characters.",
                    "error"
                );

                return;
            }

            if (password !== confirmPassword) {

                showMessage(
                    "registerMessage",
                    "Passwords do not match.",
                    "error"
                );

                return;
            }

            const userData = {

                fullName,
                email,
                phone,
                address,
                password

            };

            localStorage.setItem(
                "registeredUser",
                JSON.stringify(userData)
            );

            showMessage(
                "registerMessage",
                "Registration successful!",
                "success"
            );

            setTimeout(() => {

                window.location.href =
                "SignIn.html";

            }, 1500);

        }
    );

}

/* =====================================
   LOGIN FORM
===================================== */

const loginForm =
document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const email =
            document.getElementById("loginEmail")?.value.trim();

            const password =
            document.getElementById("loginPassword")?.value;

            const storedUser =
            JSON.parse(
                localStorage.getItem(
                    "registeredUser"
                )
            );

            if (!storedUser) {

                showMessage(
                    "loginMessage",
                    "No registered account found.",
                    "error"
                );

                return;
            }

            if (email !== storedUser.email) {

                showMessage(
                    "loginMessage",
                    "Email not found.",
                    "error"
                );

                return;
            }

            if (password !== storedUser.password) {

                showMessage(
                    "loginMessage",
                    "Incorrect password.",
                    "error"
                );

                return;
            }

            const rememberMe =
            document.getElementById("rememberMe");

            if (
                rememberMe &&
                rememberMe.checked
            ) {

                localStorage.setItem(
                    "rememberedEmail",
                    email
                );

            } else {

                localStorage.removeItem(
                    "rememberedEmail"
                );

            }

            localStorage.setItem(
                "isLoggedIn",
                "true"
            );

            localStorage.setItem(
                "currentUser",
                storedUser.fullName
            );

            showMessage(
                "loginMessage",
                "Login successful!",
                "success"
            );

            setTimeout(() => {

                window.location.href =
                "HomePage.html";

            }, 1500);

        }
    );

}

/* =====================================
   AUTO FILL EMAIL
===================================== */

const rememberedEmail =
localStorage.getItem(
    "rememberedEmail"
);

const loginEmail =
document.getElementById(
    "loginEmail"
);

if (
    rememberedEmail &&
    loginEmail
) {

    loginEmail.value =
    rememberedEmail;

}

/* =====================================
   JOB MODAL
===================================== */

const modal =
document.getElementById(
    "jobModal"
);

const applyButtons =
document.querySelectorAll(
    ".apply-btn"
);

const closeModal =
document.querySelector(
    ".close-modal"
);

applyButtons.forEach((button) => {

    button.addEventListener(
        "click",
        () => {

            if (modal) {

                modal.classList.add(
                    "active"
                );

            }

        }
    );

});

if (closeModal) {

    closeModal.addEventListener(
        "click",
        () => {

            modal.classList.remove(
                "active"
            );

        }
    );

}

window.addEventListener(
    "click",
    (e) => {

        if (
            modal &&
            e.target === modal
        ) {

            modal.classList.remove(
                "active"
            );

        }

    }
);

/* =====================================
   APPLY BUTTON
===================================== */

const applyConfirmBtn =
document.querySelector(
    ".apply-confirm-btn"
);

if (applyConfirmBtn) {

    applyConfirmBtn.addEventListener(
        "click",
        () => {

            alert(
                "Application submitted successfully!"
            );

            modal.classList.remove(
                "active"
            );

        }
    );

}

/* =====================================
   BOOKMARK SYSTEM
===================================== */

let savedJobs =
JSON.parse(
    localStorage.getItem(
        "savedJobs"
    )
) || [];

const bookmarkButtons =
document.querySelectorAll(
    ".bookmark-btn"
);

bookmarkButtons.forEach(
    (button, index) => {

        if (
            savedJobs.includes(index)
        ) {

            button.style.opacity =
            "1";

        } else {

            button.style.opacity =
            "0.5";

        }

        button.addEventListener(
            "click",
            () => {

                if (
                    savedJobs.includes(
                        index
                    )
                ) {

                    savedJobs =
                    savedJobs.filter(
                        item =>
                        item !== index
                    );

                    button.style.opacity =
                    "0.5";

                } else {

                    savedJobs.push(
                        index
                    );

                    button.style.opacity =
                    "1";

                }

                localStorage.setItem(
                    "savedJobs",
                    JSON.stringify(
                        savedJobs
                    )
                );

            }
        );

    }
);

/* =====================================
   JOB SEARCH
===================================== */

const jobSearch =
document.getElementById(
    "jobSearch"
);

if (jobSearch) {

    jobSearch.addEventListener(
        "keyup",
        () => {

            const search =
            jobSearch.value
            .toLowerCase();

            const cards =
            document.querySelectorAll(
                ".job-card"
            );

            cards.forEach(
                (card) => {

                    const title =
                    card
                    .querySelector("h3")
                    .textContent
                    .toLowerCase();

                    card.style.display =
                    title.includes(search)
                    ? "block"
                    : "none";

                }
            );

        }
    );

}

/* =====================================
   JOB CATEGORY FILTER
===================================== */

const pillButtons =
document.querySelectorAll(
    ".category-pill"
);

pillButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                pillButtons.forEach(
                    (btn) =>
                    btn.classList.remove(
                        "active"
                    )
                );

                button.classList.add(
                    "active"
                );

                const category =
                button.textContent
                .toLowerCase();

                const cards =
                document.querySelectorAll(
                    ".job-card"
                );

                cards.forEach(
                    (card) => {

                        const title =
                        card
                        .querySelector("h3")
                        .textContent
                        .toLowerCase();

                        if (
                            category === "all"
                        ) {

                            card.style.display =
                            "block";

                        } else {

                            card.style.display =
                            title.includes(
                                category
                            )
                            ? "block"
                            : "none";

                        }

                    }
                );

            }
        );

    }
);

/* =====================================
   LOGIN STATUS
===================================== */

const joinButton =
document.querySelector(".join-btn");

const isLoggedIn =
localStorage.getItem("isLoggedIn");

if (
  joinButton &&
  isLoggedIn === "true"
) {

  joinButton.outerHTML = `

    <div class="profile-dropdown">

      <img
        src="Icons/user.png"
        class="profile-icon"
        id="profileToggle"
        alt="Profile"
      >

      <div
        class="dropdown-menu"
        id="dropdownMenu"
      >

        <a href="#">
          My Profile
        </a>

        <a href="#">
          Saved Jobs
        </a>

        <a href="#">
          Applications
        </a>

        <button onclick="logout()">
          Logout
        </button>

      </div>

    </div>

  `;

  const toggle =
  document.getElementById(
    "profileToggle"
  );

  const menu =
  document.getElementById(
    "dropdownMenu"
  );

  toggle.addEventListener(
    "click",
    () => {
      menu.classList.toggle(
        "active"
      );
    }
  );

  document.addEventListener(
    "click",
    (e) => {

      if(
        !e.target.closest(
          ".profile-dropdown"
        )
      ){
        menu.classList.remove(
          "active"
        );
      }

    }
  );

}

/* =====================================
   LOGOUT
===================================== */

function logout() {

    localStorage.removeItem(
        "isLoggedIn"
    );

    localStorage.removeItem(
        "currentUser"
    );

    window.location.href =
    "SignIn.html";
}