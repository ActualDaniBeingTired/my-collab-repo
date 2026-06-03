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