/* =========================
   PROFILE DATA
========================= */

let profileData = {};

let applicationData = [];

/* =========================
   ELEMENTS
========================= */

const profileTab =
document.getElementById(
    "profileTab"
);

const applicationTab =
document.getElementById(
    "applicationTab"
);

const tabButtons =
document.querySelectorAll(
    ".tab-btn"
);

const editModal =
document.getElementById(
    "editModal"
);

const editProfileBtn =
document.getElementById(
    "editProfileBtn"
);

const closeModal =
document.querySelector(
    ".close-modal"
);

const saveProfileBtn =
document.getElementById(
    "saveProfileBtn"
);

const profileUpload =
document.getElementById(
    "profileUpload"
);

/* =========================
   LOAD PROFILE
========================= */

function loadProfile() {

    const savedProfile =

    JSON.parse(
        localStorage.getItem(
            "profileData"
        )
    );

    if (savedProfile) {

        profileData =
        savedProfile;

    } else {

        const user =

        JSON.parse(
            localStorage.getItem(
                "registeredUser"
            )
        );

        profileData = {

            name:
            user?.fullName || "",

            email:
            user?.email || "",

            phone:
            user?.phone || "",

            location:
            user?.address || "",

            jobTitle:
            "Healthcare Professional",

            about:
            "Tell employers about yourself.",

            skills: [],

            certifications: [],

            profileImage:
            "../Images/default-profile.png"

        };

    }

    renderProfile();

}

loadProfile();

/* =========================
   RENDER PROFILE
========================= */

function renderProfile() {

    const profileName =
    document.getElementById(
        "profileName"
    );

    const profileJob =
    document.getElementById(
        "profileJob"
    );

    const profilePhone =
    document.getElementById(
        "profilePhone"
    );

    const profileEmail =
    document.getElementById(
        "profileEmail"
    );

    const profileLocation =
    document.getElementById(
        "profileLocation"
    );

    const profileAbout =
    document.getElementById(
        "profileAbout"
    );

    if (profileName)
        profileName.textContent =
        profileData.name;

    if (profileJob)
        profileJob.textContent =
        profileData.jobTitle;

    if (profilePhone)
        profilePhone.textContent =
        profileData.phone;

    if (profileEmail)
        profileEmail.textContent =
        profileData.email;

    if (profileLocation)
        profileLocation.textContent =
        profileData.location;

    if (profileAbout)
        profileAbout.textContent =
        profileData.about;

    const profileImage =
    document.getElementById(
        "profileImage"
    );

    if (profileImage) {

        profileImage.src =
        profileData.profileImage;

    }

    renderSkills();
    renderCertifications();

}
/* =========================
   SKILLS
========================= */

function renderSkills() {

    const container =
    document.getElementById(
        "skillsContainer"
    );

    container.innerHTML = "";

    profileData.skills.forEach(
        skill => {

            container.innerHTML += `

            <span class="tag">

                ${skill}

            </span>

            `;

        }
    );

}

/* =========================
   CERTIFICATIONS
========================= */

function renderCertifications() {

    const container =
    document.getElementById(
        "certificationContainer"
    );

    container.innerHTML = "";

    profileData.certifications.forEach(
        cert => {

            container.innerHTML += `

            <span class="tag">

                ${cert}

            </span>

            `;

        }
    );

}

/* =========================
   APPLICATIONS
========================= */

function loadApplications() {

    applicationData =

    JSON.parse(
        localStorage.getItem(
            "applications"
        )
    ) || [];

    renderApplications();

}

loadApplications();

function renderApplications() {

    const container =
    document.getElementById(
        "applicationContainer"
    );

    if (!container) return;

    container.innerHTML = "";

    applicationData.forEach(
        app => {

            container.innerHTML += `

            <div class="application-card">

                <h3>
                    ${app.jobTitle}
                </h3>

                <p>
                    ${app.company}
                </p>

                <p>
                    ${app.location}
                </p>

                <p>
                    ${app.salary}
                </p>

                <span
                    class="status ${app.status.toLowerCase()}"
                >

                    ${app.status}

                </span>

            </div>

            `;

        }
    );

    updateStats();

}

