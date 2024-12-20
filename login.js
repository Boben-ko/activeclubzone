document.getElementById('login-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Prikaži loader
    const loader = document.getElementById('loader');
    loader.style.display = 'block';

    // Očisti prethodne poruke
    const message = document.getElementById('success-error-message');
    message.textContent = '';

    const formData = {
      action: 'login',
      email: document.getElementById('login-email').value,
      password: document.getElementById('login-password').value
    };
        // Provjera mrežne povezanosti
    if (!navigator.onLine) {
        loader.style.display = 'none';
        message.textContent = 'No internet connection. Please check your connection and try again.';
        message.style.color = 'red';
        return;
    }


    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxdUz2PNHwL5OhntDF9qH8Io_AvC2MAOadvdEjVRO6pSXNzr88DOkAY7tyFI3L_g-tN/exec', {
          method: 'POST',
          body: JSON.stringify(formData)
        });

        // Dodaj ovu liniju da vidiš sirovi odgovor pre nego ga parsiraš
        console.log("Raw response:", response);

        const result = await response.json();

        // Ako "result" nije pravilno parsiran, ispisujemo ga
        console.log("Parsed result:", result);

        // Sakrij loader
        loader.style.display = 'none';

        if (result.status === 'success') {
            message.textContent = 'Login successful! Redirecting to dashboard page...';
            message.style.color = 'green';

        // Preusmjeravanje temeljem userType
            setTimeout(() => {
                if (result.userType === 'manager') {
                    window.location.href = '/activeclubzone/manager_dashboard.html';
                } else if (result.userType === 'player') {
                    window.location.href = '/activeclubzone/player_dashboard.html';
                } else {
                    window.location.href = '/activeclubzone/default_dashboard.html'; // Zajednički dashboard za ostale tipove
                }
            }, 2000);
        } else if (result.message === 'Account not activated. Please check your email.') {
            // Prikazujemo poruku i preusmeravamo na aktivaciju nakon 2 sekunde
            message.textContent = 'Account not activated. Redirecting to activation page...';
            message.style.color = 'orange';

            setTimeout(() => {
                window.location.href = '/activeclubzone/activation.html';
            }, 2000);
        } else {
            // Prikazujemo detaljnu grešku
            message.textContent = 'Login failed: ' + result.message;
            message.style.color = 'red';
        }
    } catch (error) {
        loader.style.display = 'none';
        message.textContent = 'An error occurred: ' + error.message;
        message.style.color = 'red';
        
        // Dodaj ovu liniju da vidiš ako postoji greška
        console.log("Fetch error:", error);
    }
});
