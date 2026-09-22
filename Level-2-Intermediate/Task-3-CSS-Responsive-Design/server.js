const express = require("express");

const app = express();
const PORT = 3002;


// =========================================
// Middleware
// =========================================

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
// Start Server
// =========================================

app.listen(PORT, () => {
    console.log(
        `CampusSphere Task 3 is running at http://localhost:${PORT}`
    );
});
