const API_BASE="https://ghar-parivar-backend.onrender.com";
const state={lang:"hi",slides:0,user:null,privateData:null};
const publicFamilies=[
 {id:"family1",hi:"शर्मा परिवार",en:"Sharma Family",descHi:"एक स्नेही और एकजुट परिवार।",descEn:"A loving and close-knit family.",icon:"👨‍👩‍👧‍👦",members:["श्री राजेंद्र शर्मा","श्रीमती सुनीता शर्मा","श्री अमित शर्मा","श्रीमती नेहा शर्मा","आरव शर्मा","अनाया शर्मा"]},
 {id:"family2",hi:"वर्मा परिवार",en:"Verma Family",descHi:"परंपराओं और आधुनिक सोच का सुंदर मेल।",descEn:"A beautiful blend of tradition and modern thinking.",icon:"👨‍👩‍👦",members:["मोहन वर्मा","पूजा वर्मा","राहुल वर्मा"]},
 {id:"family3",hi:"गुप्ता परिवार",en:"Gupta Family",descHi:"शिक्षा, संस्कृति और सेवा को महत्व देने वाला परिवार।",descEn:"A family that values education, culture and service.",icon:"👪",members:["रोहित गुप्ता","रिया गुप्ता","नेहा गुप्ता"]}
];
const publicMembers=publicFamilies.flatMap(f=>f.members.map(name=>({name,family:f.hi,designation:"परिवार सदस्य"})));
const $=id=>document.getElementById(id);
function toast(msg){const t=$("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2600)}
function showPage(id){document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));$(id)?.classList.add("active");document.querySelector("#mobile-nav")?.classList.remove("open");window.scrollTo({top:0,behavior:"smooth"});if(id==="dashboard")loadPrivate();if(id==="admin")loadAdmin()}
window.showPage=showPage;
document.addEventListener("click",e=>{const el=e.target.closest("[data-page]");if(el){e.preventDefault();showPage(el.dataset.page)}});
$("menu-btn")?.addEventListener("click",()=>$("mobile-nav").classList.toggle("open"));

document.querySelectorAll("[data-lang]").forEach(b=>b.addEventListener("click",()=>{state.lang=b.dataset.lang;document.querySelectorAll("[data-lang]").forEach(x=>x.classList.toggle("active",x===b));document.documentElement.lang=state.lang}));

const slides=[...document.querySelectorAll(".hero-slide")],dots=[...document.querySelectorAll(".dot")];
function slide(i){if(!slides.length)return;state.slides=(i+slides.length)%slides.length;slides.forEach((x,n)=>x.classList.toggle("active",n===state.slides));dots.forEach((x,n)=>x.classList.toggle("active",n===state.slides))}
$(".prev")?.addEventListener("click",()=>slide(state.slides-1));
$(".next")?.addEventListener("click",()=>slide(state.slides+1));
dots.forEach((d,i)=>d.addEventListener("click",()=>slide(i)));setInterval(()=>slide(state.slides+1),6500);

function renderFamilies(){
 const box=$("family-grid");box.innerHTML=publicFamilies.map(f=>`<article class="family-card"><div class="family-visual">${f.icon}</div><div class="family-content"><div class="section-label">FAMILY • परिवार</div><h2>${state.lang==="hi"?f.hi:f.en}</h2><p>${state.lang==="hi"?f.descHi:f.descEn}</p><button class="btn ghost" onclick="openFamily('${f.id}')">परिवार देखें →</button></div></article>`).join("");
}
window.openFamily=id=>{const f=publicFamilies.find(x=>x.id===id);if(!f)return;$("family-detail").innerHTML=`<div class="detail-panel"><div class="section-label">FAMILY TREE • परिवार वृक्ष</div><h2>${f.icon} ${state.lang==="hi"?f.hi:f.en}</h2><p>${state.lang==="hi"?f.descHi:f.descEn}</p><div class="member-public-grid">${f.members.map((m,i)=>`<div class="member-chip"><div class="avatar">${i<2?"👴":"👤"}</div><b>${m}</b><small>सार्वजनिक प्रोफ़ाइल • Public</small></div>`).join("")}</div><div style="margin-top:20px"><button class="btn primary" onclick="showPage('login')">🔐 निजी जानकारी के लिए लॉगिन</button></div></div>`;$("family-detail").scrollIntoView({behavior:"smooth"})};
renderFamilies();

$("search-input")?.addEventListener("input",e=>{const q=e.target.value.trim().toLowerCase(),box=$("search-results");if(!q){box.innerHTML="";return}const r=publicMembers.filter(m=>(m.name+m.family+m.designation).toLowerCase().includes(q));box.innerHTML=r.length?r.map(m=>`<div class="search-result"><div class="avatar">👤</div><div><h3>${m.name}</h3><p>${m.designation} • ${m.family}</p></div></div>`).join(""):"<p>कोई सार्वजनिक सदस्य नहीं मिला।</p>"});

