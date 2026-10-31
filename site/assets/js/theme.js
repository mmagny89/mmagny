// Thème clair / sombre mémorisé, année du pied de page.
const root=document.documentElement;
const mode=()=>root.dataset.theme||(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');
document.querySelectorAll('[data-theme-toggle]').forEach(b=>b.addEventListener('click',()=>{
    const next=mode()==='dark'?'light':'dark';
    root.dataset.theme=next;
    try{localStorage.setItem('theme',next)}catch(e){}
}));
const y=document.getElementById('year');if(y)y.textContent=new Date().getFullYear();
