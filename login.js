document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Show loader
    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    // Clear previous messages
    const message = document.getElementById('success-error-message');
    message.textContent = '';

    const formData = {
        action: 'login',
        email: document.getElementById('login-email').value,
        password: document.getElementById('login-password').value
    };

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxdUz2PNHwL5OhntDF9qH8Io_AvC2MAOadvdEjVRO6pSXNzr88DOkAY7tyFI3L_g-tN/exec', {
            method: 'POST',
            body: JSON.stringify(formData)
        });

        const result = await response.json();
        loader.style.display = 'none';

        if (result.status === 'success') {
            message.textContent = 'Login successful! Redirecting...';
            message.style.color = 'green';

            // Redirect after successful login
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 2000);
        } else {
            message.textContent = 'Login failed: ' + result.message;
            message.style.color = 'red';
        }
    } catch (error) {
        loader.style.display = 'none';
        message.textContent = 'An error occurred: ' + error.message;
        console.log("Fetch error:", error);
    }
});
