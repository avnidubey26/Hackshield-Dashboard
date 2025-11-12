// --- YEH SCRIPT SIRF DASHBOARD PAGE PAR CHALEGI ---

// -------- STEP 1: AUTHENTICATION CHECK --------
// Ye check karta hai ki user logged in hai ya nahi.
// Agar user logged in nahi hai, toh use login page par waapas bhejo.
firebase.auth().onAuthStateChanged((user) => {
    const appContainer = document.getElementById('app-container');
    if (user) {
        // User logged in hai, dashboard dikhao
        appContainer.style.display = 'block';
        startRealtimeUpdates(); // Dashboard updates shuru karo
    } else {
        // User logged out hai, waapas login page par bhejo
        window.location.href = 'index.html';
    }
});


// -------- STEP 2: DASHBOARD APP LOGIC (SIMULATED) --------
// (Ye code wahi hai jo pehle script.js mein tha)

function startRealtimeUpdates() {
    // Stats ko har 2 second mein update karo
    setInterval(updateSystemStats, 2000); 
    
    // Log feed ko har 10 second mein update karo
    setInterval(updateAlertFeed, 10000); 
}

// Function: Backend se (Simulated) Stats laane ke liye
function updateSystemStats() {
    try {
        // Hum ab backend call nahi kar rahe, data yahin bana rahe hain
        let cpuPercent = Math.floor(Math.random() * (90 - 20 + 1)) + 20; // 20-90%
        let memPercent = Math.floor(Math.random() * (85 - 30 + 1)) + 30; // 30-85%
        let netSpeed = (Math.random() * (60 - 5) + 5).toFixed(2); // 5.00-60.00 MB/s
        
        let isThreat = (cpuPercent > 85 || memPercent > 80);

        // Update UI
        document.getElementById('cpu-percent').innerText = `${cpuPercent}%`;
        document.getElementById('mem-percent').innerText = `${memPercent}%`;
        document.getElementById('net-percent').innerText = `${netSpeed} MB/s`;
        updateThreatStatus(isThreat);

    } catch (error) {
        // Ye error tab aayega agar user dashboard page par hai par HTML load nahi hua
        console.error('Error updating stats:', error);
        document.getElementById('cpu-percent').innerText = `ERR`;
        document.getElementById('mem-percent').innerText = `ERR`;
        document.getElementById('net-percent').innerText = `ERR`;
        updateThreatStatus(true); 
    }
}

// Function: Header status ko badalne ke liye
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

// Function: Log Feed ko update karne ke liye
function updateAlertFeed() {
    let feedEl = document.getElementById('threat-feed');
    let newItem = document.createElement('li');
    let timestamp = new Date().toLocaleTimeString();

    // Bas ye dikhayenge ki system check ho raha hai
    newItem.innerHTML = `<span class="log-info">[${timestamp}] System scan complete. All nominal.</span>`;
    
    // Log ko upar daalo
    feedEl.prepend(newItem);

    // 5 se zyada log hone par purana wala delete kar do
    if (feedEl.children.length > 5) {
        feedEl.removeChild(feedEl.lastChild);
    }
}
