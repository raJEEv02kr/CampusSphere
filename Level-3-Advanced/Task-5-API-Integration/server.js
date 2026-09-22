const express = require("express");

const app = express();
const PORT = 3004;


/* =========================================
   Middleware
   ========================================= */

app.use(express.json());

app.use(express.static("public"));


/* =========================================
   EJS Configuration
   ========================================= */

app.set("view engine", "ejs");

app.set("views", "./views");


/* =========================================
   Campus Event Data
   ========================================= */

const campusEvents = [

    {
        id: 1,
        title: "Web Development Workshop",
        category: "Workshop",
        date: "2026-09-24",
        location: "Innovation Lab",
        description:
            "Hands-on session covering modern frontend development and responsive interfaces."
    },

    {
        id: 2,
        title: "Open Source 101",
        category: "Technical",
        date: "2026-09-27",
        location: "Seminar Hall",
        description:
            "Introduction to open-source contribution, Git workflows and collaborative development."
    },

    {
        id: 3,
        title: "Campus Coding Challenge",
        category: "Competition",
        date: "2026-10-02",
        location: "Computer Centre",
        description:
            "A competitive programming challenge focused on algorithms and problem solving."
    },

    {
        id: 4,
        title: "UI/UX Design Session",
        category: "Design",
        date: "2026-10-06",
        location: "Design Studio",
        description:
            "Explore interface design principles, usability and rapid prototyping."
    }

];


/* =========================================
   Main Page
   ========================================= */

app.get("/", (req, res) => {

    res.render("index");

});


/* =========================================
   API — Get All Events
   ========================================= */

app.get("/api/events", (req, res) => {

    res.json({
        success: true,
        count: campusEvents.length,
        events: campusEvents
    });

});


/* =========================================
   API — Get Event By ID
   ========================================= */

app.get("/api/events/:id", (req, res) => {

    const eventId =
        Number(req.params.id);

    const event =
        campusEvents.find(
            (item) => item.id === eventId
        );


    if (!event) {

        return res.status(404).json({
            success: false,
            message: "Campus event not found."
        });

    }


    res.json({
        success: true,
        event
    });

});


/* =========================================
   Start Server
   ========================================= */

app.listen(PORT, () => {

    console.log(
        `CampusSphere Task 5 is running at http://localhost:${PORT}`
    );

});
