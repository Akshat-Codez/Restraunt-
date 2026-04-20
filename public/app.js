// CURSOR
const dot=document.getElementById('cursorDot'),ring=document.getElementById('cursorRing');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{mx=e.clientX;my=e.clientY;dot.style.left=mx+'px';dot.style.top=my+'px'});
(function animRing(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animRing)})();
document.querySelectorAll('a,button,input,select,textarea').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ring.style.transform='translate(-50%,-50%) scale(1.6)';ring.style.borderColor='rgba(201,168,76,.8)'});
  el.addEventListener('mouseleave',()=>{ring.style.transform='translate(-50%,-50%) scale(1)';ring.style.borderColor='rgba(201,168,76,.5)'});
});

// NAV SCROLL
window.addEventListener('scroll',()=>{document.getElementById('navbar').classList.toggle('scrolled',scrollY>60);revealEls()});

// MENU TABS
function switchTab(tab,btn){
  document.querySelectorAll('.menu-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.menu-tab').forEach(t=>t.classList.remove('active'));
  document.getElementById('tab-'+tab).classList.add('active');
  btn.classList.add('active');
  setTimeout(revealEls,100);
}

// STAR RATING
let rating=0;
function setRating(n){rating=n;document.querySelectorAll('.star-btn').forEach((b,i)=>b.classList.toggle('active',i<n))}

// SUBMIT REVIEW
function submitReview(){
  const name=document.getElementById('rev-name').value.trim();
  const text=document.getElementById('rev-text').value.trim();
  if(!name||!text||!rating){showToast('Please fill all fields and select a rating.');return}
  const stars='★'.repeat(rating)+'☆'.repeat(5-rating);
  const card=document.createElement('div');card.className='review-card';
  card.style.cssText='opacity:0;transform:translateY(20px);transition:all .6s';
  card.innerHTML=`<div class="review-stars">${stars}</div><div class="review-text">${text}</div><div class="review-author"><div class="review-avatar">${name[0].toUpperCase()}</div><div><div class="review-name">${name}</div><div class="review-date">Just now</div><div class="review-source">Verified Guest</div></div></div>`;
  document.getElementById('reviews-container').prepend(card);
  setTimeout(()=>{card.style.opacity='1';card.style.transform='translateY(0)'},50);
  document.getElementById('rev-name').value='';document.getElementById('rev-text').value='';
  rating=0;document.querySelectorAll('.star-btn').forEach(b=>b.classList.remove('active'));
  showToast('Thank you for your review!');
}

// RESERVATION
function makeReservation(){
  const date=document.getElementById('res-date').value;
  const name=document.getElementById('res-name').value.trim();
  if(!date||!name){showToast('Please enter your name and select a date.');return}
  const time=document.getElementById('res-time').value;
  const guests=document.getElementById('res-guests').value;
  showToast(`Reserved for ${guests} on ${new Date(date+' 12:00').toDateString()} at ${time}`);
}

// CONTACT
function sendMessage(){
  const name=document.getElementById('con-name').value.trim();
  const email=document.getElementById('con-email').value.trim();
  const msg=document.getElementById('con-msg').value.trim();
  if(!name||!email||!msg){showToast('Please fill in all required fields.');return}
  showToast('Message sent! We will respond within 24 hours.');
  ['con-name','con-email','con-phone','con-msg'].forEach(id=>document.getElementById(id).value='');
}

// TOAST
let toastTimer;
function showToast(msg){
  clearTimeout(toastTimer);
  const t=document.getElementById('toast');t.textContent=msg;t.classList.add('show');
  toastTimer=setTimeout(()=>t.classList.remove('show'),3500);
}

// SCROLL REVEAL
function revealEls(){document.querySelectorAll('.reveal:not(.revealed)').forEach(el=>{if(el.getBoundingClientRect().top<innerHeight-60)el.classList.add('revealed')})}

// INIT
document.getElementById('res-date').min=new Date().toISOString().split('T')[0];
setTimeout(revealEls,300);
