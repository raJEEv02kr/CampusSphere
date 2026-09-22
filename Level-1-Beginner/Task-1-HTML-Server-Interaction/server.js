const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// EJS configuration
app.set("view engine", "ejs");
app.set("views", "./views");

// Home route
app.get("/", (req, res) => {
    res.render("index");
});

app.post("/register", (req, res) => {

    console.log("REGISTER ROUTE HIT");
    console.log("Form data:", req.body);

    const { fullName, email, department, year, phone } = req.body;

    res.render("success", {
        student: {
            fullName,
            email,
            department,
            year,
            phone
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`CampusSphere is running at http://localhost:${PORT}`);
});
