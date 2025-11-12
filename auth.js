// --- YEH SCRIPT HAR PAGE PAR CHALEGI ---

// -------- STEP 1: FIREBASE CONFIG --------
// (Aapki purani file se copy kiya gaya)
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


// -------- STEP 2: AUTHENTICATION LOGIC (MAIN) --------
// Ye function check karta hai ki user logged in hai ya nahi
auth.onAuthStateChanged((user) => {
    const logoutBtn = document.getElementById('logout-btn');
    
    // Sirf logout button ko control karna
    if (user) {
        // User logged in hai
        if (logoutBtn) {
            logoutBtn.style.display = 'block';
        }
    } else {
        // User logged out hai
        if (logoutBtn) {
            logoutBtn.style.display = 'none';
        }
    }
});

// Logout button ka logic (agar button maujood hai)
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        auth.signOut().then(() => {
            // Logout ke baad, user ko login page par bhejo
            window.location.href = 'index.html';
        });
    });
}


// -------- STEP 3: LOGIN PAGE LOGIC --------
// Ye code check karega ki hum login page par hain ya nahi
const loginContainer = document.getElementById('login-container');
if (loginContainer) {
    const ui = new firebaseui.auth.AuthUI(auth);
    
    const uiConfig = {
        callbacks: {
            signInSuccessWithAuthResult: function(authResult, redirectUrl) {
                // Login successful hone ke baad, dashboard page par bhejo
                window.location.href = 'dashboard.html';
                return false; // Redirect ko yahaan roko
            }
        },
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            {
              provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
              signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD
            }
            // Yahaan GitHub bhi add kar sakte hain (agar Firebase console mein setup hai)
        ],
        tosUrl: null,
        privacyPolicyUrl: null
    };

    // FirebaseUI ka login form shuru karo
    ui.start('#firebaseui-auth-container', uiConfig);
}


// -------- STEP 4: PARTICLES.JS LOGIC --------
// Ye code bhi har page par chalega
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
