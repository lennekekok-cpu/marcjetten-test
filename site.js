(()=>{
// De volledige inhoud en foto's staan al in de HTML; JavaScript voegt alleen bediening toe.
const sidebar=document.querySelector('.sidebar');
const menu=document.querySelector('.menu-toggle');
menu?.addEventListener('click',()=>{const open=sidebar.classList.toggle('menu-open');menu.setAttribute('aria-expanded',String(open));menu.textContent=open?'Sluiten':'Menu';});
document.querySelectorAll('.sidebar nav a').forEach(a=>a.addEventListener('click',()=>{sidebar.classList.remove('menu-open');menu.setAttribute('aria-expanded','false');menu.textContent='Menu';}));
const dialog=document.querySelector('#foto-viewer');
const image=dialog?.querySelector('img');
const caption=dialog?.querySelector('.caption');
let photos=[],current=0;
function showPhoto(){const a=photos[current];image.src=a.href;image.alt=a.querySelector('img').alt;caption.textContent=`${image.alt} · ${current+1} / ${photos.length}`;}
document.querySelectorAll('.gallery a').forEach(a=>a.addEventListener('click',event=>{if(event.ctrlKey||event.metaKey||event.shiftKey||event.altKey)return;if(!dialog||!image||!caption||typeof dialog.showModal!=='function')return;try{photos=[...(a.closest('section')||a.closest('.gallery')).querySelectorAll('.gallery a')];current=photos.indexOf(a);showPhoto();dialog.showModal();document.body.classList.add('viewer-open');event.preventDefault();}catch{if(dialog.open)dialog.close();document.body.classList.remove('viewer-open');}}));
dialog?.querySelector('.close').addEventListener('click',()=>dialog.close());
function step(delta){current=(current+delta+photos.length)%photos.length;showPhoto();}
dialog?.querySelector('.previous').addEventListener('click',()=>step(-1));
dialog?.querySelector('.next').addEventListener('click',()=>step(1));
dialog?.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'){e.preventDefault();step(-1);}if(e.key==='ArrowRight'){e.preventDefault();step(1);}});
dialog?.addEventListener('close',()=>{document.body.classList.remove('viewer-open');image.removeAttribute('src');});
dialog?.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});

})();
