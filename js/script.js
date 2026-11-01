
/* =========================================
   PAWS & WHISKERS ANIMAL RESCUE
   Main JavaScript File
========================================= */


/* 1. FORM ERROR HANDLING */

function showError(element, message) {
    if (!element) return;

    element.textContent = message;
    element.hidden = false;
    element.style.display = "block";
}

function clearErrors(form) {
    if (!form) return;

    form.querySelectorAll("small").forEach(error => {
        error.textContent = "";
        error.hidden = true;
        error.style.display = "none";
    });

    form.querySelectorAll("[aria-invalid='true']").forEach(field => {
        field.removeAttribute("aria-invalid");
    });
}

function markInvalid(field, errorElement, message) {
    if (!field) return;

    field.setAttribute("aria-invalid", "true");

    if (errorElement) {
        field.setAttribute("aria-describedby", errorElement.id);
        showError(errorElement, message);
    }
}


/* 2. ENQUIRY FORM VALIDATION AND AJAX SUBMISSION */

const enquiryForm = document.querySelector(
    "#enquiryForm, form[action*='mzezbqyo']"
);

if (enquiryForm) {
    enquiryForm.noValidate = true;

    enquiryForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        clearErrors(enquiryForm);

        const responseMessage =
            document.getElementById("enquiryResponse");

        if (responseMessage) {
            responseMessage.textContent = "";
            responseMessage.className = "form-response";
        }

        let isValid = true;

        const fullName = document.getElementById("full-name");
        const phone = document.getElementById("phone");
        const email = document.getElementById("email");
        const enquiryType = document.getElementById("enquiry-type");
        const message = document.getElementById("message");

        const fullNameError =
            document.getElementById("full-name-error");

        const phoneError =
            document.getElementById("phone-error");

        const emailError =
            document.getElementById("email-error");

        const enquiryTypeError =
            document.getElementById("enquiry-type-error");

        const messageError =
            document.getElementById("message-error");

        // Validate full name
        if (fullName && fullName.value.trim().length < 2) {
            markInvalid(
                fullName,
                fullNameError,
                "Please enter your full name."
            );
            isValid = false;
        }

        // Validate phone number
        if (phone && !/^[+0-9()\s-]{7,20}$/.test(phone.value.trim())) {
            markInvalid(
                phone,
                phoneError,
                "Please enter a valid phone number."
            );
            isValid = false;
        }

        // Validate email address
        if (email && !email.validity.valid) {
            markInvalid(
                email,
                emailError,
                "Please enter a valid email address."
            );
            isValid = false;
        }

        // Validate enquiry type
        if (enquiryType && enquiryType.value.trim() === "") {
            markInvalid(
                enquiryType,
                enquiryTypeError,
                "Please select an enquiry type."
            );
            isValid = false;
        }

        // Validate additional message if provided
        if (message && message.value.trim().length > 0 &&
            message.value.trim().length < 10) {

            markInvalid(
                message,
                messageError,
                "Please enter at least 10 characters or leave this field empty."
            );
            isValid = false;
        }

        // Stop submission if validation fails
        if (!isValid) {
            const firstInvalid = enquiryForm.querySelector(
                "[aria-invalid='true']"
            );

            if (firstInvalid) firstInvalid.focus();
            return;
        }

        // Prepare the submit button
        const submitButton = enquiryForm.querySelector(
            "button[type='submit']"
        );

        const originalButtonText = submitButton
            ? submitButton.textContent
            : "";

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Submitting...";
        }

        // Prepare a confirmation message based on enquiry type
        const confirmationMessages = {
            volunteer:
                "Thank you for your interest in volunteering! Our team will review your availability and areas of interest and contact you with information about suitable opportunities.",

            sponsor:
                "Thank you for your interest in sponsoring Paws & Whiskers! Our team will review your enquiry and contact you to discuss sponsorship opportunities and available options.",

            adoption:
                "Thank you for your adoption enquiry! Our team will contact you with information about the adoption process, suitable animals and the next steps.",

            general:
                "Thank you for contacting Paws & Whiskers! Our team will review your enquiry and get back to you with the relevant information."
        };

        try {
            // Send enquiry to Formspree using AJAX
            const response = await fetch(enquiryForm.action, {
                method: "POST",
                body: new FormData(enquiryForm),
                headers: {
                    Accept: "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("The enquiry could not be submitted.");
            }

            if (responseMessage) {
                responseMessage.textContent =
                    confirmationMessages[enquiryType.value] ||
                    confirmationMessages.general;

                responseMessage.classList.add("form-success");
            }

            // Clear the form after successful submission
            enquiryForm.reset();
            clearErrors(enquiryForm);

        } catch (error) {
            if (responseMessage) {
                responseMessage.textContent =
                    "Sorry, your enquiry could not be submitted. Please check your internet connection and try again later.";

                responseMessage.classList.add("form-error");
            }

        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        }
    });
}


