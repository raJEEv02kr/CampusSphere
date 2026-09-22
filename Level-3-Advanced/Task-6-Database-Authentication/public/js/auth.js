document.addEventListener("DOMContentLoaded", function () {
    const registerTab = document.getElementById("registerTab");
    const loginTab = document.getElementById("loginTab");

    const registerForm = document.getElementById("registerForm");
    const loginForm = document.getElementById("loginForm");

    const formTitle = document.getElementById("formTitle");
    const formDescription = document.getElementById("formDescription");
    const formFooter = document.getElementById("formFooter");

    function showLoginForm() {
        registerForm.hidden = true;
        loginForm.hidden = false;

        registerTab.classList.remove("active");
        loginTab.classList.add("active");

        formTitle.textContent = "Welcome back";

        formDescription.textContent =
            "Login to access your CampusSphere account.";

        formFooter.innerHTML = `
            Don't have an account?
            <button type="button" id="switchToRegister">
                Register here
            </button>
        `;

        console.log("Login form opened.");
    }

    function showRegisterForm() {
        registerForm.hidden = false;
        loginForm.hidden = true;

        registerTab.classList.add("active");
        loginTab.classList.remove("active");

        formTitle.textContent = "Create your account";

        formDescription.textContent =
            "Register to get started with your campus account.";

        formFooter.innerHTML = `
            Already have an account?
            <button type="button" id="switchToLogin">
                Login here
            </button>
        `;

        console.log("Register form opened.");
    }

    registerTab.addEventListener("click", showRegisterForm);
    loginTab.addEventListener("click", showLoginForm);

    formFooter.addEventListener("click", function (event) {
        const clickedButton = event.target.closest("button");

        if (!clickedButton) {
            return;
        }

        if (clickedButton.id === "switchToLogin") {
            showLoginForm();
        }

        if (clickedButton.id === "switchToRegister") {
            showRegisterForm();
        }
    });

    console.log("CampusSphere frontend auth.js loaded.");
});
