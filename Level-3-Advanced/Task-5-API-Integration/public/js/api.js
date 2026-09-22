/* =========================================
   CampusSphere — Level 3 Task 5
   API Integration
   ========================================= */

(() => {

    const eventGrid =
        document.getElementById("eventGrid");

    const loadingState =
        document.getElementById("loadingState");

    const errorState =
        document.getElementById("errorState");

    const eventCount =
        document.getElementById("eventCount");


    // =========================================
    // Safety Check
    // =========================================

    if (!eventGrid) {
        console.error(
            "CampusSphere: Event grid not found."
        );

        return;
    }


    // =========================================
    // Format Date
    // =========================================

    function formatDate(dateString) {

        const date =
            new Date(dateString);

        return date.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
                year: "numeric"
            }
        );

    }


    // =========================================
    // Create Event Card
    // =========================================

    function createEventCard(event) {

        const card =
            document.createElement("article");

        card.className =
            "event-card";


        card.innerHTML = `

            <div class="event-card-top">

                <span class="event-category">
                    ${event.category}
                </span>

                <span class="event-id">
                    #${String(event.id).padStart(2, "0")}
                </span>

            </div>


            <div class="event-content">

                <h3>
                    ${event.title}
                </h3>

                <p>
                    ${event.description}
                </p>

            </div>


            <div class="event-meta">

                <span>
                    ${formatDate(event.date)}
                </span>

                <span>
                    ${event.location}
                </span>

            </div>

        `;


        return card;

    }


    // =========================================
    // Render Events
    // =========================================

    function renderEvents(events) {

        eventGrid.innerHTML = "";


        events.forEach((event) => {

            const card =
                createEventCard(event);

            eventGrid.appendChild(card);

        });

    }


    // =========================================
    // Fetch Events From API
    // =========================================

    async function loadEvents() {

        try {

            // Show loading state

            loadingState.style.display =
                "flex";

            errorState.style.display =
                "none";


            // Request API

            const response =
                await fetch("/api/events");


            // Check HTTP response

            if (!response.ok) {

                throw new Error(
                    `API request failed with status ${response.status}`
                );

            }


            // Convert response to JSON

            const data =
                await response.json();


            console.log(
                "CampusSphere API response:",
                data
            );


            // Check API response

            if (!data.success) {

                throw new Error(
                    "API returned an unsuccessful response."
                );

            }


            // Render API data

            renderEvents(data.events);


            // Update event count

            if (eventCount) {

                eventCount.textContent =
                    `${data.count} upcoming events`;

            }


            // Hide loading state

            loadingState.style.display =
                "none";


        } catch (error) {

            console.error(
                "CampusSphere API Error:",
                error
            );


            loadingState.style.display =
                "none";


            errorState.style.display =
                "block";


            errorState.textContent =
                `Unable to load campus events: ${error.message}`;

        }

    }


    // =========================================
    // Initialize
    // =========================================

    loadEvents();

})();
