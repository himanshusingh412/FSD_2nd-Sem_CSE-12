// ── LANGUAGE CONFIG ──
const GREETINGS = {
  en: [
    { role:'bot', text:'🙏 Namaste! I am CivicAI, your 24/7 government helpline assistant. How can I help you today?', chips:['Register a complaint','Check complaint status','Talk to an officer','Emergency'] },
  ],
  hi: [
    { role:'bot', text:'🙏 नमस्ते! मैं CivicAI हूँ, आपकी 24/7 सरकारी हेल्पलाइन। मैं आपकी कैसे सहायता कर सकता हूँ?', chips:['शिकायत दर्ज करें','शिकायत की स्थिति जाँचें','अधिकारी से बात करें'] },
  ],
  ta: [
    { role:'bot', text:'🙏 வணக்கம்! நான் CivicAI, உங்கள் 24/7 அரசு உதவி மையம். நான் உங்களுக்கு எவ்வாறு உதவலாம்?', chips:['புகார் பதிவு செய்யவும்','நிலையை சரிபார்க்கவும்'] },
  ]
};

const BOT_FLOWS = {
  'register a complaint': [
    { delay:800, text:'Sure! What category does your complaint fall under?', chips:['💧 Water Supply','🛣️ Roads & Transport','⚡ Electricity','🏥 Healthcare','🗑️ Sanitation','📶 Other'] },
  ],
  '💧 water supply': [
    { delay:700, text:'Got it — Water Supply complaint. Please briefly describe the issue:' },
  ],
  '🛣️ roads & transport': [
    { delay:700, text:'Roads & Transport — noted. What is the specific issue?' },
  ],
  '⚡ electricity': [
    { delay:700, text:'Electricity issue noted. Please describe the problem and your area:' },
  ],
  'check complaint status': [
    { delay:600, text:'Please share your Complaint ID (format: CIV-YYYYMMDD-XXX).\n\nDon\'t have it? I can look it up by your phone number 📱' },
  ],
  'talk to an officer': [
    { delay:500, text:'Connecting you to the nearest available officer... 🔄', next:{ delay:1500, text:'An officer from the Municipal Corporation will call you within 15 minutes on your registered number. Reference: #CALL-2026-8821' } }
  ],
  'emergency': [
    { delay:300, text:'🚨 For emergencies:\n• Police: 100\n• Fire: 101\n• Ambulance: 102\n• Disaster: 108\n\nFor civic emergencies (flooding, power outage), your complaint is being marked HIGH PRIORITY.', chips:['Register urgent complaint','Call emergency services'] }
  ]
};

let currentLang = 'en';
let waitingForComplaint = false;
let complaintCategory = '';
let complaintCount = 6;

