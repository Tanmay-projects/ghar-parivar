/* GHAR PARIVAR — family data */
const API_BASE="https://ghar-parivar-backend.onrender.com";
const $=id=>document.getElementById(id);
const state={slide:0,user:null,privateData:null};
const families=[{id:"dawar",name:"डावर परिवार",description:"डावर परिवार की पीढ़ियां और रिश्ते।",icon:"👨‍👩‍👧‍👦",members:[
 {name:"शंकरलाल डावर",designation:"दादा",role:"grandparent",icon:"👴"},
 {name:"कंचन बाई",designation:"दादी",role:"grandparent",icon:"👵"},
 {name:"मुकेश डावर",designation:"पिता",occupation:"Ex-service man (Army)",role:"parent",icon:"👨"},
 {name:"माया",designation:"माता",occupation:"Inspector (Agriculture Department)",role:"parent",icon:"👩"},
 {name:"तनमय डावर",designation:"पुत्र • विद्यार्थी",occupation:"Student",role:"child",icon:"👦"},
 {name:"हर्षिता डावर",designation:"पुत्री • विद्यार्थी",occupation:"Student",role:"child",icon:"👧"}
]}];
function showPage(id){document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));const page=$(id);if(!page)return;page.classList.add("active");if(location.hash!=="#"+id)history.pushState({page:id},"","#"+id);window.scrollTo({top:0,behavior:"smooth"});if(id==="dashboard")loadPrivate()}
window.showPage=showPage;
function navigate(e){const el=e.target.closest("[data-page]");if(!el)return;e.preventDefault();showPage(el.dataset.page)}
document.addEventListener("click",navigate);
window.addEventListener("popstate",()=>showPage((location.hash||"#home").slice(1)));
window.addEventListener("load",()=>showPage((location.hash||"#home").slice(1)));
$("menu-btn")?.addEventListener("click",()=>$("mobile-nav")?.classList.toggle("open"));
const slides=[...document.querySelectorAll(".hero-slide")],dots=[...document.querySelectorAll(".dot")];
function setSlide(n){if(!slides.length)return;state.slide=(n+slides.length)%slides.length;slides.forEach((s,i)=>s.classList.toggle("active",i===state.slide));dots.forEach((d,i)=>d.classList.toggle("active",i===state.slide))}
document.querySelector(".slide-arrow.prev")?.addEventListener("click",()=>setSlide(state.slide-1));
document.querySelector(".slide-arrow.next")?.addEventListener("click",()=>setSlide(state.slide+1));
dots.forEach((d,i)=>d.addEventListener("click",()=>setSlide(i)));
setInterval(()=>setSlide(state.slide+1),7000);
function renderFamilies(){const box=$("family-grid");if(!box)return;box.innerHTML=families.map(f=>`<article class="family-card"><div class="family-visual">${f.icon}</div><div class="family-content"><div class="section-label">FAMILY • परिवार</div><h2>${f.name}</h2><p>${f.description}</p><button onclick="openFamily('${f.id}')">परिवार वृक्ष देखें →</button></div></article>`).join("")}
function node(m){return `<div class="tree-node ${m.role}"><div class="tree-avatar">${m.icon}</div><div class="tree-name">${m.name}</div><div class="tree-designation">${m.designation}</div>${m.occupation?`<div class="tree-occupation">${m.occupation}</div>`:""}</div>`}
window.openFamily=id=>{const f=families.find(x=>x.id===id);if(!f)return;const g=f.members.filter(m=>m.role==="grandparent"),p=f.members.filter(m=>m.role==="parent"),c=f.members.filter(m=>m.role==="child");$("family-detail").innerHTML=`<div class="detail-panel"><div class="section-label">FAMILY TREE • परिवार वृक्ष</div><h2>${f.icon} ${f.name}</h2><p>${f.description}</p><div class="family-tree"><div class="tree-level">${g.map(node).join("")}</div><div class="tree-connector"></div><div class="tree-level">${p.map(node).join("")}</div><div class="tree-connector"></div><div class="tree-level">${c.map(node).join("")}</div></div><div class="tree-private-note">🔒 निजी फोन, ईमेल, पता और अन्य जानकारी केवल अधिकृत लॉगिन के बाद उपलब्ध होगी।</div><button class="btn primary" data-page="login">🔐 निजी जानकारी के लिए लॉगिन</button></div>`;$("family-detail").scrollIntoView({behavior:"smooth"})};
renderFamilies();
$("search-input")?.addEventListener("input",e=>{const q=e.target.value.toLowerCase().trim(),box=$("search-results");if(!q){box.innerHTML="";return}const r=families.flatMap(f=>f.members.map(m=>({...m,family:f.name}))).filter(m=>(m.name+m.designation+m.family).toLowerCase().includes(q));box.innerHTML=r.length?r.map(m=>`<div class="search-result"><b>${m.icon} ${m.name}</b><span>${m.designation} • ${m.family}</span></div>`).join(""):"<p>कोई सदस्य नहीं मिला।</p>"});
async function api(path,options={}){const res=await fetch(API_BASE+path,{credentials:"include",headers:{"Content-Type":"application/json",...(options.headers||{})},...options});let data={};try{data=await res.json()}catch{}if(!res.ok)throw new Error(data.detail||data.message||`Request failed (${res.status})`);return data}
async function checkSession(){try{state.user=await api("/me")}catch{state.user=null}}checkSession();
$("login-form")?.addEventListener("submit",async e=>{e.preventDefault();const msg=$("login-message");msg.textContent="लॉगिन हो रहा है…";try{await api("/login",{method:"POST",body:JSON.stringify({username:$("username").value.trim(),password:$("password").value})});state.user=await api("/me");e.target.reset();msg.textContent="";showPage("dashboard")}catch(err){msg.textContent=err.message}});
function renderPrivateProfile(m){const box=$("private-detail");if(!box)return;const fields=[['📱 मोबाइल',m.phone],['✉️ ईमेल',m.email],['🎂 जन्मदिन',m.birthday],['🏠 पता',m.address],['🎓 शिक्षा',m.education],['💼 पेशा',m.profession],['📝 परिचय',m.biography],['🏆 उपलब्धियां',m.achievements],['💭 यादें',m.memories]];box.innerHTML=`<article class="detail-panel private-profile-card"><button class="btn ghost" type="button" onclick="document.getElementById('private-detail').innerHTML=''">← प्रोफाइल बंद करें</button><div class="profile-heading"><div class="tree-avatar">${m.avatar||'👤'}</div><div><div class="section-label">PRIVATE PROFILE • निजी प्रोफाइल</div><h2>${m.name}</h2><p>${m.designation||'परिवार सदस्य'}${m.relation?' • '+m.relation:''}</p></div></div><div class="profile-fields">${fields.filter(x=>x[1]).map(x=>`<div class="profile-field"><b>${x[0]}</b><span>${x[1]}</span></div>`).join("")||'<p>इस सदस्य के लिए अभी निजी विवरण उपलब्ध नहीं है।</p>'}</div></article>`;box.scrollIntoView({behavior:"smooth",block:"start"})}
window.renderPrivateProfile=renderPrivateProfile;
async function loadPrivate(){const box=$("private-grid");if(!box)return;try{if(!state.user)throw new Error("Not logged in");$("welcome-user").textContent=`स्वागत है, ${state.user.username}`;state.privateData=await api("/family/private");const members=state.privateData.members||[];box.innerHTML=members.map((m,i)=>`<article class="private-card private-card-clickable" role="button" tabindex="0" data-member-index="${i}" onclick="renderPrivateProfile(state.privateData.members[${i}])" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();renderPrivateProfile(state.privateData.members[${i}])}"><div class="private-avatar">${m.avatar||'👤'}</div><h3>${m.name}</h3><p class="private-designation">${m.designation||"परिवार सदस्य"}</p><span>प्रोफाइल देखें →</span></article>`).join("")||"<p>अभी निजी सदस्य जानकारी उपलब्ध नहीं है।</p>"}catch(err){box.innerHTML=`<p>${err.message}</p>`}}
$("logout")?.addEventListener("click",async()=>{try{await api("/logout",{method:"POST"})}catch{}state.user=null;showPage("home")});
const initial=(location.hash||"#home").slice(1);if($(initial))showPage(initial);