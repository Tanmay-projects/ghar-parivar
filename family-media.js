/* GHAR PARIVAR — real family group-photo cards */
(function(){
  const API='https://ghar-parivar-backend.onrender.com';
  const fallback={dawar:'',dindod:''};
  const families=[
    {id:'dawar',name:'डावर परिवार',description:'डावर परिवार की पीढ़ियां और रिश्ते।',slot:'family_dawar'},
    {id:'dindod',name:'डिंडोर परिवार',description:'डिंडोर परिवार की पीढ़ियां और रिश्ते।',slot:'family_dindod'}
  ];
  function esc(v){return String(v??'').replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));}
  function render(media){
    const box=document.getElementById('family-grid'); if(!box)return;
    const bySlot={}; (media||[]).forEach(m=>{if(m.slot)bySlot[m.slot]=m.image_data});
    box.innerHTML=families.map(f=>{
      const img=bySlot[f.slot]||fallback[f.id];
      return `<article class="family-card real-family-card" data-family-id="${f.id}">
        <div class="family-photo">${img?`<img src="${esc(img)}" alt="${esc(f.name)} group photo">`:`<div class="family-photo-empty"><span>📷</span><b>परिवार की फोटो</b><small>Admin द्वारा photo upload होने पर यहाँ दिखाई देगी</small></div>`}</div>
        <div class="family-content"><div class="section-label">FAMILY • परिवार</div><h2>${esc(f.name)}</h2><p>${esc(f.description)}</p><button class="btn primary family-open" data-family-id="${f.id}">परिवार वृक्ष देखें →</button></div>
      </article>`;
    }).join('');
    box.querySelectorAll('.family-open').forEach(btn=>btn.addEventListener('click',()=>window.openFamily&&window.openFamily(btn.dataset.familyId)));
  }
  async function load(){
    try{const r=await fetch(API+'/media'); const data=r.ok?await r.json():[]; render(data);}
    catch(e){render([]);}
  }
  function addAdminPhotoSlots(){
    const select=document.getElementById('photo-slot'); if(!select)return;
    [['family_dawar','Dawar Family • परिवार फोटो'],['family_dindod','Dindod Family • परिवार फोटो']].forEach(([v,t])=>{
      if(![...select.options].some(o=>o.value===v)){const o=document.createElement('option');o.value=v;o.textContent=t;select.appendChild(o);}
    });
  }
  const observer=new MutationObserver(()=>addAdminPhotoSlots());
  observer.observe(document.body,{childList:true,subtree:true});
  document.addEventListener('click',e=>{if(e.target.closest('[data-admin-tab="photos"]'))setTimeout(addAdminPhotoSlots,50);});
  window.addEventListener('load',()=>{load();addAdminPhotoSlots();});
  setTimeout(load,250);
})();
