// -------- STEP 1: FIREBASE CONFIG --------
// Ye aapka config hai jo aapne share kiya tha
const firebaseConfig = {
  apiKey: "AIzaSyDMW01SoNXWUK_ZIzSd6nKdoYppYWizRj4",
  authDomain: "hackshield-avni-project.firebaseapp.com",
  projectId: "hackshield-avni-project",
  storageBucket: "hackshield-avni-project.firebasestorage.app",
  messagingSenderId: "202765104173",
  appId: "1:202765104173:web:e83943ed85027a36a174a4"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// NAYA: Dono providers (Google aur GitHub) ko define karna
const googleProvider = new firebase.auth.GoogleAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();


// -------- STEP 2: DOM ELEMENTS SELECT KARNA --------
const loginContainer = document.getElementById('login-container');
const appContainer = document.getElementById('app-container');
const logoutBtn = document.getElementById('logout-btn');

const googleLoginBtn = document.getElementById('google-login-btn');
const githubLoginBtn = document.getElementById('github-login-btn');

const emailInput = document.getElementById('email-input');
const passwordInput = document.getElementById('password-input');
const emailSignInBtn = document.getElementById('email-signin-btn');
const emailSignUpBtn = document.getElementById('email-signup-btn');
const authErrorMsg = document.getElementById('auth-error-msg');


// -------- STEP 3: AUTHENTICATION LOGIC (MAIN) --------
// Ye function check karta hai ki user logged in hai ya nahi
auth.onAuthStateChanged((user) => {
    if (user) {
        // User logged in hai
        loginContainer.style.display = 'none'; // Login box chhipao
        appContainer.style.display = 'block';   // Dashboard dikhao
        logoutBtn.style.display = 'block';      // Logout button dikhao
        authErrorMsg.style.display = 'none';  // Error chhipao
        startRealtimeUpdates(); // Dashboard shuru karo
    } else {
        // User logged out hai
        loginContainer.style.display = 'block';   // Login box dikhao
        appContainer.style.display = 'none';    // Dashboard chhipao
        logoutBtn.style.display = 'none';       // Logout button chhipao
    }
});

// NAYA: Error message dikhaane ka function
function showAuthError(message) {
    authErrorMsg.textContent = message;
    authErrorMsg.style.display = 'block';
}

// -------- STEP 4: EVENT LISTENERS (BUTTONS) --------

// Google Login Button
googleLoginBtn.addEventListener('click', () => {
    authErrorMsg.style.display = 'none';
    auth.signInWithPopup(googleProvider)
        .then((result) => {
            console.log("Logged in with Google:", result.user.displayName);
            // onAuthStateChanged baaki kaam kar dega
        })
        .catch((error) => {
            console.error("Google Login failed:", error.message);
            showAuthError(error.message);
        });
});

// GitHub Login Button
githubLoginBtn.addEventListener('click', () => {
    authErrorMsg.style.display = 'none';
    auth.signInWithPopup(githubProvider)
        .then((result) => {
            console.log("Logged in with GitHub:", result.user.displayName);
        })
        .catch((error) => {
            console.error("GitHub Login failed:", error.message);
            showAuthError(error.message);
        });
});

// Email Sign-In (Login) Button
emailSignInBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    if (!email || !password) {
        showAuthError("Please enter both email and password.");
        return;
    }
    authErrorMsg.style.display = 'none';

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("Logged in with Email:", userCredential.user.email);
        })
        .catch((error) => {
            console.error("Email Login failed:", error.message);
            showAuthError(error.message); // Firebase ka error message dikhao
        });
});

// Email Sign-Up (Naya User) Button
emailSignUpBtn.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;
    if (!email || !password) {
        showAuthError("Please enter both email and password to sign up.");
        return;
    }
    authErrorMsg.style.display = 'none';

    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log("Signed up with Email:", userCredential.user.email);
            // Sign up ke baad user automatic login ho jaata hai
        })
        .catch((error) => {
            console.error("Email Sign-up failed:", error.message);
            showAuthError(error.message);
        });
});

// Logout button ka logic
logoutBtn.addEventListener('click', () => {
    auth.signOut();
});

// -------- STEP 5: PARTICLES.JS LOGIC --------
document.addEventListener('DOMContentLoaded', () => {
    particlesJS("particles-js", {
        "particles": {
            "number": {"value": 100, "density": {"enable": true, "value_area": 800}},
            "color": {"value": "#00ff00"}, 
            "shape": {"type": "circle"},
            "opacity": {"value": 0.5, "random": true},
            "size": {"value": 3, "random": true},
            "line_linked": {"enable": true, "distance": 150, "color": "#00ff00", "opacity": 0.4, "width": 1}, 
            "move": {"enable": true, "speed": 2, "direction": "none", "out_mode": "out"}
        },
        "interactivity": {
            "events": {"onhover": {"enable": true, "mode": "repulse"}, "onclick": {"enable": true, "mode": "push"}},
            "modes": {"repulse": {"distance": 100}, "push": {"particles_nb": 4}}
        },
        "retina_detect": true
    });
});

// -------- STEP 6: DASHBOARD APP LOGIC (SIMULATED) --------
// (Ye code waisa hi hai)

function startRealtimeUpdates() {
    setInterval(updateSystemStats, 2000); 
    setInterval(updateAlertFeed, 10000); 
}

function updateSystemStats() {
    let cpuPercent = Math.floor(Math.random() * (90 - 20 + 1)) + 20; 
    let memPercent = Math.floor(Math.random() * (85 - 30 + 1)) + 30; 
    let netSpeed = (Math.random() * (60 - 5) + 5).toFixed(2); 
    let isThreat = (cpuPercent > 85 || memPercent > 80);
    document.getElementById('cpu-percent').innerText = `${cpuPercent}%`;
    document.getElementById('mem-percent').innerText = `${memPercent}%`;
    document.getElementById('net-percent').innerText = `${netSpeed} MB/s`;
    updateThreatStatus(isThreat);
}

function updateThreatStatus(isThreat) {
    let statusEl = document.getElementById('system-status');
    let icon = statusEl.querySelector('i');
    let span = statusEl.querySelector('span');
    
    if (isThreat) {
        statusEl.className = 'status-danger';
        span.innerText = 'THREAT DETECTED';
        icon.className = 'fa-solid fa-exclamation-triangle';
    } else {
        statusEl.className = 'status-ok';
        span.innerText = 'SYSTEM SECURE';
        icon.className = 'fa-solid fa-check-circle';
    }
}

function updateAlertFeed() {
    let feedEl = document.getElementById('threat-feed');
    let newItem = document.createElement('li');
    let timestamp = new Date().toLocaleTimeString();
    newItem.innerHTML = `<span class="log-info">[${timestamp}] System scan complete. All nominal.</span>`;
    feedEl.prepend(newItem);
    if (feedEl.children.length > 5) {
        feedEl.removeChild(feedEl.lastChild);
    }
}