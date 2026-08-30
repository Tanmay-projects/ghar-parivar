const API_BASE="https://ghar-parivar-backend.onrender.com";
const state={lang:"hi",slides:0,user:null,privateData:null};

const publicFamilies=[
 {id:"family1",hi:"शर्मा परिवार",en:"Sharma Family",descHi:"एक स्नेही और एकजुट परिवार।",descEn:"A loving and close-knit family.",icon:"👨‍👩‍👧‍👦",members:[
  {name:"श्री राजेंद्र शर्मा",designation:"दादाजी • परिवार के वरिष्ठ सदस्य",role:"grandparent",icon:"👴"},
  {name:"श्रीमती सुनीता शर्मा",designation:"दादीजी • परिवार की वरिष्ठ सदस्य",role:"grandparent",icon:"👵"},
  {name:"श्री अमित शर्मा",designation:"पिताजी • व्यवसायी",role:"parent",icon:"👨"},
  {name:"श्रीमती नेहा शर्मा",designation:"माताजी • शिक्षिका",role:"parent",icon:"👩"},
  {name:"आरव शर्मा",designation:"पुत्र • विद्यार्थी",role:"child",icon:"👦"},
  {name:"अनाया शर्मा",designation:"पुत्री • विद्यार्थी",role:"child",icon:"👧"}
 ]},
 {id:"family2",hi:"वर्मा परिवार",en:"Verma Family",descHi:"परंपराओं और आधुनिक सोच का सुंदर मेल।",descEn:"A beautiful blend of tradition and modern thinking.",icon:"👨‍👩‍👦",members:[
  {name:"श्री मोहन वर्मा",designation:"दादाजी • सेवानिवृत्त अधिकारी",role:"grandparent",icon:"👴"},
  {name:"श्रीमती आशा वर्मा",designation:"दादीजी • गृहिणी",role:"grandparent",icon:"👵"},
  {name:"श्री राहुल वर्मा",designation:"पिताजी • इंजीनियर",role:"parent",icon:"👨"},
  {name:"श्रीमती पूजा वर्मा",designation:"माताजी • डॉक्टर",role:"parent",icon:"👩"},
  {name:"विवान वर्मा",designation:"पुत्र • विद्यार्थी",role:"child",icon:"👦"}
 ]},
 {id:"family3",hi:"गुप्ता परिवार",en:"Gupta Family",descHi:"शिक्षा, संस्कृति और सेवा को महत्व देने वाला परिवार।",descEn:"A family that values education, culture and service.",icon:"👪",members:[
  {name:"श्री सुरेश गुप्ता",designation:"दादाजी • व्यवसायी",role:"grandparent",icon:"👴"},
  {name:"श्रीमती कमला गुप्ता",designation:"दादीजी • वरिष्ठ सदस्य",role:"grandparent",icon:"👵"},
  {name:"श्री रोहित गुप्ता",designation:"पिताजी • चार्टर्ड अकाउंटेंट",role:"parent",icon:"👨"},
  {name:"श्रीमती नेहा गुप्ता",designation:"माताजी • शिक्षिका",role:"parent",icon:"👩"},
  {name:"रिया गुप्ता",designation:"पुत्री • विद्यार्थी",role:"child",icon:"👧"}
 ]}
];
const publicMembers=publicFamilies.flatMap(f=>f.members.map(m=>({...m,family:f.hi,familyId:f.id})));
const $=id=>document.getElementById(id);
function toast(msg){const t=$("toast");if(!t)return;t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2600)}
function showPage(id){document.querySelectorAll(".page").forEach(p=>p.classList.remove("active"));$(id)?.classList.add("active");$("mobile-nav")?.classList.remove("open");window.scrollTo({top:0,behavior:"smooth"});if(id==="dashboard")loadPrivate();if(id==="admin")loadAdmin()}
window.showPage=showPage;
document.addEventListener("click",e=>{const el=e.target.closest("[data-page]");if(el){e.preventDefault();showPage(el.dataset.page)}});
$("menu-btn")?.addEventListener("click",()=>$("mobile-nav")?.classList.toggle("open"));
document.querySelectorAll("[data-lang]").forEach(b=>b.addEventListener("click",()=>{state.lang=b.dataset.lang;document.querySelectorAll("[data-lang]").forEach(x=>x.classList.toggle("active",x===b));document.documentElement.lang=state.lang;renderFamilies();if(window.openedFamilyId)openFamily(window.openedFamilyId)}));

const slides=[...document.querySelectorAll(".hero-slide")],dots=[...document.querySelectorAll(".dot")];
function slide(i){if(!slides.length)return;state.slides=(i+slides.length)%slides.length;slides.forEach((x,n)=>x.classList.toggle("active",n===state.slides));dots.forEach((x,n)=>x.classList.toggle("active",n===state.slides))}
$(".prev")?.addEventListener("click",()=>slide(state.slides-1));$(".next")?.addEventListener("click",()=>slide(state.slides+1));dots.forEach((d,i)=>d.addEventListener("click",()=>slide(i)));setInterval(()=>slide(state.slides+1),6500);

