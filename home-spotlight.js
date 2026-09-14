/* GHAR PARIVAR — public home occupation spotlight. No Render dependency. */
(() => {
  const members = [
    { name: "बद्रीलाल कोरिया", nameEn: "Badrilal Koriya", occupation: "Ret. HOD (Education Department)", family: "कोरिया परिवार", avatar: "👨" },
    { name: "मेवालाल कोरिया", nameEn: "Mewalal Koriya", occupation: "Ret. केंद्रीय संग्रहालय, इंदौर", family: "कोरिया परिवार", avatar: "👨" },
    { name: "मदनलाल डिंडोड", nameEn: "Madanlal Dindod", occupation: "Ret. HOD (Education Department)", family: "डिंडोर परिवार", avatar: "👨" },
    { name: "राकेश सुमरा", nameEn: "Rakesh Sumra", occupation: "Establishment Assistant (Custom Department)", family: "सुमरा परिवार", avatar: "👨" },
    { name: "आनंद कोरिया", nameEn: "Anand Koriya", occupation: "Inspector (Agriculture Department)", family: "कोरिया परिवार", avatar: "👨" },
    { name: "महेश सुमरा", nameEn: "Mahesh Sumra", occupation: "Teacher (Education Department)", family: "सुमरा परिवार", avatar: "👨" },
    { name: "कविता सुमरा", nameEn: "Kavita Sumra", occupation: "Teacher (Education Department)", family: "सुमरा परिवार", avatar: "👩" },
    { name: "दिनेश सुमरा", nameEn: "Dinesh Sumra", occupation: "Infantry School, Mhow", family: "सुमरा परिवार", avatar: "👨" },
    { name: "भगत कोरिया", nameEn: "Bhagat Koriya", occupation: "Police", family: "कोरिया परिवार", avatar: "👨" },
    { name: "सुभाष डिंडोड", nameEn: "Subhash Dindod", occupation: "AG3 (Nagar Palika)", family: "डिंडोर परिवार", avatar: "👨" },
    { name: "मंगला डिंडोड", nameEn: "Mangla Dindod", occupation: "Teacher (Tribal Department)", family: "डिंडोर परिवार", avatar: "👩" },
    { name: "दीपक डिंडोड", nameEn: "Deepak Dindod", occupation: "Assistant (DGGCI)", family: "डिंडोर परिवार", avatar: "👨" },
    { name: "रिया सुमरा", nameEn: "Riya Sumra", occupation: "Doctor (Specialist Gynecologist)", family: "सुमरा परिवार", avatar: "👩" },
    { name: "राहुल सुमरा", nameEn: "Rahul Sumra", occupation: "MBA", family: "सुमरा परिवार", avatar: "👨" }
  ];
  let index = 0;
  const $ = id => document.getElementById(id);
  function render() {
    const m = members[index];
    const name = $("spotlight-name");
    const nameEn = $("spotlight-name-en");
    const designation = $("spotlight-designation");
    const occupation = $("spotlight-occupation");
    const family = $("spotlight-family");
    const avatar = $("spotlight-avatar");
    const dots = document.querySelectorAll(".spotlight-dot");
    if (!name) return;
    name.textContent = m.name;
    nameEn.textContent = m.nameEn;
    if (designation) {
      designation.textContent = "";
      designation.style.display = "none";
    }
    occupation.textContent = m.occupation;
    family.textContent = m.family;
    avatar.textContent = m.avatar;
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  }
  function move(step) {
    index = (index + step + members.length) % members.length;
    render();
  }
  document.addEventListener("click", e => {
    const next = e.target.closest("[data-spotlight-next]");
    const prev = e.target.closest("[data-spotlight-prev]");
    const dot = e.target.closest("[data-spotlight-index]");
    if (next) move(1);
    if (prev) move(-1);
    if (dot) { index = Number(dot.dataset.spotlightIndex) || 0; render(); }
  });
  document.addEventListener("DOMContentLoaded", () => {
    render();
    setInterval(() => move(1), 8000);
  });
})();