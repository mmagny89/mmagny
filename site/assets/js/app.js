// Thème (dark/light) persistant
// Thème (dark/light) persistant
const toggle = document.getElementById('themeToggle');
const iconSun = document.getElementById('iconSun');
const iconMoon = document.getElementById('iconMoon');
const root = document.documentElement;

function applyTheme(mode) {
    if (mode === 'dark') {
        root.classList.add('dark');
        if (iconSun) iconSun.classList.remove('hidden');
        if (iconMoon) iconMoon.classList.add('hidden');
    } else {
        root.classList.remove('dark');
        if (iconSun) iconSun.classList.add('hidden');
        if (iconMoon) iconMoon.classList.remove('hidden');
    }
}

const saved = localStorage.getItem('theme');
applyTheme(saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

if (toggle) {
    toggle.addEventListener('click', () => {
        const next = root.classList.contains('dark') ? 'light' : 'dark';
        localStorage.setItem('theme', next);
        applyTheme(next);
    });
}

// Scroll‑reveal
const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
        }
    });
}, {threshold: 0.15});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Année footer
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}