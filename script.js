document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     PAGE NAVIGATION
  ========================= */

  const pages = document.querySelectorAll(".page");

  window.showPage = function (pageId) {

    pages.forEach(function (page) {
      page.classList.remove("active");
    });

    const page = document.getElementById(pageId);

    if (page) {
      page.classList.add("active");
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    closeMobileMenu();
  };


  /* =========================
     ALL PAGE BUTTONS / LINKS
  ========================= */

  document.querySelectorAll("[data-page]").forEach(function (element) {

    element.addEventListener("click", function (event) {

      event.preventDefault();

      const pageId = element.getAttribute("data-page");

      if (pageId) {
        window.showPage(pageId);
      }

    });

  });


  /* =========================
     MOBILE MENU
  ========================= */

  const menuButton =
    document.querySelector(".mobile-menu-btn");

  const mobileMenu =
    document.querySelector(".mobile-menu");

  function closeMobileMenu() {
    if (mobileMenu) {
      mobileMenu.classList.remove("open");
    }
  }

  if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", function () {
      mobileMenu.classList.toggle("open");
    });

  }


  /* =========================
     LANGUAGE
  ========================= */

  let currentLanguage = "hi";

  function updateLanguage(language) {

    currentLanguage = language;

    document.querySelectorAll("[data-hi]").forEach(function (element) {

      const hindi = element.getAttribute("data-hi");
      const english = element.getAttribute("data-en");

      element.textContent =
        language === "hi" ? hindi : english;

    });

    document.querySelectorAll(".language-switcher button")
      .forEach(function (button) {

        button.classList.remove("active");

        if (button.dataset.language === language) {
          button.classList.add("active");
        }

      });

    if (selectedFamily) {
      renderFamily();
    }

    if (selectedMember) {
      renderMember();
    }

  }

  document.querySelectorAll(
    ".language-switcher button"
  ).forEach(function (button) {

    button.addEventListener("click", function () {

      updateLanguage(button.dataset.language);

    });

  });


  /* =========================
     SLIDESHOW
  ========================= */

  const slides =
    document.querySelectorAll(".slide");

  const dots =
    document.querySelectorAll(".dot");

  const previous =
    document.querySelector(".slide-arrow.previous");

  const next =
    document.querySelector(".slide-arrow.next");

  let slideIndex = 0;

  function showSlide(index) {

    if (!slides.length) return;

    slideIndex =
      (index + slides.length) % slides.length;

    slides.forEach(function (slide) {
      slide.classList.remove("active-slide");
    });

    dots.forEach(function (dot) {
      dot.classList.remove("active-dot");
    });

    slides[slideIndex]
      .classList.add("active-slide");

    if (dots[slideIndex]) {
      dots[slideIndex]
        .classList.add("active-dot");
    }

  }

  if (previous) {

    previous.addEventListener("click", function () {
      showSlide(slideIndex - 1);
    });

  }

  if (next) {

    next.addEventListener("click", function () {
      showSlide(slideIndex + 1);
    });

  }

  dots.forEach(function (dot, index) {

    dot.addEventListener("click", function () {
      showSlide(index);
    });

  });

  showSlide(0);

  if (slides.length > 1) {

    setInterval(function () {
      showSlide(slideIndex + 1);
    }, 5000);

  }


  /* =========================
     FAMILY DATA
  ========================= */

  const families = {

    family1: {
      nameHi: "शर्मा परिवार",
      nameEn: "Sharma Family",

      descriptionHi:
        "एक स्नेही और एकजुट परिवार की कहानी।",

      descriptionEn:
        "The story of a loving and close-knit family.",

      members: [

        {
          id: "rajendra",
          nameHi: "श्री राजेंद्र शर्मा",
          nameEn: "Mr. Rajendra Sharma",

          designationHi: "परिवार के वरिष्ठ सदस्य",
          designationEn: "Senior Family Member",

          generation: "grandparent",

          achievementHi:
            "समाज सेवा में 30 वर्षों का योगदान।",

          achievementEn:
            "30 years of contribution to social service."
        },

        {
          id: "sunita",
          nameHi: "श्रीमती सुनीता शर्मा",
          nameEn: "Mrs. Sunita Sharma",

          designationHi: "परिवार की वरिष्ठ सदस्य",
          designationEn: "Senior Family Member",

          generation: "grandparent",

          achievementHi:
            "परिवार और सामाजिक गतिविधियों में सक्रिय योगदान।",

          achievementEn:
            "Active contribution to family and social activities."
        },

        {
          id: "amit",
          nameHi: "श्री अमित शर्मा",
          nameEn: "Mr. Amit Sharma",

          designationHi: "व्यवसायी",
          designationEn: "Business Professional",

          generation: "parent",

          achievementHi:
            "सफल व्यवसाय का संचालन और सामाजिक कार्यों में योगदान।",

          achievementEn:
            "Runs a successful business and contributes to social initiatives."
        },

        {
          id: "neha",
          nameHi: "श्रीमती नेहा शर्मा",
          nameEn: "Mrs. Neha Sharma",

          designationHi: "शिक्षिका",
          designationEn: "Teacher",

          generation: "parent",

          achievementHi:
            "शिक्षा के क्षेत्र में उत्कृष्ट योगदान।",

          achievementEn:
            "Outstanding contribution to education."
        },

        {
          id: "aarav",
          nameHi: "आरव शर्मा",
          nameEn: "Aarav Sharma",

          designationHi: "विद्यार्थी",
          designationEn: "Student",

          generation: "child",

          achievementHi:
            "विद्यालय स्तर पर विभिन्न प्रतियोगिताओं में भागीदारी।",

          achievementEn:
            "Participation in several school-level competitions."
        },

        {
          id: "anaya",
          nameHi: "अनाया शर्मा",
          nameEn: "Anaya Sharma",

          designationHi: "विद्यार्थी",
          designationEn: "Student",

          generation: "child",

          achievementHi:
            "कला और रचनात्मक गतिविधियों में रुचि।",

          achievementEn:
            "Interested in art and creative activities."
        }

      ]
    },


    family2: {

      nameHi: "वर्मा परिवार",
      nameEn: "Verma Family",

      descriptionHi:
        "परंपराओं और आधुनिक सोच का सुंदर मेल।",

      descriptionEn:
        "A beautiful blend of tradition and modern thinking.",

      members: [

        {
          id: "mohan",
          nameHi: "श्री मोहन वर्मा",
          nameEn: "Mr. Mohan Verma",

          designationHi: "सेवानिवृत्त अधिकारी",
          designationEn: "Retired Officer",

          generation: "grandparent",

          achievementHi:
            "सार्वजनिक सेवा में दीर्घ अनुभव।",

          achievementEn:
            "Extensive experience in public service."
        },

        {
          id: "kavita",
          nameHi: "श्रीमती कविता वर्मा",
          nameEn: "Mrs. Kavita Verma",

          designationHi: "सामाजिक कार्यकर्ता",
          designationEn: "Social Worker",

          generation: "grandparent",

          achievementHi:
            "सामुदायिक कार्यक्रमों में सक्रिय योगदान।",

          achievementEn:
            "Active contribution to community programs."
        },

        {
          id: "rahul",
          nameHi: "राहुल वर्मा",
          nameEn: "Rahul Verma",

          designationHi: "इंजीनियर",
          designationEn: "Engineer",

          generation: "parent",

          achievementHi:
            "तकनीकी क्षेत्र में उत्कृष्ट कार्य।",

          achievementEn:
            "Excellent work in the technology sector."
        },

        {
          id: "pooja",
          nameHi: "पूजा वर्मा",
          nameEn: "Pooja Verma",

          designationHi: "डॉक्टर",
          designationEn: "Doctor",

          generation: "parent",

          achievementHi:
            "स्वास्थ्य सेवा में योगदान।",

          achievementEn:
            "Contribution to healthcare."
        },

        {
          id: "vivaan",
          nameHi: "विवान वर्मा",
          nameEn: "Vivaan Verma",

          designationHi: "विद्यार्थी",
          designationEn: "Student",

          generation: "child",

          achievementHi:
            "खेल प्रतियोगिताओं में उपलब्धियां।",

          achievementEn:
            "Achievements in sports competitions."
        }

      ]
    },


    family3: {

      nameHi: "गुप्ता परिवार",
      nameEn: "Gupta Family",

      descriptionHi:
        "एक परिवार जो शिक्षा, संस्कृति और सेवा को महत्व देता है।",

      descriptionEn:
        "A family that values education, culture and service.",

      members: [

        {
          id: "suresh",
          nameHi: "श्री सुरेश गुप्ता",
          nameEn: "Mr. Suresh Gupta",

          designationHi: "व्यवसायी",
          designationEn: "Business Owner",

          generation: "grandparent",

          achievementHi:
            "व्यवसाय और सामाजिक सेवा में योगदान।",

          achievementEn:
            "Contribution to business and social service."
        },

        {
          id: "meena",
          nameHi: "श्रीमती मीना गुप्ता",
          nameEn: "Mrs. Meena Gupta",

          designationHi: "गृहिणी एवं सामाजिक कार्यकर्ता",
          designationEn: "Homemaker & Social Worker",

          generation: "grandparent",

          achievementHi:
            "स्थानीय सामाजिक कार्यक्रमों में योगदान।",

          achievementEn:
            "Contribution to local social programs."
        },

        {
          id: "rohit",
          nameHi: "रोहित गुप्ता",
          nameEn: "Rohit Gupta",

          designationHi: "चार्टर्ड अकाउंटेंट",
          designationEn: "Chartered Accountant",

          generation: "parent",

          achievementHi:
            "वित्तीय क्षेत्र में पेशेवर उपलब्धियां।",

          achievementEn:
            "Professional achievements in finance."
        },

        {
          id: "riya",
          nameHi: "रिया गुप्ता",
          nameEn: "Riya Gupta",

          designationHi: "विद्यार्थी",
          designationEn: "Student",

          generation: "child",

          achievementHi:
            "शैक्षणिक और सांस्कृतिक गतिविधियों में भागीदारी।",

          achievementEn:
            "Participation in academic and cultural activities."
        }

      ]
    }

  };


  let selectedFamily = null;
  let selectedMember = null;


  /* =========================
     FAMILY PAGE
  ========================= */

  window.openFamily = function (familyId) {

    const family = families[familyId];

    if (!family) return;

    selectedFamily = family;

    renderFamily();

    window.showPage("family-detail");

  };


  function renderFamily() {

    if (!selectedFamily) return;

    const title =
      document.getElementById(
        "family-detail-title"
      );

    const description =
      document.getElementById(
        "family-detail-description"
      );

    if (title) {

      title.textContent =
        currentLanguage === "hi"
          ? selectedFamily.nameHi
          : selectedFamily.nameEn;

    }

    if (description) {

      description.textContent =
        currentLanguage === "hi"
          ? selectedFamily.descriptionHi
          : selectedFamily.descriptionEn;

    }

    renderMembers();

  }


  /* =========================
     FAMILY TREE
  ========================= */

  function renderMembers() {

    const container =
      document.getElementById(
        "family-tree-members"
      );

    if (!container || !selectedFamily)
      return;

    container.innerHTML = "";

    const generations = [
      "grandparent",
      "parent",
      "child"
    ];

    generations.forEach(function (generation) {

      const members =
        selectedFamily.members.filter(
          function (member) {
            return member.generation === generation;
          }
        );

      if (!members.length) return;

      const row =
        document.createElement("div");

      row.className = "tree-generation";

      members.forEach(function (member) {

        const card =
          document.createElement("div");

        card.className = "member-card";

        const name =
          currentLanguage === "hi"
            ? member.nameHi
            : member.nameEn;

        const designation =
          currentLanguage === "hi"
            ? member.designationHi
            : member.designationEn;

        card.innerHTML = `
          <div class="member-photo"></div>
          <h3>${name}</h3>
          <span>${designation}</span>
        `;

        card.addEventListener("click", function () {
          openMember(member.id);
        });

        row.appendChild(card);

      });

      container.appendChild(row);

      if (generation !== "child") {

        const connector =
          document.createElement("div");

        connector.className = "tree-connector";

        container.appendChild(connector);

      }

    });

  }


  /* =========================
     MEMBER PROFILE
  ========================= */

  window.openMember = function (memberId) {

    if (!selectedFamily) return;

    const member =
      selectedFamily.members.find(
        function (item) {
          return item.id === memberId;
        }
      );

    if (!member) return;

    selectedMember = member;

    renderMember();

    window.showPage("member-profile");

  };


  function renderMember() {

    if (!selectedMember) return;

    const name =
      currentLanguage === "hi"
        ? selectedMember.nameHi
        : selectedMember.nameEn;

    const designation =
      currentLanguage === "hi"
        ? selectedMember.designationHi
        : selectedMember.designationEn;

    const achievement =
      currentLanguage === "hi"
        ? selectedMember.achievementHi
        : selectedMember.achievementEn;

    const profileName =
      document.getElementById("profile-name");

    const profileDesignation =
      document.getElementById(
        "profile-designation"
      );

    const profileAchievement =
      document.getElementById(
        "profile-achievement"
      );

    if (profileName)
      profileName.textContent = name;

    if (profileDesignation)
      profileDesignation.textContent =
        designation;

    if (profileAchievement)
      profileAchievement.textContent =
        achievement;

  }


  /* =========================
     EVENTS
  ========================= */

  const events = [

    {
      id: 1,
      category: "celebration",

      titleHi: "शर्मा परिवार विवाह समारोह",
      titleEn: "Sharma Family Wedding",

      date: "15 December 2026",

      locationHi: "इंदौर",
      locationEn: "Indore",

      descriptionHi:
        "परिवार के सभी सदस्यों के साथ एक विशेष विवाह समारोह।",

      descriptionEn:
        "A special wedding celebration with the entire family.",

      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85"
    },

    {
      id: 2,
      category: "travel",

      titleHi: "परिवार यात्रा",
      titleEn: "Family Trip",

      date: "20 January 2027",

      locationHi: "गोवा",
      locationEn: "Goa",

      descriptionHi:
        "परिवार के साथ यादगार छुट्टियां।",

      descriptionEn:
        "A memorable vacation with the family.",

      image:
        "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85"
    },

    {
      id: 3,
      category: "festival",

      titleHi: "दीपावली मिलन",
      titleEn: "Diwali Family Gathering",

      date: "8 November 2026",

      locationHi: "परिवार निवास",
      locationEn: "Family Residence",

      descriptionHi:
        "दीपावली के अवसर पर परिवार का विशेष मिलन।",

      descriptionEn:
        "A special family gathering for Diwali.",

      image:
        "https://images.unsplash.com/photo-1604608672516-f1b9d0a3f5ef?auto=format&fit=crop&w=1200&q=85"
    },

    {
      id: 4,
      category: "birthday",

      titleHi: "दादाजी का जन्मदिन",
      titleEn: "Grandfather's Birthday",

      date: "5 March 2027",

      locationHi: "भोपाल",
      locationEn: "Bhopal",

      descriptionHi:
        "परिवार के वरिष्ठ सदस्य का विशेष जन्मदिन समारोह।",

      descriptionEn:
        "A special birthday celebration for a senior family member.",

      image:
        "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1200&q=85"
    }

  ];


  window.openEvent = function (eventId) {

    const event =
      events.find(function (item) {
        return item.id === eventId;
      });

    if (!event) return;

    const title =
      currentLanguage === "hi"
        ? event.titleHi
        : event.titleEn;

    const location =
      currentLanguage === "hi"
        ? event.locationHi
        : event.locationEn;

    const description =
      currentLanguage === "hi"
        ? event.descriptionHi
        : event.descriptionEn;

    const titleElement =
      document.getElementById(
        "event-detail-title"
      );

    const locationElement =
      document.getElementById(
        "event-detail-location"
      );

    const descriptionElement =
      document.getElementById(
        "event-detail-description"
      );

    const imageElement =
      document.getElementById(
        "event-detail-image"
      );

    if (titleElement)
      titleElement.textContent = title;

    if (locationElement)
      locationElement.textContent =
        `${event.date} • ${location}`;

    if (descriptionElement)
      descriptionElement.textContent =
        description;

    if (imageElement)
      imageElement.style.backgroundImage =
        `url("${event.image}")`;

    window.showPage("event-detail");

  };


  /* =========================
     EVENT FILTERS
  ========================= */

  document.querySelectorAll(".filter-btn")
    .forEach(function (button) {

      button.addEventListener("click", function () {

        document.querySelectorAll(".filter-btn")
          .forEach(function (btn) {
            btn.classList.remove("active-filter");
          });

        button.classList.add("active-filter");

        const category =
          button.dataset.category;

        document.querySelectorAll(
          ".large-event-card"
        ).forEach(function (card) {

          if (
            category === "all" ||
            card.dataset.category === category
          ) {

            card.style.display = "block";

          } else {

            card.style.display = "none";

          }

        });

      });

    });


  /* =========================
     BACK BUTTONS
  ========================= */

  document.querySelectorAll("[data-back]")
    .forEach(function (button) {

      button.addEventListener("click", function () {

        const page =
          button.getAttribute("data-back");

        window.showPage(page);

      });

    });


  /* =========================
     SEARCH
  ========================= */

  const searchInput =
    document.getElementById("search-input");

  const searchResults =
    document.getElementById("search-results");

  if (searchInput && searchResults) {

    searchInput.addEventListener(
      "input",
      function () {

        const query =
          searchInput.value
            .trim()
            .toLowerCase();

        searchResults.innerHTML = "";

        if (!query) return;

        const results = [];

        Object.values(families).forEach(
          function (family) {

            family.members.forEach(
              function (member) {

                const searchable =
                  (
                    member.nameHi +
                    " " +
                    member.nameEn +
                    " " +
                    member.designationHi +
                    " " +
                    member.designationEn
                  ).toLowerCase();

                if (searchable.includes(query)) {

                  results.push({
                    family: family,
                    member: member
                  });

                }

              }
            );

          }
        );

        if (!results.length) {

          searchResults.innerHTML =
            "<p style='color:#77736b'>कोई सदस्य नहीं मिला।</p>";

          return;

        }

        results.forEach(function (result) {

          const member = result.member;

          const card =
            document.createElement("div");

          card.className = "search-result";

          const name =
            currentLanguage === "hi"
              ? member.nameHi
              : member.nameEn;

          const designation =
            currentLanguage === "hi"
              ? member.designationHi
              : member.designationEn;

          card.innerHTML = `
            <div class="search-result-avatar">👤</div>
            <div>
              <h3>${name}</h3>
              <p>${designation}</p>
            </div>
            <button type="button">→</button>
          `;

          card.querySelector("button")
            .addEventListener("click", function () {

              selectedFamily = result.family;
              selectedMember = member;

              renderMember();

              window.showPage("member-profile");

            });

          searchResults.appendChild(card);

        });

      }
    );

  }


  /* =========================
     LOGIN DEMO
  ========================= */

  const loginForm =
    document.getElementById(
      "family-login-form"
    );

  if (loginForm) {

    loginForm.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();

        const username =
          document.getElementById(
            "login-username"
          ).value.trim();

        const password =
          document.getElementById(
            "login-password"
          ).value.trim();

        if (
          username === "family" &&
          password === "1234"
        ) {

          window.showPage(
            "family-dashboard"
          );

        } else {

          alert(
            "डेमो लॉगिन के लिए Username: family और Password: 1234 इस्तेमाल करें।"
          );

        }

      }
    );

  }


  /* =========================
     LOGOUT
  ========================= */

  const logout =
    document.getElementById(
      "logout-button"
    );

  if (logout) {

    logout.addEventListener(
      "click",
      function () {

        window.showPage("home");

      }
    );

  }


  /* =========================
     START WEBSITE
  ========================= */

  updateLanguage("hi");

  window.showPage("home");

});
