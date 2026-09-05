/* Second hero slide image loader + family photo cards */
(async function(){
  try{
    const res=await fetch('slide2.b64?v=20260904');
    if(!res.ok) throw new Error('slide image unavailable');
    const b64=(await res.text()).trim();
    const art=document.querySelector('.hero-art.art-two');
    if(art && b64) art.style.backgroundImage=`url("data:image/jpeg;base64,${b64}")`;
  }catch(e){ console.warn('Second slideshow image could not load',e); }
  try{
    const s=document.createElement('script');
    s.src='family-media.js?v=20260905';
    s.defer=true;
    document.head.appendChild(s);
  }catch(e){ console.warn('Family photo module could not load',e); }
})();
