/* === Jansunwai Portal 2.0 — Data Layer === */

const DEPARTMENTS = [
  { id:'d1', name:'Electricity', code:'ELEC', icon:'⚡', subs:['Power Outage','Meter Issue','Billing Dispute','New Connection','Transformer Fault'], sla:{l1:3,l2:7,l3:15} },
  { id:'d2', name:'Water', code:'WATER', icon:'💧', subs:['No Water Supply','Contaminated Water','Pipeline Leak','Billing Issue','New Connection'], sla:{l1:3,l2:7,l3:15} },
  { id:'d3', name:'Police', code:'POL', icon:'🚔', subs:['FIR Status','Noise Complaint','Traffic Issue','Cybercrime','Missing Person'], sla:{l1:2,l2:5,l3:10} },
  { id:'d4', name:'Revenue', code:'REV', icon:'📜', subs:['Land Dispute','Property Tax','Land Record','Stamp Duty','Mutation'], sla:{l1:5,l2:10,l3:20} },
  { id:'d5', name:'Municipal', code:'MUN', icon:'🏗️', subs:['Garbage Collection','Road Damage','Street Light','Drainage','Encroachment'], sla:{l1:3,l2:7,l3:15} },
  { id:'d6', name:'Health', code:'HLT', icon:'🏥', subs:['Hospital Service','Medicine Shortage','Ambulance','Vaccination','Sanitation'], sla:{l1:2,l2:5,l3:10} },
  { id:'d7', name:'Education', code:'EDU', icon:'📚', subs:['School Infrastructure','Teacher Absence','Mid-day Meal','Admission Issue','Scholarship'], sla:{l1:5,l2:10,l3:20} },
  { id:'d8', name:'Transport', code:'TRN', icon:'🚌', subs:['Road Condition','Bus Service','Traffic Signal','Parking Issue','Toll Dispute'], sla:{l1:3,l2:7,l3:15} },
];

const OFFICERS = [
  { id:'o1', name:'Rajesh Kumar', dept:'Electricity', district:'Lucknow', level:1 },
  { id:'o2', name:'Priya Singh', dept:'Water', district:'Lucknow', level:1 },
  { id:'o3', name:'Amit Verma', dept:'Police', district:'Lucknow', level:1 },
  { id:'o4', name:'Sunita Devi', dept:'Revenue', district:'Lucknow', level:1 },
  { id:'o5', name:'Vikram Rao', dept:'Municipal', district:'Lucknow', level:1 },
  { id:'o6', name:'Dr. Neha Gupta', dept:'Health', district:'Lucknow', level:1 },
  { id:'o7', name:'Sanjay Mishra', dept:'Education', district:'Lucknow', level:1 },
  { id:'o8', name:'Meera Joshi', dept:'Transport', district:'Lucknow', level:1 },
  { id:'o9', name:'DM Lucknow', dept:'All', district:'Lucknow', level:2 },
  { id:'o10', name:'State Commissioner', dept:'All', district:'All', level:3 },
];

const PRIORITY_KEYWORDS = {
  Critical: ['death','fire','flood','collapsed','explosion','stampede'],
  High: ['emergency','accident','no water','no electricity','sewage overflow','building crack'],
  Medium: ['garbage','pothole','street light','leak','broken','delay'],
};

function detectPriority(text) {
  const t = text.toLowerCase();
  for (const [p, words] of Object.entries(PRIORITY_KEYWORDS)) {
    if (words.some(w => t.includes(w))) return p;
  }
  return 'Low';
}

function assignOfficer(category) {
  return OFFICERS.find(o => o.dept === category && o.level === 1) || OFFICERS[0];
}

function getSLA(category) {
  const dept = DEPARTMENTS.find(d => d.name === category);
  return dept ? dept.sla : { l1:3, l2:7, l3:15 };
}

function genId() {
  return 'JAN-' + String(Math.floor(1000 + Math.random() * 9000));
}

function fmtDate(d) {
  return new Date(d).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });
}

