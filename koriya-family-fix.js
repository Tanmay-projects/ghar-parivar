/* GHAR PARIVAR — Koriya family reliable public renderer */
(function(){
  const DATA={
    root:['Umrav','Rukma'],
    branches:[
      {p:['Mewalal','Sunita'], children:[{p:['Manoj','Sapna'],children:['Priya (Purnima)','Babli (Anushka)','Gunjan']},{p:['Ravi','Lakshmi'],children:['Sagun','Rishika']}]},
      {p:['Badrilal','Dropati'], children:[{p:['Anand','Mamta'],children:['Daksh','Anshu (Rajveer)']},{p:['Bhagat','Komal'],children:['Paridhi','Veshu']},{p:['Govind','Aarti'],children:['Riya (Rashi)','Naksh']}]},
      {p:['Bhavsingh','Kanta'], children:[{p:['Narendra','Radha'],children:['Vansh','Gaurav']}]},
      {p:['Sevaram','Sita'],children:[]},
      {p:['Ramprashad','Dropati'],children:[]}
    ]
  };
  const person=n=>`<div class="k-person"><div class="k-avatar">👤</div><strong>${n}</strong></div>`;
  const couple=(a,b)=>`<div class="k-couple">${person(a)}<span>♥</span>${person(b)}</div>`;
  function tree(){return `<div class="k-tree"><div class="k-root">${couple(...DATA.root)}</div><div class="k-line"></div>${DATA.branches.map(b=>`<section class="k-branch"><div class="k-elder">${couple(...b.p)}</div>${b.children.length?`<div class="k-line"></div><div class="k-children">${b.children.map(c=>`<div class="k-subbranch">${couple(...c.p)}${c.children.length?`<div class="k-line"></div><div class="k-grandchildren">${c.children.map(person).join('')}</div>`:''}</div>`).join('')}</div>`:''}</section>`).join('')}</div>`}
  function render(){
    const grid=document.getElementById('family-grid');
    if(!grid)return;
    if(!document.getElementById('koriya-family-card')) grid.insertAdjacentHTML('beforeend',`<article id="koriya-family-card" class="family-card koriya-family-card"><div class="family-visual">👨‍👩‍👧‍👦</div><div class="family-content"><div class="section-label">FAMILY • परिवार</div><h2>कोरिया परिवार</h2><p>उमराव और रुकमा से आगे बढ़ती कोरिया परिवार की पीढ़ियाँ।</p><button type="button" id="koriya-open-btn">परिवार वृक्ष देखें →</button></div></article>`);
    const btn=document.getElementById('koriya-open-btn');
    if(btn&&!btn.dataset.bound){btn.dataset.bound='1';btn.addEventListener('click',open);}
  }
  function open(){const d=document.getElementById('family-detail');if(!d)return;d.innerHTML=`<div class="detail-panel koriya-detail"><button class="btn ghost" type="button" id="koriya-back">← परिवार सूची</button><div class="section-label">KORIYA FAMILY • कोरिया परिवार</div><h2>👨‍👩‍👧‍👦 कोरिया परिवार</h2><p>उमराव और रुकमा से आगे बढ़ती कोरिया परिवार की पीढ़ियाँ।</p>${tree()}<div class="tree-private-note">🔒 मोबाइल, ईमेल, पता और अन्य निजी जानकारी केवल अधिकृत लॉगिन के बाद उपलब्ध होगी।</div></div>`;document.getElementById('koriya-back').onclick=()=>{d.innerHTML='';render();};d.scrollIntoView({behavior:'smooth',block:'start'});}
  const style=document.createElement('style');style.textContent=`.koriya-family-card{display:block}.k-tree{padding:20px 0}.k-root,.k-elder{text-align:center}.k-couple{display:inline-flex;align-items:center;justify-content:center;gap:10px;padding:10px 14px;border:1px solid #d9e2ec;border-radius:14px;background:#fff;box-shadow:0 5px 15px rgba(16,42,67,.06);flex-wrap:wrap}.k-person{display:flex;align-items:center;gap:7px}.k-avatar{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;background:#eef3f7}.k-line{height:24px;width:2px;background:#b7c5d2;margin:0 auto}.k-branch{border:1px solid #d9e2ec;border-radius:18px;padding:18px;background:#fbfcfd;margin:20px 0}.k-children{display:flex;gap:18px;justify-content:center;flex-wrap:wrap}.k-subbranch{flex:1 1 240px;text-align:center}.k-grandchildren{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}.k-grandchildren .k-person{padding:8px;border:1px solid #e1e7ed;border-radius:12px;background:#fff}.k-grandchildren .k-avatar{width:30px;height:30px;font-size:16px}@media(max-width:700px){.k-children{display:grid;grid-template-columns:1fr}.k-couple{max-width:100%;font-size:14px}}`;document.head.appendChild(style);
  let tries=0;function boot(){render();if(++tries<20)setTimeout(boot,500);}boot();
  new MutationObserver(()=>render()).observe(document.body,{childList:true,subtree:true});
})();