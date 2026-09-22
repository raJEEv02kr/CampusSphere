/* =========================================
   CampusSphere — Level 2 Task 3
   Responsive Navigation + Device Preview
   ========================================= */

(() => {

    const menuButton =
        document.getElementById("menuButton");

    const mobileMenu =
        document.getElementById("mobileMenu");

    const deviceCards =
        document.querySelectorAll(".device-card");


    // =========================================
    // Mobile Navigation
    // =========================================

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", (event) => {

            event.stopPropagation();

            const isOpen =
                mobileMenu.classList.toggle("show");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

        });


        // Close menu after selecting a link

        const mobileLinks =
            mobileMenu.querySelectorAll("a");

        mobileLinks.forEach((link) => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("show");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });


        // Close menu when clicking outside

        document.addEventListener("click", (event) => {

            if (
                !mobileMenu.contains(event.target) &&
                !menuButton.contains(event.target)
            ) {

                mobileMenu.classList.remove("show");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });


        // Close mobile menu when returning to desktop

        window.addEventListener("resize", () => {

            if (window.innerWidth > 600) {

                mobileMenu.classList.remove("show");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    }


    // =========================================
    // Device Preview Selector
    // =========================================

    if (deviceCards.length > 0) {

        deviceCards.forEach((card) => {

            card.addEventListener("click", () => {

                const selectedPreview =
                    card.dataset.preview;


                // Remove active state

                deviceCards.forEach((item) => {

                    item.classList.remove("active");

                });


                // Activate selected card

                card.classList.add("active");


                // Remove previous preview mode

                document.body.classList.remove(
                    "preview-desktop",
                    "preview-tablet",
                    "preview-mobile"
                );


                // Apply selected preview mode

                document.body.classList.add(
                    `preview-${selectedPreview}`
                );


                // Return viewport to the responsive section

                const responsiveSection =
                    document.querySelector(
                        ".responsive-section"
                    );

                if (responsiveSection) {

                    responsiveSection.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }

            });

        });

    }


    // =========================================
    // Default Preview
    // =========================================

    document.body.classList.add(
        "preview-desktop"
    );

})();
