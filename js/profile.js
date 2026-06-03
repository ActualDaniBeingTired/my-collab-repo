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
                src="../Icons/user.png"
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

    if (toggle && menu) {

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

                if (
                    !e.target.closest(
                        ".profile-dropdown"
                    )
                ) {

                    menu.classList.remove(
                        "active"
                    );

                }

            }
        );

    }

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