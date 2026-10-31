// Page projets : liste filtrable et panneau de détail.
/* ───── Page projets ───── */
let fTech='all',fDom='all',q='',cur=null;
const nb=k=>PROJECTS.filter(p=>p.tech===k).length;
$('#p-title').innerHTML=`${nbP} projets détaillés, sur plus de 100 livrés en 15 ans`;
$('#f-tech').innerHTML=[['all','Tous'],...Object.keys(TECH).map(k=>[k,`${TECH[k][0]} ${nb(k)}`])].map(([k,l])=>`<button type="button" data-t="${k}" aria-pressed="${k==='all'}">${l}</button>`).join('');
const doms=Object.keys(DOM).filter(k=>PROJECTS.some(p=>p.domain===k));
$('#f-dom').innerHTML=[['all','Tous domaines','compass'],...doms.map(k=>[k,DOM[k][0],DOM[k][1]])].map(([k,l,i])=>`<button type="button" data-d="${k}" aria-pressed="${k==='all'}">${svg(i)}${l}</button>`).join('');
$('#plist').innerHTML=PROJECTS.map(p=>`<button type="button" class="pitem" data-p="${p.id}"><span class="tile sm">${svg(TECH[p.tech][1])}</span><span><b>${p.title}</b><small>${p.role}</small></span></button>`).join('');
function select(id,scroll){
  cur=id;const p=byId(id),panel=$('#panel');panel.innerHTML=fiche(p);
  document.querySelectorAll('.pitem').forEach(b=>b.setAttribute('aria-current',b.dataset.p===id));
  placePanel();if(scroll)panel.scrollIntoView({block:'start',behavior:'smooth'});
}
function placePanel(){
  const panel=$('#panel'),mob=matchMedia('(max-width:960px)').matches;
  if(mob&&cur){document.querySelector(`.pitem[data-p="${cur}"]`).after(panel)}else $('#panel-col').append(panel);
}
addEventListener('resize',placePanel);
function apply(){
  let n=0;
  PROJECTS.forEach(p=>{
    const txt=(p.title+' '+p.context+' '+p.stack.join(' ')+' '+p.actions.map(a=>a.text).join(' ')).toLowerCase();
    const ok=(fTech==='all'||p.tech===fTech)&&(fDom==='all'||p.domain===fDom)&&(!q||txt.includes(q));
    document.querySelector(`.pitem[data-p="${p.id}"]`).hidden=!ok;if(ok)n++;
  });
  $('#count').textContent=`${n} projet${n>1?'s':''} affiché${n>1?'s':''} sur ${nbP}`;
  if(!n)$('#panel').innerHTML='<p class="empty">Aucun projet pour ce filtre</p>';
  else{const vis=PROJECTS.find(p=>!document.querySelector(`.pitem[data-p="${p.id}"]`).hidden);if(!cur||document.querySelector(`.pitem[data-p="${cur}"]`).hidden)select(vis.id)}
}
$('#plist').onclick=e=>{const b=e.target.closest('.pitem');if(b)select(b.dataset.p,matchMedia('(max-width:960px)').matches)};
$('#f-tech').onclick=e=>{const b=e.target.closest('button');if(!b)return;fTech=b.dataset.t;document.querySelectorAll('#f-tech button').forEach(x=>x.setAttribute('aria-pressed',x===b));apply()};
$('#f-dom').onclick=e=>{const b=e.target.closest('button');if(!b)return;fDom=b.dataset.d;document.querySelectorAll('#f-dom button').forEach(x=>x.setAttribute('aria-pressed',x===b));apply()};
$('#q').oninput=e=>{q=e.target.value.trim().toLowerCase();apply()};


/* lien direct : projets.html#polytechnique */
function fromHash(){const id=decodeURIComponent(location.hash.slice(1));if(id&&byId(id)){fTech='all';fDom='all';q='';apply();select(id,matchMedia('(max-width:960px)').matches)}}
addEventListener('hashchange',fromHash);
apply();fromHash();
