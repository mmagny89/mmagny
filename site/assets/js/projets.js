// Page projets : grille filtrable, le détail s'ouvre dans la fenêtre (avec précédent / suivant).
let fTech='all',fDom='all',q='';
const nb=k=>PROJECTS.filter(p=>p.tech===k).length;
$('#p-title').innerHTML=`${nbP} projets détaillés, sur plus de 100 livrés en 15\u00a0ans`;
$('#f-tech').innerHTML=[['all','Tous'],...Object.keys(TECH).map(k=>[k,`${TECH[k][0]} ${nb(k)}`])].map(([k,l])=>`<button type="button" data-t="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
const doms=Object.keys(DOM).filter(k=>PROJECTS.some(p=>p.domain===k));
$('#f-dom').innerHTML=[['all','Tous domaines','compass'],...doms.map(k=>[k,DOM[k][0],DOM[k][1]])].map(([k,l,i])=>`<button type="button" data-d="${k}" aria-pressed="${k==='all'}">${svg(i)}${l}</button>`).join('');
$('#pgrid').innerHTML=PROJECTS.map(p=>{const d=DOM[p.domain]||[];return `<article class="card link" data-id="${p.id}">
 <div class="top"><span class="tile">${svg(TECH[p.tech][1])}</span><div><h3>${p.title}</h3><span class="label">${TECH[p.tech][0]}</span></div></div>
 <p><b style="color:var(--fg);font-weight:600">${p.role}</b></p><p>${tx(p.highlight)}</p>
 <div class="stackrow">${d[0]?`<span class="chip php">${svg(d[1])}${d[0]}</span>`:''}${p.stack.slice(0,3).map(s=>`<span class="chip">${s}</span>`).join('')}</div>
 <button type="button" class="more" data-open="${p.id}">Voir le détail ${svg('arrow')}</button></article>`}).join('');
function apply(){
  let n=0;
  PROJECTS.forEach(p=>{
    const txt=(p.title+' '+p.context+' '+p.stack.join(' ')+' '+p.actions.map(a=>a.text).join(' ')).toLowerCase();
    const ok=(fTech==='all'||p.tech===fTech)&&(fDom==='all'||p.domain===fDom)&&(!q||txt.includes(q));
    document.querySelector(`.card[data-id="${p.id}"]`).hidden=!ok;if(ok)n++;
  });
  $('#count').textContent=`${n} projet${n>1?'s':''} affiché${n>1?'s':''} sur ${nbP}`;
  $('#pempty').hidden=n>0;
}
$('#f-tech').onclick=e=>{const b=e.target.closest('button');if(!b)return;fTech=b.dataset.t;document.querySelectorAll('#f-tech button').forEach(x=>x.setAttribute('aria-pressed',x===b));apply()};
$('#f-dom').onclick=e=>{const b=e.target.closest('button');if(!b)return;fDom=b.dataset.d;document.querySelectorAll('#f-dom button').forEach(x=>x.setAttribute('aria-pressed',x===b));apply()};
$('#q').oninput=e=>{q=e.target.value.trim().toLowerCase();apply()};
/* lien direct : projets.html#polytechnique ouvre la fiche */
function fromHash(){const id=decodeURIComponent(location.hash.slice(1));if(id&&byId(id)&&!$('#modal').open){fTech='all';fDom='all';q='';apply();showProject(id)}}
addEventListener('hashchange',fromHash);
apply();fromHash();
