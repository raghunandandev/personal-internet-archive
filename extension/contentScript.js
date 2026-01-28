// contentScript.js
// Runs on the React Dashboard to sync the login token

// const syncToken = () => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const token = urlParams.get("token");

//     if (token) {
//         // Save to Chrome Storage
//         chrome.storage.local.set({ authToken: token }, () => {
//             console.log("Archive Extension: Token synced successfully!");
//             alert("Extension successfully logged in!"); // Visual feedback
//         });
//     }
// };

// syncToken();

// console.log("Archive Extension: Content Script loaded.");

// const syncToken = () => {
//     const urlParams = new URLSearchParams(window.location.search);
//     const token = urlParams.get("token");

//     if (token) {
//         console.log("Archive Extension: Token found in URL:", token.substring(0, 10) + "...");

//         // Save to Chrome Storage
//         chrome.storage.local.set({ authToken: token }, () => {
//             console.log("Archive Extension: Token saved to secure storage.");

//             // OPTIONAL: Visual feedback on the page itself
//             const div = document.createElement('div');
//             div.style.position = 'fixed';
//             div.style.top = '0';
//             div.style.left = '0';
//             div.style.width = '100%';
//             div.style.backgroundColor = '#4ade80';
//             div.style.color = 'black';
//             div.style.textAlign = 'center';
//             div.style.padding = '10px';
//             div.style.zIndex = '9999';
//             div.innerText = 'Extension Authenticated Successfully!';
//             document.body.appendChild(div);
//         });
//     }
// };

// // Run immediately
// syncToken();

// contentScript.js
// Runs on the React Dashboard domain to sync the login token

console.log("Archive Extension: Content Script loaded.");

const syncToken = () => {
    // 1. Find token in URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (token) {
        console.log("Archive Extension: Token found. Syncing...");

        // 2. Save to secure Chrome Storage
        chrome.storage.local.set({ authToken: token }, () => {
            console.log("Archive Extension: Token saved successfully.");
            showSuccessToast();
        });
    }
};

// Helper function to show a non-intrusive toast notification
const showSuccessToast = () => {
    // Prevent duplicate toasts
    if (document.getElementById('archive-auth-toast')) return;

    const div = document.createElement('div');
    div.id = 'archive-auth-toast';

    // CSS Styles for a bottom-right toast
    Object.assign(div.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: '#22c55e', // Tailwind green-500
        color: 'white',
        padding: '12px 24px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        zIndex: '2147483647', // Max z-index to ensure it's on top
        fontWeight: '600',
        fontSize: '14px',
        fontFamily: 'sans-serif',
        transition: 'opacity 0.5s ease-in-out'
    });

    div.innerText = '✓ Extension Authenticated';
    document.body.appendChild(div);

    // Remove after 3 seconds
    setTimeout(() => {
        div.style.opacity = '0';
        setTimeout(() => div.remove(), 500); // Wait for fade out then remove from DOM
    }, 3000);
};

// Run immediately when the page loads
syncToken();