function memberCard(m){return `<div class="member-chip"><div class="avatar">${m.icon||"👤"}</div><div class="member-name">${m.name}</div><div class="member-designation">${m.designation||"परिवार सदस्य"}</div><small>सार्वजनिक प्रोफ़ाइल • Public</small></div>`}
function treeNode(m){return `<button class="tree-node ${m.role}" onclick="showPublicMember('${m.familyId}','${m.name.replace(/'/g,"\\'")}')"><div class="tree-avatar">${m.icon||"👤"}</div><div class="tree-name">${m.name}</div><div class="tree-designation">${m.designation||"परिवार सदस्य"}</div></button>`}
function renderTree(f){const groups={grandparent:f.members.filter(m=>m.role==="grandparent"),parent:f.members.filter(m=>m.role==="parent"),child:f.members.filter(m=>m.role==="child")};return `<div class="family-tree"><div class="tree-level grandparents">${groups.grandparent.map(treeNode).join("")}</div><div class="tree-connector"></div><div class="tree-level parents">${groups.parent.map(treeNode).join("")}</div><div class="tree-connector"></div><div class="tree-level children">${groups.child.map(treeNode).join("")}</div></div>`}
function renderFamilies(){const box=$("family-grid");if(!box)return;box.innerHTML=publicFamilies.map(f=>`<article class="family-card"><div class="family-visual">${f.icon}</div><div class="family-content"><div class="section-label">FAMILY • परिवार</div><h2>${state.lang==="hi"?f.hi:f.en}</h2><p>${state.lang==="hi"?f.descHi:f.descEn}</p><button class="btn ghost" onclick="openFamily('${f.id}')">परिवार वृक्ष देखें →</button></div></article>`).join("")}
window.openedFamilyId=null;
window.openFamily=id=>{const f=publicFamilies.find(x=>x.id===id);if(!f)return;window.openedFamilyId=id;$("family-detail").innerHTML=`<div class="detail-panel"><div class="section-label">FAMILY TREE • परिवार वृक्ष</div><h2>${f.icon} ${state.lang==="hi"?f.hi:f.en}</h2><p>${state.lang==="hi"?f.descHi:f.descEn}</p>${renderTree(f)}<div class="tree-legend"><span>दादा-दादी</span><span>माता-पिता</span><span>बच्चे</span></div><h3 class="public-members-title">सभी सदस्य</h3><div class="member-public-grid">${f.members.map(memberCard).join("")}</div><div class="tree-private-note">🔒 फोन, ईमेल, पता और अन्य निजी जानकारी केवल अधिकृत लॉगिन के बाद उपलब्ध है।</div><button class="btn primary" onclick="showPage('login')">🔐 निजी जानकारी के लिए लॉगिन</button></div>`;$("family-detail").scrollIntoView({behavior:"smooth",block:"start"})};
window.showPublicMember=(familyId,name)=>{const f=publicFamilies.find(x=>x.id===familyId),m=f?.members.find(x=>x.name===name);if(!m)return;toast(`${m.name} — ${m.designation}`)};
renderFamilies();

/* Homepage family quote + members/login panel. Inserted by JS so the existing page structure stays intact. */
(function addHomeWelcome(){
 const home=document.getElementById("home");
 const blocks=home?.querySelector(".home-blocks");
 if(!home||!blocks||document.getElementById("family-welcome"))return;
 const wrap=document.createElement("div");
 wrap.id="family-welcome";
 wrap.innerHTML=`<section class="family-welcome-quote" aria-label="परिवार संदेश"><div class="quote-mark">❝</div><div class="quote-kicker">हमारा परिवार</div><blockquote>परिवार ही सब कुछ हे...<br>हिम्मत हे, होसला हे, सम्बल हे, ताक़त हे,<br>ओर हर आपदा को जितने का विश्वास हे.</blockquote><div class="quote-line">✦ ───────── ✦</div></section><section class="family-member-login"><div class="member-login-icon">♙</div><div class="member-login-copy"><span>FAMILY MEMBERS • परिवार के सदस्य</span><h2>परिवार के सदस्य</h2><p>परिवार के अधिकृत सदस्य अपनी निजी पारिवारिक जानकारी सुरक्षित रूप से देख सकते हैं।</p></div><button class="member-login-btn" data-page="login">🔐 सदस्य लॉगिन</button></section>`;
 blocks.parentNode.insertBefore(wrap,blocks);
})();

$("search-input")?.addEventListener("input",e=>{const q=e.target.value.trim().toLowerCase(),box=$("search-results");if(!q){box.innerHTML="";return}const r=publicMembers.filter(m=>(m.name+m.family+m.designation).toLowerCase().includes(q));box.innerHTML=r.length?r.map(m=>`<div class="search-result"><div class="avatar">${m.icon||"👤"}</div><div><h3>${m.name}</h3><p><strong>${m.designation}</strong> • ${m.family}</p></div></div>`).join(""):"<p>कोई सार्वजनिक सदस्य नहीं मिला।</p>"});

