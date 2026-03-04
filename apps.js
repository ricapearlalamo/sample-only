// Sidebar open/close (mobile)
function toggleSidebar(){
  document.getElementById('sidebar').classList.toggle('open');
}

// Page navigation
const pageMeta = {
  dashboard: {title:"Dashboard", hint:"Overview of activity (prototype)"},
  workspaces:{title:"Workspaces", hint:"Navigation layout (mock only)"},
  users:{title:"Users", hint:"Users list UI (mock only)"},
  employees:{title:"Employees", hint:"Employees module UI (mock only)"},
  reports:{title:"Reports", hint:"Reports UI (mock only)"},
  settings:{title:"Settings", hint:"Settings and preferences (mock only)"}
};

function go(page){
  // active nav item
  document.querySelectorAll('#nav a').forEach(a=>{
    a.classList.toggle('active', a.dataset.page === page);
  });

  // show correct page
  document.querySelectorAll('.page').forEach(p=>p.style.display='none');
  document.getElementById('page-' + page).style.display = 'grid';

  // update header
  document.getElementById('pageTitle').textContent = pageMeta[page].title;
  document.getElementById('pageHint').textContent = pageMeta[page].hint;

  // close sidebar on mobile after click
  document.getElementById('sidebar').classList.remove('open');
}

// Filter sidebar menu
function filterMenu(q){
  q = (q || "").toLowerCase();
  document.querySelectorAll('#nav a').forEach(a=>{
    const text = a.innerText.toLowerCase();
    a.style.display = text.includes(q) ? 'flex' : 'none';
  });
  // keep section headers visible
  document.querySelectorAll('#nav .section').forEach(s=>s.style.display = 'block');
}

// Theme toggle
function toggleTheme(){
  const body = document.body;
  const isDark = body.getAttribute('data-theme') === 'dark';
  body.setAttribute('data-theme', isDark ? 'light' : 'dark');
  document.getElementById('themeIcon').textContent = isDark ? '🌙' : '☀️';
  showToast('Theme switched', isDark ? 'Light mode enabled' : 'Dark mode enabled');
}

// Modal controls
function openModal(){
  document.getElementById('overlay').classList.add('show');
  document.getElementById('title').focus();
}
function closeModal(){
  document.getElementById('overlay').classList.remove('show');
}
function mockCreate(){
  const type = document.getElementById('type').value;
  const title = document.getElementById('title').value || 'Untitled';
  const prio = document.getElementById('priority').value;
  closeModal();
  showToast('Created (Mock)', `${type}: "${title}" • Priority: ${prio}`);
  document.getElementById('title').value = '';
  document.getElementById('priority').value = 'Normal';
  document.getElementById('type').value = 'Employee';
}

// Toast
let toastTimer;
function showToast(title,msg){
  const t = document.getElementById('toast');
  document.getElementById('toastTitle').textContent = title;
  document.getElementById('toastMsg').textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove('show'), 2800);
}

// keyboard shortcuts
document.addEventListener('keydown', (e)=>{
  if((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k'){
    e.preventDefault();
    const input = document.querySelector('.side-search input');
    if(input){
      input.focus();
      document.getElementById('sidebar').classList.add('open');
    }
  }
  if(e.key === 'Escape'){
    closeModal();
    document.getElementById('sidebar').classList.remove('open');
  }
});