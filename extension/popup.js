// const API_URL = "http://localhost:5000/api/pages";
// const DASHBOARD_URL = "http://localhost:5173/login";

// document.addEventListener('DOMContentLoaded', async () => {
//     const saveBtn = document.getElementById('saveBtn');
//     const loginBtn = document.getElementById('loginBtn');
//     const logoutBtn = document.getElementById('logoutBtn');
//     const status = document.getElementById('status');

//     const authView = document.getElementById('auth-view');
//     const loginView = document.getElementById('login-view');

//     // 1. Check if user is logged in
//     const { authToken } = await chrome.storage.local.get('authToken');

//     const categorySelect = document.getElementById('categorySelect');
//     const newCategoryInput = document.getElementById('newCategoryInput');

//     if (authToken) {
//         authView.classList.remove('hidden');
//         try {
//             const res = await fetch(`${API_BASE}/pages/categories`, {
//                 headers: { 'Authorization': `Bearer ${authToken}` }
//             });
//             const categories = await res.json();

//             // Populate Dropdown
//             categories.forEach(cat => {
//                 if (cat === 'General') return; // General is already hardcoded
//                 const option = document.createElement('option');
//                 option.value = cat;
//                 option.innerText = cat;
//                 // Insert before the "Create New" option (which is the last child)
//                 categorySelect.insertBefore(option, categorySelect.lastElementChild);
//             });
//         } catch (err) {
//             console.error("Failed to load categories", err);
//           }
//     } else {
//         loginView.classList.remove('hidden');
//     }

//     categorySelect.addEventListener('change', (e) => {
//         if (e.target.value === 'new') {
//             newCategoryInput.style.display = 'block';
//             newCategoryInput.focus();
//         } else {
//             newCategoryInput.style.display = 'none';
//         }
//       });

//     // --- Event Listeners ---

//     // LOGIN: Open Dashboard
//     loginBtn.addEventListener('click', () => {
//         chrome.tabs.create({ url: DASHBOARD_URL });
//     });

//     // LOGOUT: Clear Token
//     logoutBtn.addEventListener('click', () => {
//         chrome.storage.local.remove('authToken', () => {
//             window.close(); // Close popup
//         });
//     });

//     // SAVE: Capture & Upload

//     saveBtn.addEventListener('click', async () => {
//         status.innerText = "Capturing...";

//         // Determine final category
//         let finalCategory = categorySelect.value;
//         if (finalCategory === 'new') {
//             finalCategory = newCategoryInput.value.trim() || 'General';
//         }

//         try {
//             // ... Capture Tab & Scripting (Keep existing code) ...
//             const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
//             const [{ result: pageText }] = await chrome.scripting.executeScript({
//                 target: { tabId: tab.id }, func: () => document.body.innerText
//             });
//             const screenshot = await chrome.tabs.captureVisibleTab(null, { format: 'jpeg', quality: 50 });

//             // Send to Backend with Category
//             const response = await fetch(`${API_BASE}/pages`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${authToken}`
//                 },
//                 body: JSON.stringify({
//                     url: tab.url,
//                     title: tab.title,
//                     textContent: pageText,
//                     screenshot: screenshot,
//                     category: finalCategory // <--- SEND CATEGORY
//                 })
//             });

//             if (response.ok) {
//                 status.innerText = "Saved to " + finalCategory + "!";
//                 setTimeout(() => window.close(), 1500);
//             }
//             // ... Catch errors ...
//         } catch (err) {
//             status.innerText = "Error: " + err.message;
//         }
//       });

//     // saveBtn.addEventListener('click', async () => {
//     //     status.innerText = "Capturing...";
//     //     saveBtn.disabled = true;

//     //     try {
//     //         // A. Get Active Tab
//     //         const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

//     //         // B. Scripting: Get Page Text
//     //         const [{ result: pageText }] = await chrome.scripting.executeScript({
//     //             target: { tabId: tab.id },
//     //             func: () => document.body.innerText
//     //         });

//     //         // C. Screenshot: Get Image (Base64)
//     //         const screenshot = await chrome.tabs.captureVisibleTab(null, { format: 'jpeg', quality: 50 });

//     //         // D. Send to Backend
//     //         status.innerText = "Uploading...";