async function api(path,options={}){const res=await fetch(API_BASE+path,{credentials:"include",headers:{"Content-Type":"application/json",...(options.headers||{})},...options});let data={};try{data=await res.json()}catch{}if(!res.ok)throw new Error(data.detail||data.message||`Request failed (${res.status})`);return data}
async function checkSession(){try{state.user=await api("/me");$("login-link").textContent="🔒 पोर्टल"}catch{state.user=null}}
checkSession();
$("login-form")?.addEventListener("submit",async e=>{e.preventDefault();const msg=$("login-message");msg.textContent="सुरक्षित रूप से लॉगिन हो रहा है…";try{const d=await api("/login",{method:"POST",body:JSON.stringify({username:$("username").value.trim(),password:$("password").value})});state.user=await api("/me");msg.textContent="";e.target.reset();toast("लॉगिन सफल ✓");showPage(d.role==="admin"?"admin":"dashboard")}catch(err){msg.textContent=err.message;toast("लॉगिन असफल")}});
async function logout(){try{await api("/logout",{method:"POST"})}catch{}state.user=null;toast("आप लॉग आउट हो गए");showPage("home");$("login-link").textContent="🔐 लॉगिन"}
$("logout")?.addEventListener("click",logout);$("admin-logout")?.addEventListener("click",logout);
async function loadPrivate(){const grid=$("private-grid");if(!grid)return;grid.innerHTML="<p>निजी जानकारी लोड हो रही है…</p>";try{if(!state.user)throw new Error("Not logged in");$("welcome-user").textContent=`स्वागत है, ${state.user.username}`;$("dash-title").textContent=state.user.family_id||"परिवार पोर्टल";state.privateData=await api("/family/private");const members=state.privateData.members||[];grid.innerHTML=members.length?members.map((m,i)=>`<article class="private-card"><div class="avatar">${m.avatar||["👴","👵","👨","👩","👦","👧"][i%6]}</div><h3>${m.name}</h3><p class="private-designation">${m.designation||"Family member"}</p><button class="btn ghost" onclick="privateMember(${m.id})">पूरी प्रोफ़ाइल →</button></article>`).join(""):"<div class='private-card'><h3>अभी members नहीं हैं</h3><p>Administrator dashboard से family members जोड़ें।</p></div>"}catch(err){grid.innerHTML=`<div class="private-card"><h3>सत्र उपलब्ध नहीं</h3><p>${err.message}</p><button class="btn primary" onclick="showPage('login')">लॉगिन</button></div>`}}
window.privateMember=id=>{const m=state.privateData?.members?.find(x=>x.id===id);if(!m)return;$("private-detail").innerHTML=`<div class="private-profile"><div class="section-label">PRIVATE PROFILE • निजी प्रोफ़ाइल</div><h2>${m.avatar||"👤"} ${m.name}</h2><p class="private-designation">${m.designation||""} ${m.relation?"• "+m.relation:""}</p><div class="private-info"><div class="info"><b>📞 संपर्क</b><span>${m.phone||"—"}</span></div><div class="info"><b>📧 ईमेल</b><span>${m.email||"—"}</span></div><div class="info"><b>🎂 जन्मदिन</b><span>${m.birthday||"—"}</span></div><div class="info"><b>🏠 पता</b><span>${m.address||"—"}</span></div><div class="info"><b>🎓 शिक्षा</b><span>${m.education||"—"}</span></div><div class="info"><b>💼 व्यवसाय</b><span>${m.profession||"—"}</span></div></div><div style="margin-top:25px"><div class="section-label">BIOGRAPHY</div><p>${m.biography||"—"}</p><div class="section-label">ACHIEVEMENTS</div><p>${m.achievements||"—"}</p><div class="section-label">MEMORIES</div><p>${m.memories||"—"}</p></div></div>`;$("private-detail").scrollIntoView({behavior:"smooth"})};
async function loadAdmin(){try{if(!state.user)state.user=await api("/me");if(state.user.role!=="admin")return;const users=await api("/admin/users"),members=await api("/admin/members");$("users-list").innerHTML=users.map(u=>`<div class="user-row"><b>${u.username}</b><small>${u.role} • ${u.family_id||"No family"} • ${u.active?"Active":"Disabled"}</small></div>`).join("");$("members-list").innerHTML=members.map(m=>`<div class="member-row"><b>${m.name}</b><small>${m.family_id} • ${m.designation||""}</small></div>`).join("")}catch(err){toast(err.message);showPage("login")}}
$("create-user-form")?.addEventListener("submit",async e=>{e.preventDefault();try{await api("/admin/users",{method:"POST",body:JSON.stringify({username:$("new-user").value,password:$("new-pass").value,family_id:$("new-family").value})});e.target.reset();toast("Family account बनाया गया ✓");loadAdmin()}catch(err){toast(err.message)}});
$("member-form")?.addEventListener("submit",async e=>{e.preventDefault();try{await api("/admin/members",{method:"POST",body:JSON.stringify({family_id:$("m-family").value,name:$("m-name").value,designation:$("m-designation").value,relation:$("m-relation").value,biography:$("m-bio").value,achievements:$("m-achievements").value})});e.target.reset();toast("Member सुरक्षित रूप से जोड़ा गया ✓");loadAdmin()}catch(err){toast(err.message)}});
