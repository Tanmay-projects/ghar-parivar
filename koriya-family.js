/* GHAR PARIVAR — Koriya family launch data
   Static launch data only. It does not touch Salary Manager or the backend.
*/
(function () {
  const koriya = {
    id: "koriya",
    name: "Koriya Family",
    hindi: "कोरिया परिवार",
    description: "कोरिया परिवार की पीढ़ियां, भाई-बहन और वैवाहिक रिश्ते।",
    elders: [
      { id: "mewalal", name: "Mewalal", spouse: "Sunita" },
      { id: "badrilal", name: "Badrilal", spouse: "Dropati" },
      { id: "bhavsingh", name: "Bhavsingh", spouse: "Kanta" },
      { id: "sevaram", name: "Sevaram", spouse: "Sita" },
      { id: "ramprashad", name: "Ramprashad", spouse: "Dropati" }
    ],
    branches: [
      {
        parent: "mewalal",
        children: [
          { id: "manoj", name: "Manoj", spouse: "Sapna", children: ["Priya (Purnima)", "Babli (Anushka)", "Gunjan"] },
          { id: "ravi", name: "Ravi", spouse: "Lakshmi", children: ["Sagun", "Rishika"] }
        ]
      },
      {
        parent: "badrilal",
        children: [
          { id: "anand", name: "Anand", spouse: "Mamta", children: ["Daksh", "Anshu (Rajveer)"] },
          { id: "bhagat", name: "Bhagat", spouse: "Komal", children: ["Paridhi", "Veshu"] },
          { id: "govind", name: "Govind", spouse: "Aarti", children: ["Riya (Rashi)", "Naksh"] }
        ]
      },
      {
        parent: "bhavsingh",
        children: [
          { id: "narendra", name: "Narendra", spouse: "Radha", children: ["Vansh", "Gaurav"] }
        ]
      }
    ],
    otherElders: ["sevaram", "ramprashad"]
  };

  function person(name, relation, extra) {
    return `<div class="koriya-person"><div class="koriya-avatar">👤</div><div><strong>${name}</strong><span>${relation}</span>${extra ? `<small>${extra}</small>` : ""}</div></div>`;
  }

  function couple(man, wife, relation) {
    return `<div class="koriya-couple">${person(man, relation)}<div class="koriya-marriage">♥</div>${person(wife, "पत्नी")}</div>`;
  }

  function branchCard(branch) {
    const elder = koriya.elders.find(x => x.id === branch.parent);
    return `<div class="koriya-branch">
      <div class="koriya-parent">${couple(elder.name, elder.spouse, "भाई • वरिष्ठ पीढ़ी")}</div>
      <div class="koriya-down"></div>
      <div class="koriya-siblings">
        ${branch.children.map((c, i) => `<div class="koriya-child-branch">
          <div class="koriya-arm"></div>
          ${couple(c.name, c.spouse, "भाई • संतान")}
          <div class="koriya-down small"></div>
          <div class="koriya-children">${c.children.map(ch => person(ch, "पुत्र / पुत्री")).join("")}</div>
        </div>`).join("")}
      </div>
    </div>`;
  }

  function renderCard() {
    const grid = document.getElementById("family-grid");
    if (!grid || document.getElementById("koriya-family-card")) return;
    grid.insertAdjacentHTML("beforeend", `<article id="koriya-family-card" class="family-card koriya-family-card">
      <div class="family-visual koriya-visual"><div class="koriya-group-icon">👨‍👩‍👧‍👦</div><span>KORIYA FAMILY</span></div>
      <div class="family-content"><div class="section-label">FAMILY • परिवार</div><h2>${koriya.hindi}</h2><p>${koriya.description}</p><button onclick="openKoriyaFamily()">परिवार वृक्ष देखें →</button></div>
    </article>`);
  }

  window.openKoriyaFamily = function () {
    const detail = document.getElementById("family-detail");
    if (!detail) return;
    detail.innerHTML = `<div class="detail-panel koriya-detail">
      <button class="btn ghost" type="button" onclick="document.getElementById('family-detail').innerHTML=''">← परिवार सूची</button>
      <div class="section-label">KORIYA FAMILY • कोरिया परिवार</div>
      <h2>कोरिया परिवार</h2>
      <p>${koriya.description}</p>
      <div class="koriya-note">एक ही पीढ़ी के भाई अलग-अलग शाखाओं में दिखाए गए हैं और प्रत्येक भाई के साथ उसकी पत्नी तथा बच्चों की शाखा जोड़ी गई है।</div>
      <div class="koriya-elders">${koriya.elders.map(e => couple(e.name, e.spouse, "भाई • वरिष्ठ पीढ़ी")).join("")}</div>
      <div class="koriya-family-line"></div>
      <div class="koriya-branches">${koriya.branches.map(branchCard).join("")}</div>
      <div class="tree-private-note">🔒 मोबाइल, ईमेल, पता और अन्य निजी जानकारी केवल अधिकृत लॉगिन के बाद उपलब्ध होगी।</div>
    </div>`;
    detail.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const style = document.createElement("style");
  style.textContent = `
    .koriya-family-card .family-visual{display:flex;align-items:center;justify-content:center;gap:12px;flex-direction:column;min-height:190px}
    .koriya-group-icon{font-size:70px}.koriya-visual span{font-size:12px;letter-spacing:2px;font-weight:800}
    .koriya-detail{overflow:hidden}.koriya-note{margin:18px 0;padding:12px 16px;border-radius:12px;background:#f5f7fa;color:#40566d}
    .koriya-elders{display:flex;gap:14px;flex-wrap:wrap;justify-content:center;margin:24px 0 8px}
    .koriya-couple{display:flex;align-items:center;gap:8px;padding:10px;border:1px solid #d9e2ec;border-radius:14px;background:#fff;box-shadow:0 5px 15px rgba(16,42,67,.06)}
    .koriya-person{display:flex;align-items:center;gap:8px;min-width:120px}.koriya-avatar{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;background:#eef3f7;font-size:21px;overflow:hidden}.koriya-person strong,.koriya-person span,.koriya-person small{display:block}.koriya-person span{font-size:11px;color:#60758a;margin-top:2px}.koriya-person small{font-size:10px;color:#71869a;margin-top:2px}.koriya-marriage{font-size:14px}.koriya-family-line{height:28px;width:2px;background:#b7c5d2;margin:auto}.koriya-branches{display:grid;gap:28px}.koriya-branch{position:relative;border:1px solid #d9e2ec;border-radius:18px;padding:18px;background:#fbfcfd}.koriya-parent{display:flex;justify-content:center}.koriya-down{width:2px;height:22px;background:#b7c5d2;margin:0 auto}.koriya-siblings{display:flex;gap:18px;justify-content:center;position:relative;flex-wrap:wrap}.koriya-child-branch{position:relative;flex:1 1 260px;min-width:240px}.koriya-arm{height:1px;background:#b7c5d2;position:absolute;top:0;left:10%;right:10%}.koriya-child-branch>.koriya-couple{position:relative;z-index:1;justify-content:center}.koriya-down.small{height:16px}.koriya-children{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}.koriya-children .koriya-person{min-width:145px;padding:8px;border:1px solid #e1e7ed;border-radius:12px;background:#fff}
    @media(max-width:700px){.koriya-elders,.koriya-siblings{display:grid}.koriya-person{min-width:105px}.koriya-child-branch{min-width:0}.koriya-couple{justify-content:center}.koriya-children .koriya-person{min-width:125px}}
  `;
  document.head.appendChild(style);
  renderCard();
})();