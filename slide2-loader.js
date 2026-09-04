/* Second hero slide image loader */
(async function(){
  try{
    const res=await fetch('slide2.b64?v=20260904');
    if(!res.ok) throw new Error('slide image unavailable');
    const b64=(await res.text()).trim();
    const art=document.querySelector('.hero-art.art-two');
    if(art && b64) art.style.backgroundImage=`url("data:image/jpeg;base64,${b64}")`;
  }catch(e){ console.warn('Second slideshow image could not load',e); }
})();