function fmtDateTime(d) {
  return new Date(d).toLocaleString('en-IN', { day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit' });
}

function daysAgo(d) {
  return Math.floor((Date.now() - new Date(d).getTime()) / 86400000);
}

// Seed complaints
const NOW = Date.now();
const DAY = 86400000;

const SEED_COMPLAINTS = [
  { id:'JAN-1001', citizenName:'Ramesh Patel', citizenPhone:'9876543210', citizenDistrict:'Lucknow', citizenWard:'Ward 12',
    category:'Electricity', subcategory:'Power Outage', description:'No electricity in Gomti Nagar since 3 days. Transformer burnt. Emergency situation for elderly residents.',
    priority:'High', status:'In Progress', escalationLevel:1, createdAt:new Date(NOW-5*DAY), updatedAt:new Date(NOW-2*DAY),
    assignedOfficerId:'o1', assignedOfficerName:'Rajesh Kumar',
    timeline:[
      {title:'Complaint Registered',timestamp:new Date(NOW-5*DAY),note:'Auto-assigned to Electricity dept',actor:'System',actorRole:'system',type:'system'},
      {title:'Officer Acknowledged',timestamp:new Date(NOW-4*DAY),note:'Inspection scheduled for tomorrow',actor:'Rajesh Kumar',actorRole:'officer',type:'officer'},
      {title:'Status: In Progress',timestamp:new Date(NOW-2*DAY),note:'Transformer replacement ordered',actor:'Rajesh Kumar',actorRole:'officer',type:'officer'},
    ]
  },
  { id:'JAN-1002', citizenName:'Sita Sharma', citizenPhone:'9123456789', citizenDistrict:'Lucknow', citizenWard:'Ward 8',
    category:'Water', subcategory:'No Water Supply', description:'No water supply for 2 days in Aliganj area. Tanker not coming despite multiple calls.',
    priority:'High', status:'Escalated', escalationLevel:2, createdAt:new Date(NOW-8*DAY), updatedAt:new Date(NOW-1*DAY),
    assignedOfficerId:'o9', assignedOfficerName:'DM Lucknow',
    timeline:[
      {title:'Complaint Registered',timestamp:new Date(NOW-8*DAY),note:'Auto-assigned to Water dept',actor:'System',actorRole:'system',type:'system'},
      {title:'Officer Acknowledged',timestamp:new Date(NOW-7*DAY),note:'Checking pipeline status',actor:'Priya Singh',actorRole:'officer',type:'officer'},
      {title:'⚠️ Auto-Escalated to Level 2',timestamp:new Date(NOW-1*DAY),note:'SLA breached (7 days). Escalated to DM Lucknow.',actor:'System',actorRole:'system',type:'escalation'},
    ]
  },
  { id:'JAN-1003', citizenName:'Ramesh Patel', citizenPhone:'9876543210', citizenDistrict:'Lucknow', citizenWard:'Ward 12',
    category:'Municipal', subcategory:'Garbage Collection', description:'Garbage not collected for a week near Hazratganj market.',
    priority:'Medium', status:'Resolved', escalationLevel:1, createdAt:new Date(NOW-10*DAY), updatedAt:new Date(NOW-3*DAY), resolvedAt:new Date(NOW-3*DAY),
    assignedOfficerId:'o5', assignedOfficerName:'Vikram Rao',
    timeline:[
      {title:'Complaint Registered',timestamp:new Date(NOW-10*DAY),note:'Auto-assigned to Municipal dept',actor:'System',actorRole:'system',type:'system'},
      {title:'Status: In Progress',timestamp:new Date(NOW-8*DAY),note:'Sanitation team dispatched',actor:'Vikram Rao',actorRole:'officer',type:'officer'},
      {title:'Status: Resolved',timestamp:new Date(NOW-3*DAY),note:'Area cleaned. Regular schedule restored.',actor:'Vikram Rao',actorRole:'officer',type:'officer'},
    ]
  },
  { id:'JAN-1004', citizenName:'Anita Gupta', citizenPhone:'9988776655', citizenDistrict:'Kanpur', citizenWard:'Ward 5',
    category:'Police', subcategory:'Noise Complaint', description:'Loud music from wedding hall every night till 2 AM. Repeated complaints to local police ignored.',
    priority:'Low', status:'Pending', escalationLevel:1, createdAt:new Date(NOW-2*DAY), updatedAt:new Date(NOW-2*DAY),
    assignedOfficerId:'o3', assignedOfficerName:'Amit Verma',
    timeline:[
      {title:'Complaint Registered',timestamp:new Date(NOW-2*DAY),note:'Auto-assigned to Police dept',actor:'System',actorRole:'system',type:'system'},
    ]
  },
  { id:'JAN-1005', citizenName:'Ramesh Patel', citizenPhone:'9876543210', citizenDistrict:'Lucknow', citizenWard:'Ward 12',
    category:'Health', subcategory:'Hospital Service', description:'PHC in Chinhat has no doctor available since last week. Patients being turned away.',
    priority:'Critical', status:'Pending', escalationLevel:1, createdAt:new Date(NOW-1*DAY), updatedAt:new Date(NOW-1*DAY),
    assignedOfficerId:'o6', assignedOfficerName:'Dr. Neha Gupta',
    timeline:[
      {title:'Complaint Registered',timestamp:new Date(NOW-1*DAY),note:'🔴 CRITICAL: Auto-assigned to Health dept',actor:'System',actorRole:'system',type:'system'},
    ]
  },
];

// In-memory store
const store = {
  user: null,
  complaints: JSON.parse(JSON.stringify(SEED_COMPLAINTS)),
  notifications: [],
  dayOffset: 0,
};

function addNotification(msg, type='info') {
  store.notifications.unshift({ id:'n'+Date.now(), message:msg, type, read:false, createdAt:new Date() });
}
