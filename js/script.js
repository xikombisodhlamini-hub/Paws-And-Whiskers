// =========================
// HELPER FUNCTION
// =========================

function showError(elementId, message) {
    const element = document.getElementById(elementId);

    if (element) {
        element.textContent = message;
        element.style.color = "red";
        element.style.display = "block";
    }
}


// =========================
// ENQUIRY FORM
// =========================

const enquiryForm = document.getElementById("enquiryForm");

if (enquiryForm) {

    enquiryForm.addEventListener("submit", function (event) {

        let valid = true;

        const fullName = document.getElementById("full-name");
        const phone = document.getElementById("phone");
        const email = document.getElementById("email");
        const enquiryType = document.getElementById("enquiry-type");
        const message = document.getElementById("message");

        document.querySelectorAll("small").forEach(function (error) {
            error.textContent = "";
            error.style.display = "none";
        });

        // Full name
        if (fullName.value.trim().length < 2) {

            showError(
                "full-name-error",
                "Please enter your full name."
            );

            valid = false;
        }

        // Phone
        const phonePattern = /^[0-9+\s()-]{10,20}$/;

        if (!phonePattern.test(phone.value.trim())) {

            showError(
                "phone-error",
                "Please enter a valid phone number."
            );

            valid = false;
        }

        // Email
        if (!email.checkValidity()) {

            showError(
                "email-error",
                "Please enter a valid email address."
            );

            valid = false;
        }

        // Enquiry type
        if (enquiryType.value === "") {

            showError(
                "enquiry-type-error",
                "Please select an enquiry type."
            );

            valid = false;
        }

        // Message
        if (message.value.trim().length > 500) {

            showError(
                "message-error",
                "Your message must be 500 characters or less."
            );

            valid = false;
        }

        if (!valid) {
            event.preventDefault();
        }

    });
}


// =========================
// CONTACT FORM - AJAX
// =========================

const contactForm = document.getElementById("contactForm");

if (contactForm) {

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        let valid = true;

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const subject = document.getElementById("subject");
        const message = document.getElementById("message");
        const contactResponse =
            document.getElementById("contactResponse");

        // Clear previous errors
        document.querySelectorAll("small").forEach(function (error) {
            error.textContent = "";
            error.style.display = "none";
        });

        contactResponse.textContent = "";
        contactResponse.style.display = "none";

        // Name validation
        if (name.value.trim().length < 2) {

            showError(
                "name-error",
                "Please enter your full name."
            );

            valid = false;
        }

        // Email validation
        if (!email.checkValidity()) {

            showError(
                "contact-email-error",
                "Please enter a valid email address."
            );

            valid = false;
        }

        // Subject validation
        if (subject.value.trim().length < 3) {

            showError(
                "subject-error",
                "Please enter a subject of at least 3 characters."
            );

            valid = false;
        }

        // Message validation
        if (message.value.trim().length < 10) {

            showError(
                "contact-message-error",
                "Please enter a message of at least 10 characters."
            );

            valid = false;
        }

        // Stop if validation fails
        if (!valid) {
            return;
        }

        // Show sending message
        contactResponse.textContent = "Sending your message...";
        contactResponse.style.color = "#1F4E79";
        contactResponse.style.display = "block";

        try {

            const formData = new FormData(contactForm);

            const response = await fetch(
                contactForm.action,
                {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );

            if (response.ok) {

                contactResponse.textContent =
                    "Thank you! Your message has been sent successfully.";

                contactResponse.style.color = "green";

                contactForm.reset();

            } else {

                contactResponse.textContent =
                    "Sorry, your message could not be sent. Please try again.";

                contactResponse.style.color = "red";
            }

        } catch (error) {

            contactResponse.textContent =
                "There was a connection problem. Please try again.";

            contactResponse.style.color = "red";

        }

    });

}


// =========================
// FAQ ACCORDION
// =========================

const faqQuestions =
    document.querySelectorAll(".faq-question");

faqQuestions.forEach(function (question) {

    question.addEventListener("click", function () {

        const answer =
            this.nextElementSibling;

        if (!answer) {
            return;
        }

        if (answer.style.display === "block") {

            answer.style.display = "none";

        } else {

            answer.style.display = "block";

        }

    });

});


// =========================
// HIDE FAQ ANSWERS ON LOAD
// =========================

const faqAnswers =
    document.querySelectorAll(".faq-answer");

faqAnswers.forEach(function (answer) {

    answer.style.display = "none";

});


// =========================
// ANIMAL FILTER
// =========================

const animalFilter =
    document.getElementById("animal-filter");

const animalCards =
    document.querySelectorAll(".animal-card");

if (animalFilter) {

    animalFilter.addEventListener("change", function () {

        const selectedType = this.value;

        animalCards.forEach(function (card) {

            const animalType =
                card.getAttribute("data-type");

            if (
                selectedType === "all" ||
                selectedType === animalType
            ) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

}