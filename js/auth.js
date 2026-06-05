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
   NAVBAR LOGIN STATE
===================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const navbar =
        document.querySelector(
            ".navbar"
        );

        if (!navbar) return;

        const isLoggedIn =

        localStorage.getItem(
            "isLoggedIn"
        );

        if (
            isLoggedIn !== "true"
        ) return;

        const joinBtn =
        document.querySelector(
            ".join-btn"
        );

        if (joinBtn) {

            joinBtn.remove();

        }

        const savedProfile =

        JSON.parse(
            localStorage.getItem(
                "profileData"
            )
        );

        const profileImage =

            savedProfile?.profileImage ||

            "../Images/default-profile.png";

        const profileMenu =
        document.createElement(
            "div"
        );

        profileMenu.className =
        "profile-menu";

        profileMenu.innerHTML = `

        <img
            id="navProfileImage"
            class="nav-profile-image"
            src="${profileImage}"
            alt="Profile"
        >

        <div
            id="profileDropdown"
            class="profile-dropdown"
        >

            <a href="../html/Profile.html">
                My Profile
            </a>

            <button id="logoutBtn">
                Logout
            </button>

        </div>

        `;

        navbar.appendChild(
            profileMenu
        );

        const navProfileImage =
        document.getElementById(
            "navProfileImage"
        );

        const profileDropdown =
        document.getElementById(
            "profileDropdown"
        );

        navProfileImage.addEventListener(
            "click",
            (e) => {

                e.stopPropagation();

                profileDropdown.classList.toggle(
                    "active"
                );

            }
        );

        document.addEventListener(
            "click",
            () => {

                profileDropdown.classList.remove(
                    "active"
                );

            }
        );

        const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );

        logoutBtn.addEventListener(
            "click",
            () => {

                localStorage.removeItem(
                    "isLoggedIn"
                );

                window.location.href =
                "../html/SignIn.html";

            }
        );

    }
);