import { registerWithEmail, signInWithEmail, saveUserSignUp, saveUserSession, app } from './firebase.js';
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const db = getDatabase(app);
const auth = getAuth(app);

const container = document.getElementById('container');

const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

// Toggle forms
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    const signinForm = document.getElementById('signin-form');

    const signupMessage = document.getElementById('signup-message');
    const signinMessage = document.getElementById('signin-message');

    if (signinForm) {
        signinForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;

            try {
                const userCredential = await signInWithEmail(email, password);
                console.log('User Logged In Correctly', userCredential.user);

                await saveUserSession(userCredential.user.uid);
                console.log('Session logged');
                signinMessage.textContent = 'Inicio de sesión exitoso';
                signinMessage.classList.add('success');
                signinMessage.classList.remove('error');
                signinMessage.style.display = 'block';

                setTimeout(() => {
                    window.location.href = 'main.html';  // Assuming this is your home page after login
                }, 2000);  // 2000 milliseconds = 2 seconds

            } catch (error) {
                console.error('Error during login:', error);
                signinMessage.textContent = 'Inicio de sesión fallido';
                signinMessage.classList.add('error');
                signinMessage.classList.remove('success');
                signinMessage.style.display = 'block';
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;

            try {
                const userCredential = await registerWithEmail(email, password);
                console.log('User registered with email and password', userCredential.user);
                await saveUserSignUp(userCredential.user.uid, name, email, '', '');

                console.log('User additional information saved to Realtime Database');
                signupMessage.textContent = 'Creación de cuenta exitosa';
                signupMessage.classList.add('success');
                signupMessage.classList.remove('error');
                signupMessage.style.display = 'block';

                setTimeout(() => {
                    window.location.href = 'intereses.html';  // Redirection to interests page after successful signup
                }, 2000);  // 2000 milliseconds = 2 seconds

            } catch (error) {
                console.error('Error during signup:', error);
                signupMessage.textContent = 'Registro fallido';
                signupMessage.classList.add('error');
                signupMessage.classList.remove('success');
                signupMessage.style.display = 'block';
            }
        });
    }
});