/* 3. CONTACT FORM VALIDATION AND AJAX SUBMISSION */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.noValidate = true;

    contactForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        clearErrors(contactForm);

        const responseMessage =
            document.getElementById("contactResponse");

        if (responseMessage) {
            responseMessage.textContent = "";
            responseMessage.className = "form-response";
        }

        let isValid = true;

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const category = document.getElementById("message-category");
        const subject = document.getElementById("subject");
        const message = document.getElementById("message");

        const nameError = document.getElementById("name-error");
        const emailError =
            document.getElementById("contact-email-error");

        const categoryError =
            document.getElementById("category-error");

        const subjectError =
            document.getElementById("subject-error");

        const messageError =
            document.getElementById("contact-message-error");

        // Validate full name
        if (name && name.value.trim().length < 2) {
            markInvalid(
                name,
                nameError,
                "Please enter your full name."
            );
            isValid = false;
        }

        // Validate email address
        if (email && !email.validity.valid) {
            markInvalid(
                email,
                emailError,
                "Please enter a valid email address."
            );
            isValid = false;
        }

        // Validate message category
        if (category && category.value.trim() === "") {
            markInvalid(
                category,
                categoryError,
                "Please select a message category."
            );
            isValid = false;
        }

        // Validate subject
        if (subject && subject.value.trim().length < 3) {
            markInvalid(
                subject,
                subjectError,
                "Please enter a subject of at least 3 characters."
            );
            isValid = false;
        }

        // Validate message
        if (message && message.value.trim().length < 10) {
            markInvalid(
                message,
                messageError,
                "Please enter a message of at least 10 characters."
            );
            isValid = false;
        }

        // Stop submission if validation fails
        if (!isValid) {
            const firstInvalid = contactForm.querySelector(
                "[aria-invalid='true']"
            );

            if (firstInvalid) firstInvalid.focus();
            return;
        }

        // Prepare the submit button
        const submitButton = contactForm.querySelector(
            "button[type='submit']"
        );

        const originalButtonText = submitButton
            ? submitButton.textContent
            : "";

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
        }

        try {
            // Submit contact message using AJAX
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: {
                    Accept: "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("The message could not be sent.");
            }

            if (responseMessage) {
                responseMessage.textContent =
                    "Thank you! Your message has been sent successfully. We will get back to you soon.";

                responseMessage.classList.add("form-success");
            }

            contactForm.reset();
            clearErrors(contactForm);

        } catch (error) {
            if (responseMessage) {
                responseMessage.textContent =
                    "Sorry, your message could not be sent. Please try again later.";

                responseMessage.classList.add("form-error");
            }

        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalButtonText;
            }
        }
    });
}


/* 4. FAQ ACCORDION */

const faqButtons = document.querySelectorAll(".faq-question");

