document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;
    
    // Load saved theme preference
    if (localStorage.getItem("theme") === "dark") {
        body.classList.add("dark-mode");
    }

    themeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");
        localStorage.setItem("theme", body.classList.contains("dark-mode") ? "dark" : "light");
    });

    // Form Validation
    const form = document.getElementById("contact-form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const nameError = document.getElementById("name-error");
        const emailError = document.getElementById("email-error");
        let valid = true;

        if (!name) {
            nameError.textContent = "Name is required.";
            valid = false;
        } else {
            nameError.textContent = "";
        }

        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            emailError.textContent = "Enter a valid email address.";
            valid = false;
        } else {
            emailError.textContent = "";
        }

        if (valid) {
            alert("Form submitted successfully!");
            form.reset();
        }
    });

    // Fetch API Data
    const dataContainer = document.getElementById("data-container");
    fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => {
            data.slice(0, 5).forEach(country => {
                const countryElement = document.createElement("div");
                countryElement.textContent = country.name.common;
                dataContainer.appendChild(countryElement);
            });
        })
        .catch(error => {
            dataContainer.textContent = "Failed to load data.";
        });
});
