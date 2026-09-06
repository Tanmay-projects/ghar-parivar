/* Launch data fallback: keep Dindod visible until it is created/edited from Admin. */
(()=>{
const box=()=>document.getElementById('family-grid');
function ensure(){const b=box();if(!b||b.querySelector('[data-open-family="dindod"]'))return;if(b.querySelector('.dynamic-family-card')&&b.innerHTML.includes('डिंडोर'))return;const card=document.createElement('article');card.className='family-card dynamic-family-card';card.innerHTML=`<div class="family-visual" style="background-color:#eef2f5"><span style="font-size:58px">👨‍👩‍👧‍👦</span></div><div class="family-content"><div class="section-label">FAMILY • परिवार</div><h2>डिंडोर परिवार</h2><p>डिंडोर परिवार की पीढ़ियां और रिश्ते।</p><button class="btn primary" data-open-family="dindod">परिवार वृक्ष देखें →</button></div>`;card.querySelector('button').onclick=()=>window.openFamily&&window.openFamily('dindod');b.appendChild(card)}
setTimeout(ensure,1200);setInterval(ensure,2500);
})();