//     //         const response = await fetch(API_URL, {
//     //             method: 'POST',
//     //             headers: {
//     //                 'Content-Type': 'application/json',
//     //                 'Authorization': `Bearer ${authToken}`
//     //             },
//     //             body: JSON.stringify({
//     //                 url: tab.url,
//     //                 title: tab.title,
//     //                 textContent: pageText,
//     //                 screenshot: screenshot
//     //             })
//     //         });

//     //         if (response.ok) {
//     //             status.innerText = "Saved successfully!";
//     //             setTimeout(() => window.close(), 1500);
//     //         } else {
//     //             status.innerText = "Error saving page.";
//     //             console.error(await response.text());
//     //         }

//     //     } catch (err) {
//     //         console.error(err);
//     //         status.innerText = "Error: " + err.message;
//     //     } finally {
//     //         saveBtn.disabled = false;
//     //     }
//     // });
// });

// Define the Base API URL (used for building other paths)
const API_BASE = "https://archive-backend-gi0k.onrender.com/api";
const DASHBOARD_URL = "https://myarchive-nine.vercel.app/login";

document.addEventListener('DOMContentLoaded', async () => {
    const saveBtn = document.getElementById('saveBtn');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const status = document.getElementById('status');

    const authView = document.getElementById('auth-view');
    const loginView = document.getElementById('login-view');
    const categorySelect = document.getElementById('categorySelect');
    const newCategoryInput = document.getElementById('newCategoryInput');

    const noteInput = document.getElementById('noteInput');

    // 1. Check if user is logged in
    const { authToken } = await chrome.storage.local.get('authToken');

    if (authToken) {
        // --- FIX 1: Show the Authenticated View ---
        authView.classList.remove('hidden');

        // 2. Fetch Categories
        try {
            // --- FIX 2: Use API_BASE correctly ---
            const res = await fetch(`${API_BASE}/pages/categories`, {
                headers: { 'Authorization': `Bearer ${authToken}` }
            });

            if (res.ok) {
                const categories = await res.json();
                // Populate Dropdown
                categories.forEach(cat => {
                    if (cat === 'General') return; // General is default
                    const option = document.createElement('option');
                    option.value = cat;
                    option.innerText = cat;
                    // Insert before the "Create New" option
                    categorySelect.insertBefore(option, categorySelect.lastElementChild);
                });
            }
        } catch (err) {
            console.error("Failed to load categories", err);
        }
    } else {
        // Show Login View if no token
        loginView.classList.remove('hidden');
    }

    // Toggle "New Category" input field
    categorySelect.addEventListener('change', (e) => {
        if (e.target.value === 'new') {
            newCategoryInput.style.display = 'block';
            newCategoryInput.focus();
        } else {
            newCategoryInput.style.display = 'none';
        }
    });

    // --- Event Listeners ---

    // LOGIN: Open Dashboard
    loginBtn.addEventListener('click', () => {
        chrome.tabs.create({ url: DASHBOARD_URL });
    });

    // LOGOUT: Clear Token
    logoutBtn.addEventListener('click', () => {
        chrome.storage.local.remove('authToken', () => {
            window.close(); // Close popup
        });
    });

    // SAVE: Capture & Upload
    saveBtn.addEventListener('click', async () => {
        status.innerText = "Capturing...";
        saveBtn.disabled = true; // Prevent double clicks

        // Determine final category
        let finalCategory = categorySelect.value;
        if (finalCategory === 'new') {
            finalCategory = newCategoryInput.value.trim() || 'General';
        }

        try {
            // A. Get Active Tab
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            // B. Scripting: Get Page Text
            const [{ result: pageText }] = await chrome.scripting.executeScript({
                target: { tabId: tab.id }, func: () => document.body.innerText
            });

            // C. Screenshot
            const screenshot = await chrome.tabs.captureVisibleTab(null, { format: 'jpeg', quality: 50 });

            // D. Send to Backend
            // --- FIX 2: Use API_BASE correctly ---
            const response = await fetch(`${API_BASE}/pages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    url: tab.url,
                    title: tab.title,
                    textContent: pageText,
                    screenshot: screenshot,
                    category: finalCategory,
                    notes: noteInput.value
                })
            });

            if (response.ok) {
                status.innerText = "Saved to " + finalCategory + "!";
                setTimeout(() => window.close(), 1500);
            } else {
                status.innerText = "Error saving page.";
            }
        } catch (err) {
            status.innerText = "Error: " + err.message;
            console.error(err);
        } finally {
            saveBtn.disabled = false;
        }
    });
});