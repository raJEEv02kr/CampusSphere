(() => {
    const themeButton = document.getElementById("themeButton");
    const themeMenu = document.getElementById("themeMenu");
    const themeIcon = document.getElementById("themeIcon");
    const themeOptions = document.querySelectorAll(".theme-option");

    if (!themeButton || !themeMenu) {
        return;
    }

    const savedTheme =
        localStorage.getItem("campusSphereTheme") || "system";

    function getSystemTheme() {
        return window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches
            ? "dark"
            : "light";
    }

    function applyTheme(theme) {
        const activeTheme =
            theme === "system"
                ? getSystemTheme()
                : theme;

        document.documentElement.setAttribute(
            "data-theme",
            activeTheme
        );

        localStorage.setItem(
            "campusSphereTheme",
            theme
        );

        themeOptions.forEach((option) => {
            option.classList.toggle(
                "active",
                option.dataset.theme === theme
            );
        });

        if (theme === "light") {
            themeIcon.textContent = "☀";
        } else if (theme === "dark") {
            themeIcon.textContent = "◐";
        } else {
            themeIcon.textContent = "◌";
        }
    }

    themeButton.addEventListener("click", (event) => {
        event.stopPropagation();

        themeMenu.classList.toggle("show");
    });

    themeOptions.forEach((option) => {
        option.addEventListener("click", (event) => {
            event.stopPropagation();

            applyTheme(option.dataset.theme);

            themeMenu.classList.remove("show");
        });
    });

    document.addEventListener("click", () => {
        themeMenu.classList.remove("show");
    });

    const systemTheme = window.matchMedia(
        "(prefers-color-scheme: dark)"
    );

    systemTheme.addEventListener("change", () => {
        const currentTheme =
            localStorage.getItem("campusSphereTheme");

        if (currentTheme === "system") {
            applyTheme("system");
        }
    });

    applyTheme(savedTheme);
})();
