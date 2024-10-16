// Event listener for registration form submission
document.getElementById('register-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  // Show loader
  const loader = document.getElementById('loader');
  loader.style.display = 'block';

  // Clear previous messages
  const message = document.getElementById('success-error-message');
  message.textContent = '';

  const formData = {
    action: 'register',  // Registration action
    name: document.getElementById('register-name').value,
    surname: document.getElementById('register-surname').value,
    email: document.getElementById('register-email').value,
    password: document.getElementById('register-password').value,
    userType: document.getElementById('user-type').value
  };

  try {
    const response = await fetch('https://script.google.com/macros/s/AKfycbxdUz2PNHwL5OhntDF9qH8Io_AvC2MAOadvdEjVRO6pSXNzr88DOkAY7tyFI3L_g-tN/exec', {
      method: 'POST',
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    
    // Hide loader
    loader.style.display = 'none';

    if (result.status === 'success') {
      message.textContent = 'Registration successful! Redirecting to activation page...';
      message.style.color = 'green';

      // Redirect to activation page after a short delay
      setTimeout(() => {
        window.location.href = '/activation';
      }, 2000);
    } else {
      message.textContent = 'Registration failed: ' + result.message;
      message.style.color = 'red';
    }
  } catch (error) {
    loader.style.display = 'none';
    message.textContent = 'An error occurred: ' + error.message;
    message.style.color = 'red';
  }
});
