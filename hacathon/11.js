// Switch Views
function showView(view) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

    if (view === 'chat') {
        document.getElementById('chatView').classList.add('active');
    } else if (view === 'dashboard') {
        document.getElementById('dashboardView').classList.add('active');
    } else {
        document.getElementById('trackView').classList.add('active');
    }
}

// Chat Messages
function addMessage(text, type) {
    const box = document.getElementById('chatMessages');
    const div = document.createElement('div');

    div.className = 'msg ' + type;
    div.innerText = text;

    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}

// Send Message
function sendMessage() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();

    if (!text) return;

    addMessage(text, 'user');
    input.value = '';

    // simple bot reply
    setTimeout(() => {
        addMessage("Complaint received. We'll look into it.", 'bot');
    }, 500);
}

// Track Complaint
function trackComplaint() {
    const id = document.getElementById('trackInput').value;
    const result = document.getElementById('trackResult');

    if (id === "CIV-001") {
        result.innerText = "Status: In Progress";
    } else {
        result.innerText = "Not found";
    }
}

// Initial Bot Message
window.onload = () => {
    addMessage("Namaste! How can I help you?", "bot");
};