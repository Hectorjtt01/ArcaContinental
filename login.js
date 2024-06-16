import { registerWithEmail, signInWithEmail, saveUserSignUp, saveUserSession, app } from './firebase.js';
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getDatabase, ref, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const db = getDatabase(app);
const auth = getAuth(app);

const signinForm = document.getElementById('signin-form');
const container = document.getElementById('container');
const signupForm = document.getElementById('signup-form');

const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');

registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

document.addEventListener('DOMContentLoaded', function() {
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
                window.location.href = 'main.html';  // Assuming this is your home page after login
            } catch (error) {
                console.error('Error during login:', error);
            }
        });
    }

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const birthday = document.getElementById('fechaNac').value;
            const department = document.getElementById('departamento').value;

            try {
                const userCredential = await registerWithEmail(email, password);
                console.log('User registered with email and password', userCredential.user);
                await saveUserSignUp(userCredential.user.uid, name, email, birthday, department);

                console.log('User additional information saved to Realtime Database');
                window.location.href = 'index.html';  // Redirection after successful signup
            } catch (error) {
                console.error('Error during signup:', error);
            }
        });
    }
});