/* =========================
   STATS
========================= */

function updateStats() {

    document.getElementById(
        "appliedCount"
    ).textContent =
    applicationData.length;

    const savedJobs =

    JSON.parse(
        localStorage.getItem(
            "savedJobs"
        )
    ) || [];

    document.getElementById(
        "savedCount"
    ).textContent =
    savedJobs.length;

    document.getElementById(
        "interviewCount"
    ).textContent =

    applicationData.filter(
        app =>
        app.status ===
        "Accepted"
    ).length;

}

/* =========================
   TAB SWITCHING
========================= */

tabButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            tabButtons.forEach(btn => {

                btn.classList.remove(
                    "active"
                );

            });

            button.classList.add(
                "active"
            );

            const tab =
            button.dataset.tab;

            profileTab.classList.remove(
                "active"
            );

            applicationTab.classList.remove(
                "active"
            );

            if (
                tab === "profile"
            ) {

                profileTab.classList.add(
                    "active"
                );

            } else {

                applicationTab.classList.add(
                    "active"
                );

            }

        }
    );

});

/* =========================
   OPEN MODAL
========================= */

if (editProfileBtn) {

    editProfileBtn.onclick = () => {

        document.getElementById(
            "editName"
        ).value =
        profileData.name;

        document.getElementById(
            "editJob"
        ).value =
        profileData.jobTitle;

        document.getElementById(
            "editPhone"
        ).value =
        profileData.phone;

        document.getElementById(
            "editEmail"
        ).value =
        profileData.email;

        document.getElementById(
            "editLocation"
        ).value =
        profileData.location;

        document.getElementById(
            "editAbout"
        ).value =
        profileData.about;

        document.getElementById(
            "editSkills"
        ).value =
        profileData.skills.join(", ");

        document.getElementById(
            "editCertifications"
        ).value =
        profileData.certifications.join(", ");

        editModal.classList.add(
            "active"
        );

    };

}

/* =========================
   CLOSE MODAL
========================= */

if (closeModal) {

    closeModal.onclick = () => {

        editModal.classList.remove(
            "active"
        );

    };

}

/* =========================
   PHOTO UPLOAD
========================= */

if (profileUpload) {

    profileUpload.addEventListener(
        "change",
        function () {

            const file =
            this.files[0];

            if (!file) return;

            const reader =
            new FileReader();

            reader.onload =
            function(event){

                profileData.profileImage =
                event.target.result;

                document
                .getElementById(
                    "profileImage"
                )
                .src =
                event.target.result;

                const navProfile =
                document.getElementById(
                    "navProfileImage"
                );

                if (navProfile) {

                    navProfile.src =
                    event.target.result;

                }

            };

            reader.readAsDataURL(
                file
            );

        }
    );

}

/* =========================
   SAVE PROFILE
========================= */

if (saveProfileBtn) {

    saveProfileBtn.onclick = () => {

        profileData.name =
        document.getElementById(
            "editName"
        ).value;

        profileData.jobTitle =
        document.getElementById(
            "editJob"
        ).value;

        profileData.phone =
        document.getElementById(
            "editPhone"
        ).value;

        profileData.email =
        document.getElementById(
            "editEmail"
        ).value;

        profileData.location =
        document.getElementById(
            "editLocation"
        ).value;

        profileData.about =
        document.getElementById(
            "editAbout"
        ).value;

        profileData.skills =
        document
        .getElementById(
            "editSkills"
        )
        .value
        .split(",")
        .map(skill =>
            skill.trim()
        )
        .filter(skill =>
            skill.length > 0
        );

        profileData.certifications =

        document
        .getElementById(
            "editCertifications"
        )
        .value
        .split(",")

        .map(cert =>
            cert.trim()
        )

        .filter(cert =>
            cert !== ""
        );

        localStorage.setItem(

            "profileData",

            JSON.stringify(
                profileData
            )

        );

        renderProfile();

        editModal.classList.remove(
            "active"
        );

        alert(
            "Profile updated successfully!"
        );

    };

}

window.addEventListener(
    "click",
    (e) => {

        if (
            e.target === editModal
        ) {

            editModal.classList.remove(
                "active"
            );

        }

    }
);
