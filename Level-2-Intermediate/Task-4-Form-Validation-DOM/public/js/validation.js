/* =========================================
   CampusSphere — Level 2 Task 4
   Client-Side Form Validation & DOM
   ========================================= */

(() => {

    // =========================================
    // Form Elements
    // =========================================

    const form =
        document.getElementById("registrationForm");

    const formStatus =
        document.getElementById("formStatus");

    const formMessage =
        document.getElementById("formMessage");

    const submitButton =
        document.getElementById("submitButton");


    const fields = {

        fullName: {
            input: document.getElementById("fullName"),
            feedback: document.getElementById(
                "fullNameFeedback"
            )
        },

        email: {
            input: document.getElementById("email"),
            feedback: document.getElementById(
                "emailFeedback"
            )
        },

        phone: {
            input: document.getElementById("phone"),
            feedback: document.getElementById(
                "phoneFeedback"
            )
        },

        department: {
            input: document.getElementById("department"),
            feedback: document.getElementById(
                "departmentFeedback"
            )
        },

        year: {
            input: document.getElementById("year"),
            feedback: document.getElementById(
                "yearFeedback"
            )
        }

    };


    // =========================================
    // Safety Check
    // =========================================

    if (
        !form ||
        !formStatus ||
        !formMessage ||
        !submitButton
    ) {
        return;
    }


    // =========================================
    // Validation Functions
    // =========================================

    function validateFullName(value) {

        const name = value.trim();

        if (!name) {

            return {
                valid: false,
                message: "Full name is required."
            };

        }

        if (name.length < 3) {

            return {
                valid: false,
                message:
                    "Full name must contain at least 3 characters."
            };

        }

        return {
            valid: true,
            message: "Full name looks good."
        };

    }


    function validateEmail(value) {

        const email = value.trim();

        if (!email) {

            return {
                valid: false,
                message: "Email address is required."
            };

        }

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            return {
                valid: false,
                message:
                    "Please enter a valid email address."
            };

        }

        return {
            valid: true,
            message: "Email address looks valid."
        };

    }


    function validatePhone(value) {

        const phone = value.trim();

        if (!phone) {

            return {
                valid: false,
                message: "Phone number is required."
            };

        }

        const phonePattern =
            /^[0-9]{10}$/;

        if (!phonePattern.test(phone)) {

            return {
                valid: false,
                message:
                    "Phone number must contain exactly 10 digits."
            };

        }

        return {
            valid: true,
            message: "Phone number looks valid."
        };

    }


    function validateDepartment(value) {

        if (!value) {

            return {
                valid: false,
                message: "Please select your department."
            };

        }

        return {
            valid: true,
            message: "Department selected."
        };

    }


    function validateYear(value) {

        if (!value) {

            return {
                valid: false,
                message: "Please select your academic year."
            };

        }

        return {
            valid: true,
            message: "Academic year selected."
        };

    }


    // =========================================
    // DOM Feedback
    // =========================================

    function updateField(
        field,
        result,
        showFeedback = true
    ) {

        const input = field.input;
        const feedback = field.feedback;


        input.classList.remove(
            "valid",
            "invalid"
        );


        feedback.classList.remove(
            "success",
            "error"
        );


        if (!showFeedback) {

            feedback.textContent = "";

            return;

        }


        if (result.valid) {

            input.classList.add("valid");

            feedback.classList.add("success");

            feedback.textContent =
                `✓ ${result.message}`;

        } else {

            input.classList.add("invalid");

            feedback.classList.add("error");

            feedback.textContent =
                `✕ ${result.message}`;

        }

    }


    // =========================================
    // Field Validators
    // =========================================

    function validateField(fieldName) {

        const field = fields[fieldName];

        const value = field.input.value;

        let result;


        switch (fieldName) {

            case "fullName":
                result = validateFullName(value);
                break;

            case "email":
                result = validateEmail(value);
                break;

            case "phone":
                result = validatePhone(value);
                break;

            case "department":
                result = validateDepartment(value);
                break;

            case "year":
                result = validateYear(value);
                break;

            default:
                return false;

        }


        updateField(field, result);

        return result.valid;

    }


    // =========================================
    // Validate Entire Form
    // =========================================

    function validateForm() {

        const results = [

            validateField("fullName"),

            validateField("email"),

            validateField("phone"),

            validateField("department"),

            validateField("year")

        ];


        return results.every(
            (result) => result === true
        );

    }


    // =========================================
    // Form Status
    // =========================================

    function updateFormStatus() {

        const values = {

            fullName:
                fields.fullName.input.value.trim(),

            email:
                fields.email.input.value.trim(),

            phone:
                fields.phone.input.value.trim(),

            department:
                fields.department.input.value,

            year:
                fields.year.input.value

        };


        const hasInput =
            Object.values(values).some(
                (value) => value !== ""
            );


        if (!hasInput) {

            formStatus.textContent =
                "Awaiting input";

            formStatus.className =
                "form-status";

            return;

        }


        const allValid = [

            validateFullName(values.fullName).valid,

            validateEmail(values.email).valid,

            validatePhone(values.phone).valid,

            validateDepartment(values.department).valid,

            validateYear(values.year).valid

        ].every(
            (result) => result === true
        );


        if (allValid) {

            formStatus.textContent =
                "Ready to submit";

            formStatus.className =
                "form-status ready";

        } else {

            formStatus.textContent =
                "Checking details";

            formStatus.className =
                "form-status checking";

        }

    }


    // =========================================
    // Real-Time Input Validation
    // =========================================

    fields.fullName.input.addEventListener(
        "input",
        () => {

            validateField("fullName");

            updateFormStatus();

        }
    );


    fields.email.input.addEventListener(
        "input",
        () => {

            validateField("email");

            updateFormStatus();

        }
    );


    fields.phone.input.addEventListener(
        "input",
        () => {

            // Keep phone input numeric

            fields.phone.input.value =
                fields.phone.input.value.replace(
                    /\D/g,
                    ""
                );

            validateField("phone");

            updateFormStatus();

        }
    );


    fields.department.input.addEventListener(
        "change",
        () => {

            validateField("department");

            updateFormStatus();

        }
    );


    fields.year.input.addEventListener(
        "change",
        () => {

            validateField("year");

            updateFormStatus();

        }
    );


    // =========================================
    // Form Submission
    // =========================================

    form.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            formMessage.className =
                "form-message";


            formMessage.textContent = "";


            const isValid =
                validateForm();


            if (!isValid) {

                formMessage.classList.add(
                    "error"
                );

                formMessage.textContent =
                    "Please correct the highlighted fields before continuing.";

                formStatus.textContent =
                    "Validation failed";

                formStatus.className =
                    "form-status error";

                return;

            }


            // =================================
            // Successful Client Validation
            // =================================

            formMessage.classList.add(
                "success"
            );

            formMessage.textContent =
                "All fields are valid. Submitting your registration...";


            formStatus.textContent =
                "Validated";

            formStatus.className =
                "form-status ready";


            submitButton.disabled = true;

            submitButton.classList.add(
                "submitting"
            );


            /*
             * Submit the form after the
             * validation feedback is displayed.
             */

            setTimeout(() => {

                form.submit();

            }, 500);

        }
    );


})();