async function api(path,options={}){const res=await fetch(API_BASE+path,{credentials:"include",headers:{"Content-Type":"application/json",...(options.headers||{})},...options});let data={};try{data=await res.json()}catch{}if(!res.ok)throw new Error(data.detail||data.message||`Request failed (${res.status})`);return data}
async function checkSession(){try{state.user=await api("/me");$("login-link").textContent="🔒 पोर्टल"}catch{state.user=null}}
checkSession();

$("login-form")?.addEventListener("submit",async e=>{e.preventDefault();const msg=$("login-message");msg.textContent="सुरक्षित रूप से लॉगिन हो रहा है…";try{const d=await api("/login",{method:"POST",body:JSON.stringify({username:$("username").value.trim(),password:$("password").value})});state.user=await api("/me");msg.textContent="";$("login-form").reset();toast("लॉगिन सफल ✓");showPage(d.role==="admin"?"admin":"dashboard")}catch(err){msg.textContent=err.message;toast("लॉगिन असफल")}});
async function logout(){try{await api("/logout",{method:"POST"})}catch{}state.user=null;toast("आप लॉग आउट हो गए");showPage("home");$("login-link").textContent="🔐 लॉगिन"}
$("logout")?.addEventListener("click",logout);$("admin-logout")?.addEventListener("click",logout);

async function loadPrivate(){const grid=$("private-grid");grid.innerHTML="<p>निजी जानकारी लोड हो रही है…</p>";try{if(!state.user)throw new Error("Not logged in");$("welcome-user").textContent=`स्वागत है, ${state.user.username}`;$("dash-title").textContent=state.user.family_id||"परिवार पोर्टल";state.privateData=await api("/family/private");const members=state.privateData.members||[];grid.innerHTML=members.length?members.map((m,i)=>`<article class="private-card"><div class="avatar">${m.avatar||["👴","👵","👨","👩","👦","👧"][i%6]}</div><h3>${m.name}</h3><p>${m.designation||"Family member"}</p><button class="btn ghost" onclick="privateMember(${m.id})">पूरी प्रोफ़ाइल →</button></article>`).join(""):"<div class='private-card'><h3>अभी members नहीं हैं</h3><p>Administrator dashboard से family members जोड़ें।</p></div>"}catch(err){grid.innerHTML=`<div class="private-card"><h3>सत्र उपलब्ध नहीं</h3><p>${err.message}</p><button class="btn primary" onclick="showPage('login')">लॉगिन</button></div>`}}
window.privateMember=id=>{const m=state.privateData?.members?.find(x=>x.id===id);if(!m)return;$("private-detail").innerHTML=`<div class="private-profile"><div class="section-label">PRIVATE PROFILE • निजी प्रोफ़ाइल</div><h2>${m.avatar||"👤"} ${m.name}</h2><p>${m.designation||""} ${m.relation?"• "+m.relation:""}</p><div class="private-info"><div class="info"><b>📞 संपर्क</b><span>${m.phone||"—"}</span></div><div class="info"><b>📧 ईमेल</b><span>${m.email||"—"}</span></div><div class="info"><b>🎂 जन्मदिन</b><span>${m.birthday||"—"}</span></div><div class="info"><b>🏠 पता</b><span>${m.address||"—"}</span></div><div class="info"><b>🎓 शिक्षा</b><span>${m.education||"—"}</span></div><div class="info"><b>💼 व्यवसाय</b><span>${m.profession||"—"}</span></div></div><div style="margin-top:25px"><div class="section-label">BIOGRAPHY</div><p>${m.biography||"—"}</p><div class="section-label">ACHIEVEMENTS</div><p>${m.achievements||"—"}</p><div class="section-label">MEMORIES</div><p>${m.memories||"—"}</p></div></div>`;$("private-detail").scrollIntoView({behavior:"smooth"})};

async function loadAdmin(){try{if(!state.user)state.user=await api("/me");if(state.user.role!=="admin")return;const users=await api("/admin/users"),members=await api("/admin/members");$("users-list").innerHTML=users.map(u=>`<div class="user-row"><b>${u.username}</b><small>${u.role} • ${u.family_id||"No family"} • ${u.active?"Active":"Disabled"}</small></div>`).join("");$("members-list").innerHTML=members.map(m=>`<div class="member-row"><b>${m.name}</b><small>${m.family_id} • ${m.designation||""}</small></div>`).join("")}catch(err){toast(err.message);showPage("login")}}
$("create-user-form")?.addEventListener("submit",async e=>{e.preventDefault();try{await api("/admin/users",{method:"POST",body:JSON.stringify({username:$("new-user").value,password:$("new-pass").value,family_id:$("new-family").value})});e.target.reset();toast("Family account बनाया गया ✓");loadAdmin()}catch(err){toast(err.message)}});
$("member-form")?.addEventListener("submit",async e=>{e.preventDefault();try{await api("/admin/members",{method:"POST",body:JSON.stringify({family_id:$("m-family").value,name:$("m-name").value,designation:$("m-designation").value,relation:$("m-relation").value,biography:$("m-bio").value,achievements:$("m-achievements").value})});e.target.reset();toast("Member सुरक्षित रूप से जोड़ा गया ✓");loadAdmin()}catch(err){toast(err.message)}});
