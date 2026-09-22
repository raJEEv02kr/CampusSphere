const express = require("express");

const app = express();
const PORT = 3001;


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
// Registration + Server-Side Validation
// =========================================

app.post("/register", (req, res) => {

    const {
        fullName,
        email,
        phone,
        department,
        year
    } = req.body;


    // -----------------------------------------
    // Normalize input
    // -----------------------------------------

    const name = fullName?.trim();
    const userEmail = email?.trim();
    const userPhone = phone?.trim();
    const userDepartment = department?.trim();
    const academicYear = year?.trim();


    // -----------------------------------------
    // Validation errors
    // -----------------------------------------

    const errors = [];


    // Full Name
    if (!name) {

        errors.push("Full name is required.");

    } else if (name.length < 3) {

        errors.push(
            "Full name must contain at least 3 characters."
        );

    }


    // Email
    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!userEmail) {

        errors.push("Email address is required.");

    } else if (!emailPattern.test(userEmail)) {

        errors.push(
            "Please enter a valid email address."
        );

    }


    // Phone
    const phonePattern =
        /^[0-9]{10}$/;

    if (!userPhone) {

        errors.push("Phone number is required.");

    } else if (!phonePattern.test(userPhone)) {

        errors.push(
            "Phone number must contain exactly 10 digits."
        );

    }


    // Department
    const validDepartments = [
        "Computer Science & Engineering",
        "Information Technology",
        "Electronics & Communication Engineering",
        "Electrical Engineering",
        "Mechanical Engineering",
        "Civil Engineering"
    ];

    if (!userDepartment) {

        errors.push("Department is required.");

    } else if (
        !validDepartments.includes(userDepartment)
    ) {

        errors.push(
            "Please select a valid department."
        );

    }


    // Academic Year
    const validYears = [
        "1st Year",
        "2nd Year",
        "3rd Year",
        "4th Year"
    ];

    if (!academicYear) {

        errors.push(
            "Academic year is required."
        );

    } else if (
        !validYears.includes(academicYear)
    ) {

        errors.push(
            "Please select a valid academic year."
        );

    }


    // -----------------------------------------
    // Return validation errors
    // -----------------------------------------

    if (errors.length > 0) {

        return res.status(400).render("error", {
            errors,
            formData: {
                fullName: name || "",
                email: userEmail || "",
                phone: userPhone || "",
                department: userDepartment || "",
                year: academicYear || ""
            }
        });

    }


    // -----------------------------------------
    // Successful registration
    // -----------------------------------------

    res.render("success", {
        student: {
            fullName: name,
            email: userEmail,
            phone: userPhone,
            department: userDepartment,
            year: academicYear
        }
    });

});


// =========================================
// Start Server
// =========================================

app.listen(PORT, () => {

    console.log(
        `CampusSphere Task 2 is running at http://localhost:${PORT}`
    );

});
