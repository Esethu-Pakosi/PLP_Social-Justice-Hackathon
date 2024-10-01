// Login form submission handler
document.getElementById('login_form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const usernameEmail = document.getElementById('username_email').value.trim();
  const password = document.getElementById('password').value.trim();
  const loginButton = document.querySelector('.login-button');

  // Validate input fields
  if (!usernameEmail || !password) {
    alert('Please fill in both username or email and password.');
    return;
  }

  // Disable login button to prevent multiple submissions
  loginButton.disabled = true;

  try {
    const response = await fetch('https://sentinel-api.vercel.app/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        usernameEmail,
        password,
      }),
    });

    const data = await response.json();

    if (data.success) {
      // Login successful, redirect to dashboard
      window.location.href = '/dashboard';
    } else {
      // Login failed, display error message
      alert(data.message || 'Invalid username/email or password.');
      loginButton.disabled = false; // Re-enable login button
    }
  } catch (error) {
    console.error('Login error:', error);
    alert('An error occurred during login. Please try again.');
    loginButton.disabled = false; // Re-enable login button
  }
});

// Forgot password recovery handler
document.querySelector('.forgot-password').addEventListener('click', (e) => {
  e.preventDefault();

  const forgotPasswordModal = document.getElementById('forgot-password-modal');
  forgotPasswordModal.style.display = 'block';
});

// Close forgot password modal
document.querySelector('.close-modal').addEventListener('click', () => {
  const forgotPasswordModal = document.getElementById('forgot-password-modal');
  forgotPasswordModal.style.display = 'none';
});

// Send forgot password recovery email
document.getElementById('forgot-password-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const recoveryEmail = document.getElementById('recovery_email').value.trim();
  const recoveryButton = document.querySelector('#forgot-password-form button[type="submit"]');

  // Validate recovery email using regular expression
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(recoveryEmail)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Disable recovery button to prevent multiple submissions
  recoveryButton.disabled = true;

  try {
    const response = await fetch('https://sentinel-api.vercel.app/api/auth/forgot-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recoveryEmail,
      }),
    });

    const data = await response.json();

    if (data.success) {
      // Recovery email sent successfully
      alert('Recovery email sent successfully. Please check your inbox.');
      const forgotPasswordModal = document.getElementById('forgot-password-modal');
      forgotPasswordModal.style.display = 'none';
      recoveryButton.disabled = false; // Re-enable recovery button
    } else {
      // Error sending recovery email
      alert(data.message || 'An error occurred while sending recovery email.');
      recoveryButton.disabled = false; // Re-enable recovery button
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    alert('An error occurred while sending recovery email. Please try again.');
    recoveryButton.disabled = false; // Re-enable recovery button
  }
});