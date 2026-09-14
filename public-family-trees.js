/* GHAR PARIVAR — public family trees
   Single source for public family-tree display. No backend required. */
(function () {
  const FAMILIES = [
    {
      id: 'dawar', name: 'डावर परिवार', description: 'शंकरलाल और कंचन बाई से आगे बढ़ता डावर परिवार।',
      root: ['Shankarlal', 'Kanchan Bai'],
      branches: [
        { couple: ['Mukesh', 'Maya'], children: ['Tanmay', 'Harshita'] }
      ]
    },
    {
      id: 'dindor', name: 'डिंडोर परिवार', description: 'सुखराम दिंडोड और संपत बाई से आगे बढ़ता डिंडोर परिवार।',
      root: ['Sukhram Dindod', 'Sampat Bai'],
      branches: [
        { couple: ['Madanlal', 'Basantibai'], children: [
          { couple: ['Maya', 'Mukesh'], children: ['Tanmay', 'Harshita'] },
          { couple: ['Subhash', 'Mangla'], children: ['Harsh', 'Rohan'] },
          { couple: ['Deepak', 'Harshika'], children: ['Prisha', 'Kashvi'] }
        ]},
        { couple: ['Gopal', 'Sunita'], children: [
          { couple: ['Dayshankar', 'Jaya'], children: [] },
          { couple: ['Kamini', 'Golu'], children: [] }
        ]}
      ]
    },
    {
      id: 'sumra', name: 'सुमरा परिवार', description: 'धुलजी राम और नादन बाई से आगे बढ़ता सुमरा परिवार।',
      root: ['Dhulji Ram', 'Nadan Bai'],
      branches: [
        { couple: ['Rakesh', 'Sakuntala'], children: ['Riya', 'Rahul'] },
        { couple: ['Dinesh', 'Sushila'], children: [
          { couple: ['Abhishek', 'Jagarati'], children: [] }, 'Sonali'
        ]},
        { couple: ['Babulal', 'Santosh'], children: ['Puja', 'Shubham'] },
        { couple: ['Mahesh', 'Kavita'], children: ['Akshat', 'Jayant'] }
      ]
    },
    {
      id: 'koriya', name: 'कोरिया परिवार', description: 'उमराव और रुकमा से आगे बढ़ता कोरिया परिवार।',
      root: ['Umrav', 'Rukma'],
      branches: [
        { couple: ['Mewalal', 'Sunita'], children: [
          { couple: ['Manoj', 'Sapna'], children: ['Priya (Purnima)', 'Babli (Anushka)', 'Gunjan'] },
          { couple: ['Ravi', 'Lakshmi'], children: ['Sagun', 'Rishika'] }
        ]},
        { couple: ['Badrilal', 'Dropati'], children: [
          { couple: ['Anand', 'Mamta'], children: ['Daksh', 'Anshu (Rajveer)'] },
          { couple: ['Bhagat', 'Komal'], children: ['Paridhi', 'Veshu'] },
          { couple: ['Govind', 'Aarti'], children: ['Riya (Rashi)', 'Naksh'] }
        ]},
        { couple: ['Bhavsingh', 'Kanta'], children: [
          { couple: ['Narendra', 'Radha'], children: ['Vansh', 'Gaurav'] }
        ]},
        { couple: ['Sevaram', 'Sita'], children: [] },
        { couple: ['Ramprashad', 'Dropati'], children: [] }
      ]
    }
  ];

  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const person = name => `<div class="pf-person"><div class="pf-avatar">👤</div><strong>${esc(name)}</strong></div>`;
  const couple = pair => pair.length > 1
    ? `<div class="pf-couple">${person(pair[0])}<span class="pf-dash">—</span>${person(pair[1])}</div>`
    : person(pair[0]);

  function childrenMarkup(children) {
    if (!children || !children.length) return '';
    return `<div class="pf-children-line"></div><div class="pf-children">${children.map(child => {
      if (typeof child === 'string') return `<div class="pf-child">${person(child)}</div>`;
      return `<div class="pf-child pf-branch"><div>${couple(child.couple)}</div>${childrenMarkup(child.children)}</div>`;
    }).join('')}</div>`;
  }

  function tree(f) {
    return `<div class="pf-tree">
      <div class="pf-root">${couple(f.root)}</div>
      <div class="pf-main-line"></div>
      <div class="pf-branches">${f.branches.map(branch => `<section class="pf-branch-block">
        <div class="pf-parent">${couple(branch.couple)}</div>
        ${childrenMarkup(branch.children)}
      </section>`).join('')}</div>
    </div>`;
  }

  function openFamily(id) {
    const f = FAMILIES.find(x => x.id === id);
    const detail = document.getElementById('family-detail');
    if (!f || !detail) return;
    detail.innerHTML = `<div class="detail-panel pf-detail">
      <button class="btn ghost" type="button" id="pf-back">← परिवार सूची</button>
      <div class="section-label">FAMILY TREE • परिवार वृक्ष</div>
      <h2>${esc(f.name)}</h2>
      <p>${esc(f.description)}</p>
      ${tree(f)}
      <div class="tree-private-note">निजी मोबाइल, ईमेल, पता और अन्य जानकारी केवल अधिकृत लॉगिन के बाद उपलब्ध होगी।</div>
    </div>`;
    document.getElementById('pf-back').onclick = () => { detail.innerHTML = ''; render(); };
    detail.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function render() {
    const grid = document.getElementById('family-grid');
    if (!grid) return;
    grid.innerHTML = FAMILIES.map(f => `<article class="family-card pf-family-card">
      <div class="family-visual">👨‍👩‍👧‍👦</div>
      <div class="family-content">
        <div class="section-label">FAMILY • परिवार</div>
        <h2>${esc(f.name)}</h2>
        <p>${esc(f.description)}</p>
        <button type="button" data-pf-open="${esc(f.id)}">परिवार वृक्ष देखें →</button>
      </div>
    </article>`).join('');
  }

  document.addEventListener('click', event => {
    const button = event.target.closest('[data-pf-open]');
    if (button) openFamily(button.dataset.pf-open);
  });

  const style = document.createElement('style');
  style.textContent = `
    .pf-family-card{display:block}
    .pf-tree{padding:24px 0;overflow-x:auto}
    .pf-root,.pf-parent{text-align:center}
    .pf-couple{display:inline-flex;align-items:center;justify-content:center;gap:12px;padding:11px 16px;border:1px solid #d9e2ec;border-radius:14px;background:#fff;box-shadow:0 5px 15px rgba(16,42,67,.06);flex-wrap:wrap}
    .pf-person{display:flex;align-items:center;gap:7px;white-space:nowrap}
    .pf-avatar{width:38px;height:38px;border-radius:50%;display:grid;place-items:center;background:#eef3f7}
    .pf-dash{font-weight:700;color:#52606d}
    .pf-main-line,.pf-children-line{height:24px;width:2px;background:#aebdca;margin:0 auto}
    .pf-branches{display:flex;gap:18px;justify-content:center;align-items:flex-start;position:relative;padding-top:10px}
    .pf-branches:before{content:"";position:absolute;top:10px;left:10%;right:10%;height:2px;background:#aebdca}
    .pf-branch-block{position:relative;flex:1 1 220px;min-width:220px;border:1px solid #d9e2ec;border-radius:18px;padding:18px;background:#fbfcfd}
    .pf-branch-block:before{content:"";position:absolute;top:-11px;left:50%;width:2px;height:11px;background:#aebdca}
    .pf-children{display:flex;gap:14px;justify-content:center;align-items:flex-start;position:relative;flex-wrap:wrap}
    .pf-child{position:relative;text-align:center}
    .pf-child:not(.pf-branch){padding:8px;border:1px solid #e1e7ed;border-radius:12px;background:#fff}
    .pf-branch{min-width:180px}
    .pf-branch>.pf-couple{font-size:14px}
    .pf-branch .pf-avatar{width:30px;height:30px}
    .pf-branch .pf-children-line{height:18px}
    @media(max-width:850px){.pf-branches{display:grid;grid-template-columns:repeat(2,minmax(220px,1fr));justify-content:stretch}.pf-branches:before{display:none}}
    @media(max-width:560px){.pf-branches{grid-template-columns:1fr}.pf-branch-block{min-width:0}.pf-tree{overflow-x:hidden}.pf-couple{max-width:100%;font-size:14px}.pf-person{white-space:normal}.pf-children{display:grid;grid-template-columns:1fr}.pf-branch{min-width:0}}
  `;
  document.head.appendChild(style);
  render();
  setTimeout(() => {
    const grid = document.getElementById('family-grid');
    if (grid && (!grid.children.length || grid.textContent.includes('अभी कोई परिवार उपलब्ध नहीं है'))) render();
  }, 1200);
})();
