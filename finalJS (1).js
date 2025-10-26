function dbg(tag, msg) {
  console.log(`[Ports:${tag}]`, msg);
}

window.onload = () => {
  window.scrollTo(0, 0);
  dbg('load', 'page loaded');
};

const overlay = document.getElementById('overlay');
const loginBtn = document.getElementById('loginBtn');
const userInput = document.getElementById('username');
const passInput = document.getElementById('password');
const errorMsg = document.getElementById('errorMsg');
const aboutToggle = document.getElementById('aboutToggle');
const aboutSidebar = document.getElementById('aboutSidebar');
const closeAbout = document.getElementById('closeAbout');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const mainContent = document.getElementById('mainContent') || document.querySelector('main');

if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    const user = (userInput?.value || '').trim().toLowerCase();
    const pass = (passInput?.value || '').trim().toLowerCase();
    dbg('login', { user, pass });

    if (user === 'joji' && pass === 'smithereens') {
      if (overlay) {
        overlay.classList.add('unlocking');
        document.body.classList.add('unlocked');
        setTimeout(() => {
          overlay.style.display = 'none';
          overlay.setAttribute('aria-hidden', 'true');
          if (mainContent) mainContent.removeAttribute('aria-hidden');
          if (aboutToggle) {
            aboutToggle.classList.remove('hidden');
            aboutToggle.setAttribute('aria-hidden', 'false');
          }
          dbg('login', 'unlocked');
        }, 620);
      }
    } else {
      if (errorMsg) errorMsg.textContent = 'Access denied. try "joji" / "smithereens"';
      dbg('login', 'failed');
    }
  });
}

[userInput, passInput].forEach(inp => {
  if (inp) inp.addEventListener('keydown', e => {
    if (e.key === 'Enter') loginBtn?.click();
  });
});

if (aboutToggle && aboutSidebar) {
  aboutToggle.addEventListener('click', () => {
    aboutSidebar.classList.add('active');
    aboutSidebar.setAttribute('aria-hidden', 'false');
    aboutToggle.setAttribute('aria-expanded', 'true');
  });
}

if (closeAbout && aboutSidebar && aboutToggle) {
  closeAbout.addEventListener('click', () => {
    aboutSidebar.classList.remove('active');
    aboutSidebar.setAttribute('aria-hidden', 'true');
    aboutToggle.setAttribute('aria-expanded', 'false');
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && aboutSidebar) {
    aboutSidebar.classList.remove('active');
    aboutSidebar.setAttribute('aria-hidden', 'true');
    if (aboutToggle) aboutToggle.setAttribute('aria-expanded', 'false');
  }
});

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    tabButtons.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => {
      c.classList.remove('active');
      c.setAttribute('hidden', 'true');
    });
    btn.classList.add('active');
    const content = document.getElementById(target);
    if (content) {
      content.classList.add('active');
      content.removeAttribute('hidden');
    }
  });
});

document.querySelectorAll('details.track').forEach(d => {
  d.addEventListener('toggle', () => {
    if (d.open) {
      document.querySelectorAll('details.track').forEach(other => {
        if (other !== d) other.removeAttribute('open');
      });
    }
  });
});

const listenBtn = document.querySelector('.listen-btn');
if (listenBtn) {
  listenBtn.addEventListener('click', e => {
    e.preventDefault();
    const trackBtn = document.querySelector('[data-tab="tracks"]') || document.querySelector('[data-tab="tracklist"]');
    if (trackBtn) trackBtn.click();
    const target = document.getElementById('tabsSection') || document.getElementById('contentTabs');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

dbg('init', {
  overlayExists: !!overlay,
  loginBtnExists: !!loginBtn,
  aboutToggleExists: !!aboutToggle,
  aboutSidebarExists: !!aboutSidebar,
  tabButtonsCount: tabButtons.length
});