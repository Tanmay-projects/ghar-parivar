/* Slide 2 image loader + public family data loader */
(function(){
  const art=document.querySelector('.hero-art.art-two');
  if(art) art.style.backgroundImage='url("slide2.jpg?v=20260912")';
  if(!document.querySelector('script[data-koriya-family]')){
    const s=document.createElement('script');
    s.src='koriya-family.js?v=20260912';
    s.dataset.koriyaFamily='1';
    document.body.appendChild(s);
  }
})();