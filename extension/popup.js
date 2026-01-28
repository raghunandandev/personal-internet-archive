const API_URL = "http://localhost:5000/api/pages";
const DASHBOARD_URL = "http://localhost:5173/login";

document.addEventListener('DOMContentLoaded', async () => {
    const saveBtn = document.getElementById('saveBtn');
    const loginBtn = document.getElementById('loginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const status = document.getElementById('status');

    const authView = document.getElementById('auth-view');
    const loginView = document.getElementById('login-view');

    // 1. Check if user is logged in
    const { authToken } = await chrome.storage.local.get('authToken');

    if (authToken) {
        authView.classList.remove('hidden');
    } else {
        loginView.classList.remove('hidden');
    }

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
        saveBtn.disabled = true;

        try {
            // A. Get Active Tab
            const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

            // B. Scripting: Get Page Text
            const [{ result: pageText }] = await chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: () => document.body.innerText
            });

            // C. Screenshot: Get Image (Base64)
            const screenshot = await chrome.tabs.captureVisibleTab(null, { format: 'jpeg', quality: 50 });

            // D. Send to Backend
            status.innerText = "Uploading...";

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    url: tab.url,
                    title: tab.title,
                    textContent: pageText,
                    screenshot: screenshot
                })
            });

            if (response.ok) {
                status.innerText = "Saved successfully!";
                setTimeout(() => window.close(), 1500);
            } else {
                status.innerText = "Error saving page.";
                console.error(await response.text());
            }

        } catch (err) {
            console.error(err);
            status.innerText = "Error: " + err.message;
        } finally {
            saveBtn.disabled = false;
        }
    });
});