faqButtons.forEach(button => {
    button.addEventListener("click", function () {
        const answerId = button.getAttribute("aria-controls");
        const answer = document.getElementById(answerId);

        if (!answer) return;

        const isExpanded =
            button.getAttribute("aria-expanded") === "true";

        button.setAttribute("aria-expanded", String(!isExpanded));
        answer.hidden = isExpanded;
    });
});


/* 5. ANIMAL SEARCH AND FILTER */

const animalFilter = document.getElementById("animal-filter");
const animalSearch = document.getElementById("animal-search");
const animalResults = document.getElementById("animal-results");

const animalCards = document.querySelectorAll(
    ".animal-grid .animal-card"
);

function updateAnimalResults() {
    if (!animalCards.length) return;

    const selectedType = animalFilter
        ? animalFilter.value.toLowerCase()
        : "all";

    const searchTerm = animalSearch
        ? animalSearch.value.trim().toLowerCase()
        : "";

    let visibleCount = 0;

    animalCards.forEach(card => {
        const animalType = (
            card.getAttribute("data-type") || ""
        ).toLowerCase();

        const animalInformation = card.textContent.toLowerCase();

        const matchesType =
            selectedType === "all" ||
            selectedType === "" ||
            animalType === selectedType;

        const matchesSearch =
            animalInformation.includes(searchTerm);

        const shouldDisplay = matchesType && matchesSearch;

        card.hidden = !shouldDisplay;

        if (shouldDisplay) {
            visibleCount++;
        }
    });

    if (animalResults) {
        if (visibleCount === 0) {
            animalResults.textContent =
                "No animals match your search. Try another name or filter.";

        } else {
            animalResults.textContent =
                "Showing " + visibleCount +
                (visibleCount === 1 ? " animal." : " animals.");
        }
    }
}

if (animalFilter) {
    animalFilter.addEventListener("change", updateAnimalResults);
}

if (animalSearch) {
    animalSearch.addEventListener("input", updateAnimalResults);
}

// Display the initial animal count.
updateAnimalResults();


/* 6. IMAGE GALLERY LIGHTBOX */

const galleryImages = document.querySelectorAll(
    ".animal-card img, .featured-animals img"
);

if (galleryImages.length > 0) {

    const lightbox = document.createElement("div");

    lightbox.id = "image-lightbox";
    lightbox.className = "image-lightbox";
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute("aria-label", "Enlarged animal photograph");
    lightbox.hidden = true;

    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button
                type="button"
                class="lightbox-close"
                aria-label="Close enlarged image">
                &times;
            </button>

            <img class="lightbox-image" src="" alt="">

            <p class="lightbox-caption"></p>
        </div>
    `;

    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector(".lightbox-image");
    const lightboxCaption = lightbox.querySelector(".lightbox-caption");
    const closeButton = lightbox.querySelector(".lightbox-close");

    let previouslyFocusedImage = null;

    function openLightbox(image) {
        previouslyFocusedImage = image;

        lightboxImage.src = image.src;
        lightboxImage.alt = image.alt || "Enlarged animal photograph";

        lightboxCaption.textContent =
            image.alt || "Animal photograph";

        lightbox.hidden = false;
        document.body.style.overflow = "hidden";

        closeButton.focus();
    }

    function closeLightbox() {
        lightbox.hidden = true;
        lightboxImage.src = "";
        document.body.style.overflow = "";

        if (previouslyFocusedImage) {
            previouslyFocusedImage.focus();
        }
    }

    galleryImages.forEach(image => {
        image.setAttribute("tabindex", "0");
        image.setAttribute("role", "button");

        image.setAttribute(
            "aria-label",
            "View enlarged image: " + (image.alt || "Animal photograph")
        );

        image.addEventListener("click", function () {
            openLightbox(image);
        });

        image.addEventListener("keydown", function (event) {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openLightbox(image);
            }
        });
    });

    closeButton.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", function (event) {
        if (!lightbox.hidden && event.key === "Escape") {
            closeLightbox();
        }
    });
}
