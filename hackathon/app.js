/* Jansunwai Portal 2.0 — App Engine */
const app = {
  currentView: 'login',
  currentDetail: null,
  charts: {},

  init() {
    const t = localStorage.getItem('jp-theme');
    if (t === 'dark') document.documentElement.setAttribute('data-theme','dark');
    document.getElementById('themeBtn').textContent = t==='dark' ? '☀️' : '🌙';
  },

  // === AUTH ===
  sendOTP() {
    const ph = document.getElementById('loginMobile').value;
    if (ph.length !== 10) { this.toast('Enter valid 10-digit number','⚠️'); return; }
    document.getElementById('login-step-1').classList.add('hidden');
    document.getElementById('login-step-2').classList.remove('hidden');
    this.toast('OTP sent to +91-'+ph,'📲');
  },
  resetLogin() {
    document.getElementById('login-step-1').classList.remove('hidden');
    document.getElementById('login-step-2').classList.add('hidden');
  },
  verifyOTP() {
    const otp = document.getElementById('loginOTP').value;
    if (otp !== '1234') { this.toast('Invalid OTP. Use 1234','❌'); return; }
    const role = document.getElementById('loginRole').value;
    const ph = document.getElementById('loginMobile').value;
    const names = {citizen:'Ramesh Patel',officer:'Rajesh Kumar',admin:'Commissioner Singh'};
    store.user = { id: role==='citizen'?'c1':role==='officer'?'o1':'a1', name:names[role], role, phone:ph, district:'Lucknow' };
    addNotification('Welcome to Jansunwai Portal 2.0!');
    this.postLogin();
  },
  postLogin() {
    const u = store.user;
    document.getElementById('userName').textContent = u.name;
    document.getElementById('userRole').textContent = u.role.charAt(0).toUpperCase()+u.role.slice(1);
    document.getElementById('userAvatar').textContent = u.name.charAt(0);
    this.buildSidebar();
    this.showView(u.role+'-dashboard');
    document.getElementById('sidebar').style.display = 'flex';
    document.getElementById('topbar').style.display = 'flex';
    this.toast('Logged in as '+u.name,'✅');
  },
  logout() {
    store.user = null;
    document.getElementById('sidebar').style.display = 'none';
    document.getElementById('topbar').style.display = 'none';
    this.showView('login');
    this.resetLogin();
    this.toast('Logged out','👋');
  },

  // === NAVIGATION ===
  buildSidebar() {
    const r = store.user.role;
    const nav = document.getElementById('sidebarNav');
    let items = [];
    if (r==='citizen') {
      items = [
        {id:'citizen-dashboard',icon:'📊',label:'Dashboard',badge:null},
        {id:'notifications',icon:'🔔',label:'Notifications',badge:store.notifications.filter(n=>!n.read).length||null},
        {id:'profile',icon:'👤',label:'My Profile',badge:null},
      ];
    } else if (r==='officer') {
      items = [
        {id:'officer-dashboard',icon:'📋',label:'Grievance Queue',badge:store.complaints.filter(c=>c.status!=='Resolved'&&c.status!=='Closed').length||null},
        {id:'notifications',icon:'🔔',label:'Notifications',badge:null},
        {id:'profile',icon:'👤',label:'My Profile',badge:null},
      ];
    } else {
      items = [
        {id:'admin-dashboard',icon:'📈',label:'Analytics',badge:null},
        {id:'notifications',icon:'🔔',label:'Notifications',badge:null},
        {id:'profile',icon:'👤',label:'My Profile',badge:null},
      ];
    }
    nav.innerHTML = '<div class="nav-section"><div class="nav-section-title">Navigation</div>' +
      items.map(i => `<div class="nav-item ${this.currentView==='view-'+i.id?'active':''}" onclick="app.navigateTo('${i.id}')">
        <span class="icon">${i.icon}</span>${i.label}${i.badge?`<span class="nav-badge">${i.badge}</span>`:''}</div>`).join('') + '</div>';
  },
  navigateTo(view) {
    this.showView(view);
    this.buildSidebar();
    if (window.innerWidth <= 768) { this.closeSidebar(); }
  },
  showView(id) {
    document.querySelectorAll('[id^="view-"]').forEach(v => v.classList.add('hidden'));
    const el = document.getElementById('view-'+id);
    if (el) { el.classList.remove('hidden'); this.currentView = id; }
    if (id==='citizen-dashboard') this.renderCitizenDashboard();
    else if (id==='officer-dashboard') this.renderOfficerDashboard();
    else if (id==='admin-dashboard') this.renderAdminDashboard();
    else if (id==='profile') this.renderProfile();
    else if (id==='notifications') this.renderNotifications();
    this.updateNotifCount();
  },

  // === CITIZEN DASHBOARD ===
  renderCitizenDashboard() {
    const u = store.user; if (!u) return;
    document.getElementById('citizenWelcome').textContent = 'Welcome, '+u.name;
    const mine = u.role==='citizen' ? store.complaints.filter(c=>c.citizenPhone===u.phone) : store.complaints;
    const total=mine.length, pending=mine.filter(c=>c.status==='Pending').length,
          prog=mine.filter(c=>c.status==='In Progress').length, esc=mine.filter(c=>c.status==='Escalated').length,
          res=mine.filter(c=>c.status==='Resolved'||c.status==='Closed').length;
    document.getElementById('citizenStats').innerHTML = [
      this.statCard('Total Filed',total,'blue','📝'),
      this.statCard('Pending',pending,'amber','⏳'),
      this.statCard('In Progress',prog,'blue','🔄'),
      this.statCard('Escalated',esc,'red','⚠️'),
      this.statCard('Resolved',res,'green','✅'),
    ].join('');
    const filter = document.getElementById('citizenFilter').value;
    const filtered = filter==='all' ? mine : mine.filter(c=>c.status===filter);
    const tbody = document.getElementById('citizenTableBody');
    const empty = document.getElementById('citizenEmpty');
    if (filtered.length===0) { tbody.innerHTML=''; empty.classList.remove('hidden'); return; }
    empty.classList.add('hidden');
    tbody.innerHTML = filtered.map(c => `<tr onclick="app.openDetail('${c.id}')">
      <td><span class="table-id">${c.id}</span></td>
      <td>${c.category}<div class="table-sub">${c.subcategory||''}</div></td>
      <td>${fmtDate(c.createdAt)}</td>
      <td><span class="badge badge-${c.priority.toLowerCase()}">${c.priority}</span></td>
      <td><span class="badge badge-${this.statusClass(c.status)}">${c.status}</span></td>
      <td><button class="btn btn-outline btn-sm" onclick="event.stopPropagation();app.openDetail('${c.id}')">View</button></td>
    </tr>`).join('');
  },

  // === OFFICER DASHBOARD ===
  renderOfficerDashboard() {
    const all = store.complaints;
    const active=all.filter(c=>c.status!=='Closed'), pending=all.filter(c=>c.status==='Pending').length,
          prog=all.filter(c=>c.status==='In Progress').length, esc=all.filter(c=>c.status==='Escalated').length,
          res=all.filter(c=>c.status==='Resolved').length;
    document.getElementById('officerStats').innerHTML = [
      this.statCard('Active Cases',active.length,'blue','📋'),
      this.statCard('Pending',pending,'amber','⏳'),
      this.statCard('In Progress',prog,'blue','🔄'),
      this.statCard('Escalated',esc,'red','🚨'),
      this.statCard('Resolved',res,'green','✅'),
    ].join('');
    const sf = document.getElementById('officerFilter').value;
    const pf = document.getElementById('officerPriorityFilter').value;
    let filtered = all;
    if (sf!=='all') filtered = filtered.filter(c=>c.status===sf);
    if (pf!=='all') filtered = filtered.filter(c=>c.priority===pf);
    document.getElementById('officerTableBody').innerHTML = filtered.map(c => {
      const days = daysAgo(c.createdAt);
      const sla = getSLA(c.category);
      const limit = c.escalationLevel===1?sla.l1:c.escalationLevel===2?sla.l2:sla.l3;
      const slaClass = days>=limit?'badge-escalated':days>=limit-1?'badge-pending':'badge-resolved';
      return `<tr onclick="app.openDetail('${c.id}')">
        <td><span class="table-id">${c.id}</span></td>
        <td>${c.citizenName}<div class="table-sub">${c.citizenDistrict}</div></td>
        <td>${c.category}<div class="table-sub">${c.subcategory||''}</div></td>
        <td><span class="badge ${slaClass}">Day ${days}/${limit}</span></td>
        <td><span class="badge badge-${c.priority.toLowerCase()}">${c.priority}</span></td>
        <td><span class="badge badge-${this.statusClass(c.status)}">${c.status}</span></td>
        <td><button class="btn btn-primary btn-sm" onclick="event.stopPropagation();app.openDetail('${c.id}')">Action</button></td>
      </tr>`;
    }).join('');
  },

  // === ADMIN DASHBOARD ===
  renderAdminDashboard() {
    const all = store.complaints;
    const total=all.length, pending=all.filter(c=>c.status==='Pending').length,
          esc=all.filter(c=>c.status==='Escalated').length, res=all.filter(c=>c.status==='Resolved'||c.status==='Closed').length;
    const avgDays = all.length ? Math.round(all.reduce((s,c)=>s+daysAgo(c.createdAt),0)/all.length) : 0;
    document.getElementById('adminStats').innerHTML = [
      this.statCard('Total Grievances',total,'blue','📊'),
      this.statCard('Pending',pending,'amber','⏳'),
      this.statCard('Escalated',esc,'red','🚨'),
      this.statCard('Resolved',res,'green','✅'),
      this.statCard('Avg Age (days)',avgDays,'purple','📅'),
    ].join('');
    document.getElementById('adminTableBody').innerHTML = all.map(c => `<tr onclick="app.openDetail('${c.id}')">
      <td><span class="table-id">${c.id}</span></td>
      <td>${c.citizenName}</td><td>${c.category}</td><td>${c.assignedOfficerName}</td>
      <td><span class="badge badge-${c.priority.toLowerCase()}">${c.priority}</span></td>
      <td><span class="badge badge-${this.statusClass(c.status)}">${c.status}</span></td>
      <td>L${c.escalationLevel}</td>
    </tr>`).join('');
    this.renderCharts();
  },

  renderCharts() {
    const all = store.complaints;
    const isDark = document.documentElement.getAttribute('data-theme')==='dark';
    const fontColor = isDark?'#94a3b8':'#475569';
    const gridColor = isDark?'rgba(148,163,184,.1)':'rgba(0,0,0,.06)';
    Object.values(this.charts).forEach(c=>c.destroy());
    this.charts = {};
    const statusCounts = ['Pending','In Progress','Escalated','Resolved','Closed'].map(s=>all.filter(c=>c.status===s).length);
    this.charts.status = new Chart(document.getElementById('chartStatus'),{type:'doughnut',data:{labels:['Pending','In Progress','Escalated','Resolved','Closed'],datasets:[{data:statusCounts,backgroundColor:['#d97706','#2563eb','#dc2626','#059669','#94a3b8']}]},options:{plugins:{legend:{labels:{color:fontColor}}}}});
    const cats = [...new Set(all.map(c=>c.category))];
    this.charts.category = new Chart(document.getElementById('chartCategory'),{type:'bar',data:{labels:cats,datasets:[{label:'Count',data:cats.map(c=>all.filter(x=>x.category===c).length),backgroundColor:'#2563eb'}]},options:{plugins:{legend:{display:false}},scales:{x:{ticks:{color:fontColor},grid:{display:false}},y:{ticks:{color:fontColor},grid:{color:gridColor}}}}});
    const priCounts = ['Critical','High','Medium','Low'].map(p=>all.filter(c=>c.priority===p).length);
    this.charts.priority = new Chart(document.getElementById('chartPriority'),{type:'polarArea',data:{labels:['Critical','High','Medium','Low'],datasets:[{data:priCounts,backgroundColor:['#dc2626','#f59e0b','#2563eb','#059669']}]},options:{plugins:{legend:{labels:{color:fontColor}}}}});
    const weekData = Array(7).fill(0);
    all.forEach(c=>{const d=daysAgo(c.createdAt);if(d<7)weekData[6-d]++;});
    this.charts.trend = new Chart(document.getElementById('chartTrend'),{type:'line',data:{labels:['6d ago','5d','4d','3d','2d','1d','Today'],datasets:[{label:'New Grievances',data:weekData,borderColor:'#7c3aed',backgroundColor:'rgba(124,58,237,.1)',fill:true,tension:.4}]},options:{plugins:{legend:{labels:{color:fontColor}}},scales:{x:{ticks:{color:fontColor},grid:{display:false}},y:{ticks:{color:fontColor},grid:{color:gridColor}}}}});
  },

  // === COMPLAINT DETAIL ===
  openDetail(id) {
    const c = store.complaints.find(x=>x.id===id);
    if (!c) return;
    this.currentDetail = c;
    document.getElementById('cdId').textContent = c.id;
    document.getElementById('cdMeta').textContent = 'Registered: '+fmtDateTime(c.createdAt)+' | Updated: '+fmtDateTime(c.updatedAt);
    document.getElementById('cdStatus').className = 'badge badge-'+this.statusClass(c.status);
    document.getElementById('cdStatus').textContent = c.status;
    document.getElementById('cdPriority').className = 'badge badge-'+c.priority.toLowerCase();
    document.getElementById('cdPriority').textContent = c.priority;
    document.getElementById('cdLevel').textContent = 'Level '+c.escalationLevel;
    document.getElementById('cdCitizen').textContent = c.citizenName+' ('+c.citizenPhone+')';
    document.getElementById('cdLocation').textContent = c.citizenDistrict+', '+c.citizenWard;
    document.getElementById('cdCategory').textContent = c.category+' → '+c.subcategory;
    document.getElementById('cdDesc').textContent = c.description;
    document.getElementById('cdOfficer').textContent = c.assignedOfficerName+' (L'+c.escalationLevel+')';
    // Timeline
    document.getElementById('cdTimeline').innerHTML = c.timeline.map(t => `<div class="tl-item">
      <div class="tl-dot ${t.type}"></div>
      <div class="tl-content"><div class="tl-title">${t.title}</div>
      <div class="tl-meta"><span>${t.actor}</span><span>${fmtDateTime(t.timestamp)}</span></div>
      ${t.note?`<div class="tl-note">${t.note}</div>`:''}</div></div>`).join('');
    // Show/hide role-specific sections
    const isOfficer = store.user && (store.user.role==='officer'||store.user.role==='admin');
    const isCitizen = store.user && store.user.role==='citizen';
    document.getElementById('officerActions').classList.toggle('hidden', !isOfficer || c.status==='Closed');
    document.getElementById('citizenFeedback').classList.toggle('hidden', !(isCitizen && c.status==='Resolved'));
    if (isOfficer) document.getElementById('cdActionStatus').value = c.status;
    this.openModal('modalDetail');
  },

  // === OFFICER ACTIONS ===
  saveOfficerAction() {
    const c = this.currentDetail; if (!c) return;
    const newStatus = document.getElementById('cdActionStatus').value;
    const note = document.getElementById('cdActionNote').value;
    if (!note.trim()) { this.toast('Please add remarks','⚠️'); return; }
    c.status = newStatus;
    c.updatedAt = new Date();
    if (newStatus==='Resolved') c.resolvedAt = new Date();
    c.timeline.push({title:'Status: '+newStatus,timestamp:new Date(),note:note,actor:store.user.name,actorRole:'officer',type:'officer'});
    addNotification(`${c.id} updated to "${newStatus}" by ${store.user.name}`);
    document.getElementById('cdActionNote').value = '';
    this.closeModal('modalDetail');
    this.toast('Grievance updated to '+newStatus,'✅');
    if (this.currentView==='officer-dashboard') this.renderOfficerDashboard();
    else if (this.currentView==='admin-dashboard') this.renderAdminDashboard();
    else this.renderCitizenDashboard();
  },

  // === CITIZEN FEEDBACK ===
  submitFeedback(answer) {
    const c = this.currentDetail; if (!c) return;
    if (answer==='yes') {
      c.status = 'Closed';
      c.timeline.push({title:'✅ Citizen Confirmed Resolution',timestamp:new Date(),note:'Citizen marked as satisfied. Case closed.',actor:store.user.name,actorRole:'citizen',type:'citizen'});
      addNotification(c.id+' closed by citizen with positive feedback');
      this.toast('Thank you! Case closed.','✅');
    } else {
      c.status = 'In Progress';
      c.timeline.push({title:'🔄 Citizen Reopened',timestamp:new Date(),note:'Citizen not satisfied. Case reopened for further action.',actor:store.user.name,actorRole:'citizen',type:'citizen'});
      addNotification(c.id+' reopened by citizen');
      this.toast('Case reopened for further action','🔄');
    }
    c.updatedAt = new Date();
    this.closeModal('modalDetail');
    this.renderCitizenDashboard();
  },

  // === NEW COMPLAINT ===
  updateSubcategories() {
    const cat = document.getElementById('ncCategory').value;
    const dept = DEPARTMENTS.find(d=>d.name===cat);
    const sel = document.getElementById('ncSubcategory');
    sel.innerHTML = '<option value="">Select Sub-Category</option>';
    if (dept) dept.subs.forEach(s => { const o=document.createElement('option'); o.value=s; o.textContent=s; sel.appendChild(o); });
  },
  submitComplaint(e) {
    e.preventDefault();
    const cat = document.getElementById('ncCategory').value;
    const sub = document.getElementById('ncSubcategory').value;
    const dist = document.getElementById('ncDistrict').value;
    const ward = document.getElementById('ncWard').value;
    const desc = document.getElementById('ncDesc').value;
    if (!cat||!sub||!desc) { this.toast('Fill all required fields','⚠️'); return; }
    const priority = detectPriority(desc);
    const officer = assignOfficer(cat);
    const id = genId();
    const complaint = {
      id, citizenName:store.user.name, citizenPhone:store.user.phone, citizenDistrict:dist, citizenWard:ward,
      category:cat, subcategory:sub, description:desc, priority, status:'Pending', escalationLevel:1,
      createdAt:new Date(), updatedAt:new Date(), resolvedAt:null,
      assignedOfficerId:officer.id, assignedOfficerName:officer.name,
      timeline:[{title:'Complaint Registered',timestamp:new Date(),note:`Auto-assigned to ${cat} dept → ${officer.name}. Priority: ${priority}`,actor:'System',actorRole:'system',type:'system'}]
    };
    store.complaints.unshift(complaint);
    addNotification(`New grievance ${id} registered. Priority: ${priority}`);
    this.closeModal('modalNewComplaint');
    document.getElementById('formNewComplaint').reset();
    this.toast(`Grievance ${id} registered! Priority: ${priority}`,'✅');
    this.renderCitizenDashboard();
    this.buildSidebar();
  },

  // === SLA SIMULATION ===
  simulateDay() {
    store.dayOffset++;
    let escalated = 0;
    store.complaints.forEach(c => {
      if (c.status==='Closed'||c.status==='Resolved') return;
      const days = daysAgo(c.createdAt) + store.dayOffset;
      const sla = getSLA(c.category);
      const limits = [sla.l1,sla.l2,sla.l3];
      if (c.escalationLevel<=2 && days>=limits[c.escalationLevel-1]) {
        c.escalationLevel++;
        c.status = 'Escalated';
        const newOfficer = OFFICERS.find(o=>o.level===c.escalationLevel) || OFFICERS[OFFICERS.length-1];
        c.assignedOfficerId = newOfficer.id;
        c.assignedOfficerName = newOfficer.name;
        c.updatedAt = new Date();
        c.timeline.push({title:`⚠️ Auto-Escalated to Level ${c.escalationLevel}`,timestamp:new Date(),note:`SLA breached (${limits[c.escalationLevel-2]} days). Escalated to ${newOfficer.name}.`,actor:'System',actorRole:'system',type:'escalation'});
        addNotification(`🚨 ${c.id} escalated to Level ${c.escalationLevel} — ${newOfficer.name}`);
        escalated++;
      }
    });
    this.toast(`+1 Day simulated. ${escalated} case(s) escalated.`, escalated?'🚨':'⏱');
    const v = this.currentView;
    if (v==='officer-dashboard') this.renderOfficerDashboard();
    else if (v==='admin-dashboard') this.renderAdminDashboard();
    else this.renderCitizenDashboard();
    this.buildSidebar();
  },

  // === PROFILE ===
  renderProfile() {
    const u = store.user; if (!u) return;
    document.getElementById('profileAvatar').textContent = u.name.charAt(0);
    document.getElementById('profileName').textContent = u.name;
    document.getElementById('profileRole').textContent = u.role.charAt(0).toUpperCase()+u.role.slice(1);
    document.getElementById('profilePhone').textContent = '+91-'+u.phone;
    document.getElementById('profileDistrict').textContent = u.district;
    document.getElementById('profileTotal').textContent = store.complaints.filter(c=>c.citizenPhone===u.phone).length;
    document.getElementById('profileSince').textContent = fmtDate(new Date());
  },

  // === NOTIFICATIONS ===
  renderNotifications() {
    const el = document.getElementById('notifFullList');
    if (store.notifications.length===0) { el.innerHTML='<div class="empty-state"><div class="icon">🔔</div><h3>No notifications</h3><p>You\'re all caught up!</p></div>'; return; }
    el.innerHTML = store.notifications.map(n => `<div class="notif-item ${n.read?'':'unread'}" onclick="this.classList.remove('unread')">
      <div class="notif-icon" style="background:var(--primary-light);color:var(--primary);">📌</div>
      <div class="notif-text"><div class="title">${n.message}</div><div class="time">${fmtDateTime(n.createdAt)}</div></div></div>`).join('');
    store.notifications.forEach(n=>n.read=true);
    this.updateNotifCount();
  },
  updateNotifCount() {
    const c = store.notifications.filter(n=>!n.read).length;
    document.getElementById('notifCount').textContent = c;
    document.getElementById('notifCount').style.display = c?'flex':'none';
  },
  toggleNotifPanel() {
    document.getElementById('notifPanel').classList.toggle('open');
    const list = document.getElementById('notifList');
    list.innerHTML = store.notifications.slice(0,8).map(n => `<div class="notif-item ${n.read?'':'unread'}">
      <div class="notif-icon" style="background:var(--primary-light);color:var(--primary);">📌</div>
      <div class="notif-text"><div class="title">${n.message}</div><div class="time">${fmtDateTime(n.createdAt)}</div></div></div>`).join('') || '<div class="empty-state"><p>No notifications</p></div>';
  },
  clearNotifications() {
    store.notifications = [];
    this.updateNotifCount();
    document.getElementById('notifList').innerHTML = '<div class="empty-state"><p>No notifications</p></div>';
    document.getElementById('notifPanel').classList.remove('open');
  },

  // === THEME ===
  toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme')==='dark';
    document.documentElement.setAttribute('data-theme', isDark?'':'dark');
    localStorage.setItem('jp-theme', isDark?'':'dark');
    document.getElementById('themeBtn').textContent = isDark?'🌙':'☀️';
    if (this.currentView==='admin-dashboard') setTimeout(()=>this.renderCharts(),100);
  },

  // === SIDEBAR ===
  toggleSidebar() {
    document.getElementById('sidebar').classList.toggle('open');
    document.getElementById('sidebarOverlay').classList.toggle('open');
  },
  closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebarOverlay').classList.remove('open');
  },

  // === SEARCH ===
  handleSearch(q) {
    if (!q || q.length < 2) return;
    const found = store.complaints.find(c => c.id.toLowerCase().includes(q.toLowerCase()) || c.description.toLowerCase().includes(q.toLowerCase()));
    if (found) this.openDetail(found.id);
  },

  // === MODAL ===
  openModal(id) { const m=document.getElementById(id); if(m){m.classList.add('active');} },
  closeModal(id) { const m=document.getElementById(id); if(m){m.classList.remove('active');} },

  // === TOAST ===
  toast(msg, icon='ℹ️') {
    const c = document.getElementById('toast-container');
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = `<span class="toast-icon">${icon}</span><div><div class="toast-title">${msg}</div></div>`;
    c.appendChild(t);
    requestAnimationFrame(()=>t.classList.add('show'));
    setTimeout(()=>{t.classList.remove('show');setTimeout(()=>t.remove(),300);},3500);
  },

  // === HELPERS ===
  statCard(label,value,color,icon) {
    return `<div class="stat-card ${color}"><div class="stat-label">${icon} ${label}</div><div class="stat-value">${value}</div></div>`;
  },
  statusClass(s) {
    const m = {'Pending':'pending','In Progress':'progress','Escalated':'escalated','Resolved':'resolved','Closed':'closed'};
    return m[s]||'pending';
  },
};

// Boot
document.addEventListener('DOMContentLoaded', () => {
  app.init();
  document.getElementById('sidebar').style.display = 'none';
  document.getElementById('topbar').style.display = 'none';
});
// Close modals on overlay click
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) {
    e.target.classList.remove('active');
  }
});
