// Importa las funciones que necesitas de los SDKs que necesitas
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getDatabase, ref, set, push, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD7jdPvT5LuSInnYnKJdf0O3FArVo9i4DY",
    authDomain: "arcacontinentaldb.firebaseapp.com",
    databaseURL: "https://arcacontinentaldb-default-rtdb.firebaseio.com",
    projectId: "arcacontinentaldb",
    storageBucket: "arcacontinentaldb.appspot.com",
    messagingSenderId: "103461088615",
    appId: "1:103461088615:web:09c6648152b79a4c9493c2"
  };

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

// Exportar las funciones necesarias
export { db, ref, set, push, serverTimestamp, app, auth };

// Registro de usuario con email y password
export const registerWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
};

// Inicio de sesión de usuario con email y password
export const signInWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

// Guardar información de registro del usuario en Realtime Database
export const saveUserSignUp = (uid, name, email, birthday, department) => {
    return set(ref(db, 'users/' + uid), {
        name: name,
        email: email,
        birthday: birthday,
        department: department,
        createdAt: serverTimestamp()
    });
};

// Guardar información de sesión del usuario en Realtime Database
export const saveUserSession = (uid) => {
    const sessionRef = push(ref(db, 'userSessions'));
    return set(sessionRef, {
        userId: uid,
        timestamp: serverTimestamp()
    });
};

// Obtener datos de usuario registrado
export const getUserSignUp = (uid) => {
    const userRef = ref(db, 'users/' + uid);
    return get(userRef);
};

// Obtener sesiones de usuario
export const getUserSessions = () => {
    const sessionsRef = ref(db, 'userSessions');
    return get(sessionsRef);
};