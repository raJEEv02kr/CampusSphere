
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const cookieParser = require("cookie-parser");
const authenticateToken = require("./middleware/auth");

const User = require("./models/User");

const app = express();

const PORT = process.env.PORT || 3005;
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// =========================================
// Middleware
// =========================================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
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

app.post("/register", async (req, res) => {
    try {
        const {
            fullName,
            email,
            phone,
            department,
            academicYear,
            password,
            confirmPassword
        } = req.body;

        // Validate required fields
        if (
            !fullName ||
            !email ||
            !phone ||
            !department ||
            !academicYear ||
            !password ||
            !confirmPassword
        ) {
            return res.status(400).send(`
                <h2>Registration Failed</h2>
                <p>All fields are required.</p>
                <a href="/">Go back</a>
            `);
        }

        // Check password confirmation
        if (password !== confirmPassword) {
            return res.status(400).send(`
                <h2>Registration Failed</h2>
                <p>Passwords do not match.</p>
                <a href="/">Go back</a>
            `);
        }

        // Check password length
        if (password.length < 6) {
            return res.status(400).send(`
                <h2>Registration Failed</h2>
                <p>Password must contain at least 6 characters.</p>
                <a href="/">Go back</a>
            `);
        }

        // Check whether the email already exists
        const existingUser = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if (existingUser) {
            return res.status(409).send(`
                <h2>Registration Failed</h2>
                <p>An account with this email already exists.</p>
                <a href="/">Go back</a>
            `);
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            fullName: fullName.trim(),
            email: email.toLowerCase().trim(),
            phone: phone.trim(),
            department: department.trim(),
            academicYear,
            password: hashedPassword
        });

        // Save user in MongoDB Atlas
        await newUser.save();

        console.log("New user registered:", newUser.email);

        res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Registration Successful</title>
                <style>
                    body {
                        margin: 0;
                        min-height: 100vh;
                        display: grid;
                        place-items: center;
                        font-family: Arial, sans-serif;
                        background: #f7f9fc;
                        color: #172238;
                    }

                    .success-card {
                        width: min(420px, calc(100% - 40px));
                        padding: 40px;
                        text-align: center;
                        background: white;
                        border: 1px solid #e2e8f0;
                        border-radius: 18px;
                        box-shadow: 0 20px 50px rgba(23, 34, 56, 0.08);
                    }

                    h2 {
                        color: #1b9b68;
                    }

                    a {
                        display: inline-block;
                        margin-top: 20px;
                        padding: 12px 20px;
                        color: white;
                        background: #315cf5;
                        border-radius: 8px;
                        text-decoration: none;
                    }
                </style>
            </head>
            <body>
                <div class="success-card">
                    <h2>Registration Successful</h2>
                    <p>Your CampusSphere account has been created successfully.</p>
                    <a href="/">Continue to Login</a>
                </div>
            </body>
            </html>
        `);

    } catch (error) {
        console.error("Registration error:", error.message);

        res.status(500).send(`
            <h2>Registration Failed</h2>
            <p>Something went wrong while creating your account.</p>
            <a href="/">Try again</a>
        `);
    }
});

// =========================================
// Login Route
// =========================================

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate fields
        if (!email || !password) {
            return res.status(400).send(`
                <h2>Login Failed</h2>
                <p>Email and password are required.</p>
                <a href="/">Go back</a>
            `);
        }

        // Find user by email
        const user = await User.findOne({
            email: email.toLowerCase().trim()
        });

        if (!user) {
            return res.status(401).send(`
                <h2>Login Failed</h2>
                <p>Invalid email or password.</p>
                <a href="/">Try again</a>
            `);
        }

        // Compare entered password with hashed password
        const isPasswordValid = await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).send(`
                <h2>Login Failed</h2>
                <p>Invalid email or password.</p>
                <a href="/">Try again</a>
            `);
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                email: user.email
            },
            JWT_SECRET,
            {
                expiresIn: "1h"
            }
        );

        console.log("User logged in:", user.email);

            res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 1000
        });

        res.redirect("/dashboard");

    } catch (error) {
        console.error("Login error:", error.message);

        res.status(500).send(`
            <h2>Login Failed</h2>
            <p>Something went wrong during login.</p>
            <a href="/">Try again</a>
        `);
    }
});

// =========================================
// Protected Dashboard Route
// =========================================

app.get("/dashboard", authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select("-password");

        if (!user) {
            return res.redirect("/logout");
        }

        res.render("dashboard", {
            user: {
                fullName: user.fullName,
                email: user.email,
                phone: user.phone,
                department: user.department,
                academicYear: user.academicYear
            }
        });

    } catch (error) {
        console.error("Dashboard error:", error.message);
        return res.redirect("/");
    }
});

// =========================================
// Logout Route
// =========================================

app.get("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        path: "/"
    });

    console.log("User logged out. JWT cookie cleared.");

    res.redirect("/");
});

// =========================================
// API: Check Database Connection
// =========================================

app.get("/api/health", (req, res) => {
    const databaseStatus =
        mongoose.connection.readyState === 1
            ? "connected"
            : "disconnected";

    res.json({
        success: true,
        database: databaseStatus,
        server: "running"
    });
});

// =========================================
// Start MongoDB Connection and Server
// =========================================

async function connectDatabase() {
    try {
        if (!MONGODB_URI) {
            throw new Error(
                "MONGODB_URI is missing from the .env file."
            );
        }

        if (!JWT_SECRET) {
            throw new Error(
                "JWT_SECRET is missing from the .env file."
            );
        }

        await mongoose.connect(MONGODB_URI);

        console.log("MongoDB Atlas connected successfully.");

        app.listen(PORT, () => {
            console.log(
                `CampusSphere Task 6 is running at http://localhost:${PORT}`
            );
        });

    } catch (error) {
        console.error(
            "MongoDB connection failed:",
            error.message
        );

        process.exit(1);
    }
}

connectDatabase();
