// Event listener za registraciju 
document.getElementById('register-form').addEventListener('submit', async function(event) {
  event.preventDefault();

  const formData = {
    action: 'register',  // Akcija registracije
    name: document.getElementById('register-name').value,
    surname: document.getElementById('register-surname').value,
    email: document.getElementById('register-email').value,
    password: document.getElementById('register-password').value,
    userType: document.getElementById('user-type').value
  };

  const response = await fetch('https://script.google.com/macros/s/AKfycbxdUz2PNHwL5OhntDF9qH8Io_AvC2MAOadvdEjVRO6pSXNzr88DOkAY7tyFI3L_g-tN/exec', { // URL tvoje web aplikacije
    method: 'POST',
    body: JSON.stringify(formData)
  });

  const result = await response.json();
  if (result.status === 'success') {
    alert('Registration successful! Your user ID is: ' + result.userId);
  } else {
    alert('Registration failed: ' + result.message);
  }
});
