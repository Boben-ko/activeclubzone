document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Show loader
    const loader = document.getElementById('loader');
    if (loader) loader.style.display = 'block'; // Provjeri da li postoji loader

    // Clear previous messages
    const message = document.getElementById('success-error-message');
    if (message) message.textContent = '';

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

        // Provjerimo prvo da li vraća response.ok
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const resultText = await response.text(); // Dobijamo odgovor kao tekst
        let result;
        
        try {
            result = JSON.parse(resultText); // Pokušaj parsirati tekst u JSON
        } catch (parseError) {
            console.error('Failed to parse JSON:', parseError, resultText);
            throw new Error('Response is not valid JSON.');
        }

        if (loader) loader.style.display = 'none'; // Sakrij loader

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
        if (loader) loader.style.display = 'none'; // Sakrij loader
        if (message) message.textContent = 'An error occurred: ' + error.message;
        console.log("Fetch error:", error);
    }
});
