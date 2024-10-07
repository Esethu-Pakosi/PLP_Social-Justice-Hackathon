// JavaScript form validation function
function validateForm() {
    let isValid = true;

    // Clear previous error messages
    const errorElements = document.querySelectorAll(".error");
    errorElements.forEach(element => element.innerHTML = "");

    // Validate First Name
    const firstName = document.getElementById("firstName").value.trim();
    if (firstName === "") {
        document.getElementById("firstNameError").innerText = "First name is required.";
        isValid = false;
    }

    // Validate Last Name
    const lastName = document.getElementById("lastName").value.trim();
    if (lastName === "") {
        document.getElementById("lastNameError").innerText = "Last name is required.";
        isValid = false;
    }

    // Validate Password
    const password = document.getElementById("password").value.trim();
    if (password === "" || password.length < 6) {
        document.getElementById("passwordError").innerText = "Password must be at least 6 characters long.";
        isValid = false;
    }

    // Validate Email
    const email = document.getElementById("email").value.trim();
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
        document.getElementById("emailError").innerText = "Please enter a valid email.";
        isValid = false;
    }

    // Validate Phone Number
    const phone = document.getElementById("phone").value.trim();
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phone)) {
        document.getElementById("phoneError").innerText = "Please enter a valid 10-digit phone number.";
        isValid = false;
    }

    // Validate Address
    const address = document.getElementById("address").value.trim();
    if (address === "") {
        document.getElementById("addressError").innerText = "Address cannot be empty.";
        isValid = false;
    }

    // Validate Gender
    const gender = document.getElementById("gender").value;
    if (gender === "") {
        document.getElementById("genderError").innerText = "Please select a gender.";
        isValid = false;
    }

    // Validate Date of Birth
    const dob = document.getElementById("dob").value;
    if (dob === "") {
        document.getElementById("dobError").innerText = "Date of Birth is required.";
        isValid = false;
    }

    // If the form is valid, submit or display a message
    if (isValid) {
        alert("Form submitted successfully!");
    } else {
        alert("Please fill out the form correctly.");
    }
}