function setLang(lang, el) {
  currentLang = lang;
  document.querySelectorAll('.lang-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  clearChat();
  startChat();
}

function clearChat() {
  document.getElementById('chatMessages').innerHTML = '';
}

function startChat() {
  const greet = GREETINGS[currentLang][0];
  setTimeout(() => addBotMessage(greet.text, greet.chips), 400);
}

function addBotMessage(text, chips = []) {
  const msgs = document.getElementById('chatMessages');

  // typing indicator
  const typing = document.createElement('div');
  typing.className = 'msg bot';
  typing.innerHTML = `
    <div class="msg-avatar">🤖</div>
    <div class="typing-indicator">
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
      <div class="typing-dot"></div>
    </div>`;
  msgs.appendChild(typing);
  msgs.scrollTop = msgs.scrollHeight;

  setTimeout(() => {
    typing.remove();
    const div = document.createElement('div');
    div.className = 'msg bot';
    div.style.animation = 'msgIn 0.3s ease';
    const now = new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
    div.innerHTML = `
      <div class="msg-avatar">🤖</div>
      <div>
        <div class="msg-bubble" style="white-space:pre-line">${text}</div>
        ${chips.length ? `<div class="quick-replies">${chips.map(c=>`<div class="quick-chip" onclick="handleChip('${c}')">${c}</div>`).join('')}</div>` : ''}
        <div class="msg-time">${now}</div>
      </div>`;
    msgs.appendChild(div);
    msgs.scrollTop = msgs.scrollHeight;
  }, 1000);
}

function addUserMessage(text) {
  const msgs = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = 'msg user';
  const now = new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
  div.innerHTML = `
    <div class="msg-avatar">👤</div>
    <div>
      <div class="msg-bubble">${text}</div>
      <div class="msg-time">${now}</div>
    </div>`;
  msgs.appendChild(div);
  msgs.scrollTop = msgs.scrollHeight;
}

function handleChip(text) {
  addUserMessage(text);
  respondTo(text.toLowerCase());
}

function sendMessage() {
  const input = document.getElementById('chatInput');
  const text = input.value.trim();
  if (!text) return;
  input.value = '';
  addUserMessage(text);

  if (waitingForComplaint) {
    registerComplaint(text);
    return;
  }
  respondTo(text.toLowerCase());
}

function respondTo(text) {
  // Check predefined flows
  for (const key in BOT_FLOWS) {
    if (text.includes(key)) {
      const flow = BOT_FLOWS[key];
      flow.forEach((step, i) => {
        setTimeout(() => {
          if (step.next) {
            addBotMessage(step.text, step.chips || []);
            setTimeout(() => addBotMessage(step.next.text, step.next.chips || []), step.next.delay);
          } else {
            if (key === '💧 water supply' || key === '🛣️ roads & transport' || key === '⚡ electricity') {
              complaintCategory = key;
              waitingForComplaint = true;
            }
            addBotMessage(step.text, step.chips || []);
          }
        }, i * 200 + step.delay);
      });
      return;
    }
  }

  // Category descriptions
  if (waitingForComplaint && text.length > 5) {
    registerComplaint(text);
    return;
  }

  // CIV ID lookup
  if (text.includes('civ-')) {
    const id = text.toUpperCase();
    addBotMessage(`🔍 Looking up ${id}...\n\n✅ Found! Status: **In Progress**\n📍 Assigned to: Ramesh Kumar, Water Dept.\n⏱️ Expected resolution: Within 2 days\n\nWould you like to get SMS updates?`, ['Yes, notify me','No thanks']);
    return;
  }

  // Default responses
  const defaults = [
    'I understand. Could you please provide more details so I can help you better? 😊',
    'Let me help you with that! Can you tell me which area of Delhi this concerns?',
    'Got it! For fastest service, please tell me:\n1. Your area/ward\n2. The specific issue\n3. Since when has this been happening'
  ];
  addBotMessage(defaults[Math.floor(Math.random() * defaults.length)], ['Register a complaint','Check complaint status','Emergency']);
}

function registerComplaint(desc) {
  waitingForComplaint = false;
  const id = `CIV-20260403-00${complaintCount++}`;
  const cat = complaintCategory || '📋 General';
  const dept = cat.includes('water') ? 'Water Supply Department' : cat.includes('road') ? 'Roads & Transport' : 'Municipal Corporation';

  addBotMessage(`✅ **Complaint Registered Successfully!**\n\nYour complaint has been registered and routed to the ${dept}. You will receive a confirmation SMS shortly.\n\nComplaint ID: **${id}**\nEstimated Resolution: 3 working days\n\nYou can track your complaint anytime using this ID 🔍`, ['Track my complaint','Register another','Go to Dashboard']);

  // Add to right sidebar
  setTimeout(() => {
    const sidebar = document.querySelector('.sidebar-right');
    const first = sidebar.querySelector('.complaint-item');
    const newCard = document.createElement('div');
    newCard.className = 'complaint-item status-pending';
    newCard.innerHTML = `
      <div class="ci-top">
        <span class="ci-id">${id.split('-')[2]}</span>
        <span class="ci-status st-pending">Pending</span>
      </div>
      <div class="ci-type">${cat} </div>
      <div class="ci-desc">${desc.substring(0, 50)}...</div>
      <div class="progress-wrap">
        <div class="progress-bar"><div class="progress-fill fill-pending"></div></div>
      </div>
      <div class="ci-meta">Just now · Unassigned</div>`;
    sidebar.insertBefore(newCard, first);
    newCard.style.animation = 'msgIn 0.4s ease';
  }, 1500);
}

function handleKey(e) {
  if (e.key === 'Enter') sendMessage();
}

// ── VIEW SWITCHING ──
function showView(view) {
  document.getElementById('viewChat').style.display = view === 'chat' ? 'flex' : 'none';
  document.getElementById('viewDashboard').style.display = view === 'dashboard' ? 'block' : 'none';
  document.getElementById('viewTrack').style.display = view === 'track' ? 'block' : 'none';
  ['tabChat','tabDash','tabTrack'].forEach(id => document.getElementById(id).classList.remove('active'));
  document.getElementById(view === 'chat' ? 'tabChat' : view === 'dashboard' ? 'tabDash' : 'tabTrack').classList.add('active');
}

function switchTab(view, el) {
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  el.classList.add('active');
  showView(view === 'track' ? 'track' : view === 'dashboard' ? 'dashboard' : 'chat');
}

// ── MODAL ──
function openModal(id, cat, desc, priority, status, assign, time) {
  document.getElementById('m-id').textContent = id;
  document.getElementById('m-cat').textContent = cat;
  document.getElementById('m-desc').textContent = desc;
  document.getElementById('m-priority').textContent = priority;
  document.getElementById('m-status').innerHTML = `<span class="badge badge-${status === 'Resolved' ? 'resolved' : status === 'In Progress' ? 'progress' : 'pending'}">${status}</span>`;
  document.getElementById('m-assign').textContent = assign;
  document.getElementById('m-time').textContent = 'Filed: ' + time;
  document.getElementById('m-t1').textContent = time;
  if (status === 'Resolved') {
    document.getElementById('m-tl3').querySelector('.tl-dot').className = 'tl-dot done';
    document.getElementById('m-tl3').querySelector('.tl-dot').textContent = '✓';
  }
  document.getElementById('modalOverlay').classList.add('open');
}

function closeModal(e) {
  if (!e || e.target === document.getElementById('modalOverlay')) {
    document.getElementById('modalOverlay').classList.remove('open');
  }
}

// ── TRACK COMPLAINT ──
// NOTE: In a real backend, this data would be fetched via API (e.g. GET /api/complaints/:id)
const COMPLAINT_DB = {
  'CIV-20260403-001': { cat:'💧 Water Supply', assign:'Ramesh Kumar, Water Dept.', status:'In Progress', time:'Apr 1, 2026 · 9:12 AM' },
  'CIV-20260403-002': { cat:'🛣️ Roads & Transport', assign:'Unassigned', status:'Pending', time:'Apr 2, 2026 · 11:30 AM' },
  'CIV-20260403-003': { cat:'⚡ Electricity', assign:'Suresh Yadav, BSES', status:'In Progress', time:'Apr 2, 2026 · 2:00 PM' },
  'CIV-20260403-004': { cat:'🗑️ Sanitation', assign:'Mohan, MCD', status:'Resolved', time:'Mar 31, 2026 · 8:00 AM' },
};

function trackComplaint() {
  const id = document.getElementById('trackInput').value.trim().toUpperCase();
  const result = document.getElementById('trackResult');
  const data = COMPLAINT_DB[id];

  if (data) {
    document.getElementById('tr-id').textContent = id;
    document.getElementById('tr-cat').textContent = data.cat;
    document.getElementById('tr-assign').textContent = data.assign;
    document.getElementById('tr-status').textContent = data.status;
    document.getElementById('tr-status').className = 'badge badge-' + (data.status === 'Resolved' ? 'resolved' : data.status === 'In Progress' ? 'progress' : 'pending');
    document.getElementById('tr-t1').textContent = data.time;
    result.style.display = 'block';
    result.style.animation = 'msgIn 0.4s ease';
  } else {
    alert('Complaint ID not found. Please check and try again.\n\nTry: CIV-20260403-001');
  }
}

// ── INIT ──
startChat();