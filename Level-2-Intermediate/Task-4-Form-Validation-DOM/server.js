const express = require("express");

const app = express();
const PORT = 3003;


// =========================================
// Middleware
// =========================================

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


// =========================================
// EJS Configuration
// =========================================

app.set("view engine", "ejs");
app.set("views", "./views");


// =========================================
// Home Route
// =========================================

app.get("/", (req, res) => {
    res.render("index");
});


// =========================================
// Registration Route
// =========================================

app.post("/register", (req, res) => {

    console.log("Task 4 registration received:");

    console.log(req.body);

    res.json({
        success: true,
        message: "Registration received successfully.",
        student: req.body
    });

});


// =========================================
// Start Server
// =========================================

app.listen(PORT, () => {

    console.log(
        `CampusSphere Task 4 is running at http://localhost:${PORT}`
    );

});
