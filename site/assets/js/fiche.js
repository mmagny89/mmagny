// Fiche détaillée d'un projet : même rendu dans la fenêtre de l'accueil et le panneau de projets.html.
const byId=id=>PROJECTS.find(p=>p.id===id);
const nbP=PROJECTS.length;
/* ───── Fiche projet (panneau + fenêtre) ───── */
function fiche(p){
  const d=DOM[p.domain]||[],fm=(p.format||[]).map(f=>FMT[f]).filter(Boolean);
  return `<header><div class="tags"><span class="chip php">${svg(TECH[p.tech][1])}${TECH[p.tech][0]}</span>${d[0]?`<span class="chip">${svg(d[1])}${d[0]}</span>`:''}${fm.map(f=>`<span class="chip">${f}</span>`).join('')}</div>
   <h2 style="font-size:clamp(1.5rem,3vw,2rem)">${p.title}</h2>${p.subtitle?`<p class="note">${p.subtitle.replace(/ • /g,' / ')}</p>`:''}</header>
  <div class="sec"><span class="label">${svg('map')}Contexte</span><p class="body">${t(p.context)}</p></div>
  <div class="sec"><span class="label">${svg('users')}Mon rôle</span><p><b>${p.role}</b></p>${p.contribution?`<p class="body">${t(p.contribution)}</p>`:''}</div>
  <div class="sec"><span class="label">${svg('gears')}Actions et livrables</span><ul class="act">${p.actions.map(a=>`<li><span class="tile sm">${fa(a.icon)}</span><span>${t(a.text)}</span></li>`).join('')}</ul></div>
  <div class="sec"><span class="label">${svg('terminal')}Stack et outils</span><div class="tags">${p.stack.map(s=>`<span class="chip">${s}</span>`).join('')}</div></div>
  <div class="sec"><span class="label">${svg('rocket')}Résultat</span><p class="result">${t(p.highlight)}</p></div>`;
}
const modal=$('#modal');
if(modal){
  $('#mx').onclick=()=>modal.close();
  modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});
  document.addEventListener('click',e=>{const b=e.target.closest('[data-open]');if(b){$('#mpanel').innerHTML=fiche(byId(b.dataset.open));modal.showModal()}});
}

