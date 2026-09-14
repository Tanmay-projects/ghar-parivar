/* Hero slide image loader + public family data loader */
(function(){
  const slide2=document.querySelector('.hero-art.art-two');
  if(slide2) slide2.style.backgroundImage='url("slide2.jpg?v=20260912")';

  const slide3=document.querySelector('.hero-art.art-three');
  if(slide3) slide3.style.backgroundImage='url("IMG_8123.JPG?v=20260914")';

  if(!document.querySelector('script[data-koriya-family]')){
    const s=document.createElement('script');
    s.src='koriya-family.js?v=20260912';
    s.dataset.koriyaFamily='1';
    document.body.appendChild(s);
  }
})();