/* GHAR PARIVAR — public home occupation spotlight. No Render dependency. */
(() => {
  const members = [
    { name: "मुकेश डावर", nameEn: "Mukesh Dawar", occupation: "Ex-service man (Army)", family: "डावर परिवार", avatar: "👨" },
    { name: "माया", nameEn: "Maya", occupation: "Inspector (Agriculture Department)", family: "डावर परिवार", avatar: "👩" }
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
