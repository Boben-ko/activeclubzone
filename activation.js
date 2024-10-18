document.getElementById('activation-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Prikaži loader
    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    // Očisti prethodne poruke
    const message = document.getElementById('success-error-message');
    message.textContent = '';

    const formData = {
        action: 'activate',
        activationCode: document.getElementById('activation-code').value
    };

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxdUz2PNHwL5OhntDF9qH8Io_AvC2MAOadvdEjVRO6pSXNzr88DOkAY7tyFI3L_g-tN/exec', {
            method: 'POST',
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        // Sakrij loader
        loader.style.display = 'none';

        if (result.status === 'success') {
            message.textContent = 'Account activated successfully! Redirecting to login...';
            message.style.color = 'green';

            // Preusmjeravanje na login stranicu
            setTimeout(() => {
                window.location.href = '/login.html';
            }, 2000);
        } else {
            message.textContent = 'Activation failed: ' + result.message;
            message.style.color = 'red';
        }
    } catch (error) {
        loader.style.display = 'none';
        message.textContent = 'An error occurred: ' + error.message;
        message.style.color = 'red';
        console.log("Fetch error:", error);
    }
});
