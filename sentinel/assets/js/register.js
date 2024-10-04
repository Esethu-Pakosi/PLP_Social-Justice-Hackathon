document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Simple password match validation
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    // Prepare data to be sent
    const formData = {
        name: name,
        email: email,
        password: password
    };

    // Send the data using fetch to the provided API endpoint
    fetch('https://sentinel-api.vercel.app/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
        .then(response => response.json())
        .then(data => {
            // Handle the response from the server
            if (data.success) {
                alert('Registration successful!');
            } else {
                alert('Registration failed: ' + (data.message || 'Unknown error'));
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert('There was an error registering. Please try again later.');
        });
});