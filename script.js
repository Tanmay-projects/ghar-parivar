/* =========================================================
   GHAR PARIVAR — WEBSITE FUNCTIONALITY
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     PAGE NAVIGATION
     ======================================================= */

  const pages = document.querySelectorAll(".page");

  function showPage(pageId) {
    pages.forEach(page => {
      page.classList.remove("active");
    });

    const target = document.getElementById(pageId);

    if (target) {
      target.classList.add("active");
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

    closeMobileMenu();
  }

  window.showPage = showPage;


  /* =======================================================
     NAVIGATION LINKS
     ======================================================= */

  document.querySelectorAll("[data-page]").forEach(link => {

    link.addEventListener("click", event => {

      event.preventDefault();

      const page = link.getAttribute("data-page");

      showPage(page);

    });

  });


  /* =======================================================
     MOBILE MENU
     ======================================================= */

  const mobileMenuButton =
    document.querySelector(".mobile-menu-btn");

  const mobileMenu =
    document.querySelector(".mobile-menu");

  function closeMobileMenu() {

    if (mobileMenu) {
      mobileMenu.classList.remove("open");
    }

  }

  if (mobileMenuButton) {

    mobileMenuButton.addEventListener("click", () => {

      mobileMenu.classList.toggle("open");

    });

  }


  /* =======================================================
     LANGUAGE SYSTEM
     ======================================================= */

  let currentLanguage = "hi";

  const translations = {

    hi: {

      home: "होम",
      families: "परिवार",
      events: "कार्यक्रम",
      search: "खोजें",

      welcome: "हमारे परिवार में आपका स्वागत है",

      familyTitle: "परिवार",
      familyDescription:
        "हमारे परिवारों की कहानियां, रिश्ते और यादें एक जगह।",

      eventsTitle: "कार्यक्रम",
      eventsDescription:
        "परिवार के खास अवसरों और यादगार पलों को देखें।",

      explore: "देखें",

      login: "परिवार सदस्य लॉगिन",

      achievements: "उपलब्धियां",

      familyTree: "परिवार वृक्ष",

      biography: "परिचय",

      memories: "यादें",

      logout: "लॉग आउट"

    },

    en: {

      home: "Home",
      families: "Families",
      events: "Events",
      search: "Search",

      welcome: "Welcome to Our Family",

      familyTitle: "Families",
      familyDescription:
        "Discover our family stories, relationships and memories in one place.",

      eventsTitle: "Events",
      eventsDescription:
        "Explore special occasions and memorable family moments.",

      explore: "Explore",

      login: "Family Member Login",

      achievements: "Achievements",

      familyTree: "Family Tree",

      biography: "Biography",

      memories: "Memories",

      logout: "Logout"

    }

  };


  function updateLanguage(language) {

    currentLanguage = language;

    document.documentElement.lang =
      language === "hi" ? "hi" : "en";

    document
      .querySelectorAll("[data-hi]")
      .forEach(element => {

        const hindi =
          element.getAttribute("data-hi");

        const english =
          element.getAttribute("data-en");

        element.textContent =
          language === "hi"
            ? hindi
            : english;

      });

    document
      .querySelectorAll(".language-switcher button")
      .forEach(button => {

        button.classList.remove("active");

        if (
          button.dataset.language === language
        ) {

          button.classList.add("active");

        }

      });

  }


  document
    .querySelectorAll(".language-switcher button")
    .forEach(button => {

      button.addEventListener("click", () => {

        updateLanguage(
          button.dataset.language
        );

      });

    });


  /* =======================================================
     HERO SLIDER
     ======================================================= */

  const slides =
    document.querySelectorAll(".slide");

  const dots =
    document.querySelectorAll(".dot");

  let currentSlide = 0;

  function displaySlide(index) {

    if (!slides.length) return;

    currentSlide =
      (index + slides.length) %
      slides.length;

    slides.forEach(slide => {

      slide.classList.remove(
        "active-slide"
      );

    });

    dots.forEach(dot => {

      dot.classList.remove(
        "active-dot"
      );

    });

    slides[currentSlide]
      .classList.add("active-slide");

    if (dots[currentSlide]) {

      dots[currentSlide]
        .classList.add("active-dot");

    }

  }


  const previousButton =
    document.querySelector(".slide-arrow.previous");

  const nextButton =
    document.querySelector(".slide-arrow.next");


  if (previousButton) {

    previousButton.addEventListener(
      "click",
      () => displaySlide(currentSlide - 1)
    );

  }


  if (nextButton) {

    nextButton.addEventListener(
      "click",
      () => displaySlide(currentSlide + 1)
    );

  }


  dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {

      displaySlide(index);

    });

  });


  if (slides.length > 1) {

    setInterval(() => {

      displaySlide(currentSlide + 1);

    }, 6000);

  }


  /* =======================================================
     FAMILY DATA
     ======================================================= */

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
          id: "rajendra-sharma",

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
          id: "sunita-sharma",

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
          id: "amit-sharma",

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
          id: "neha-sharma",

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
          id: "aarav-sharma",

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
          id: "anaya-sharma",

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
          id: "mohan-verma",

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
          id: "kavita-verma",

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
          id: "rahul-verma",

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
          id: "pooja-verma",

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
          id: "vivaan-verma",

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
          id: "suresh-gupta",

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
          id: "meena-gupta",

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
          id: "rohit-gupta",

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
          id: "riya-gupta",

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


  /* =======================================================
     CURRENT FAMILY
     ======================================================= */

  let selectedFamily = null;

  let selectedMember = null;


  /* =======================================================
     OPEN FAMILY
     ======================================================= */

  window.openFamily = function(familyId) {

    selectedFamily =
      families[familyId];

    if (!selectedFamily) return;

    renderFamilyPage();

    showPage("family-detail");

  };


  function renderFamilyPage() {

    const family =
      selectedFamily;

    const title =
      document.getElementById("family-detail-title");

    const description =
      document.getElementById(
        "family-detail-description"
      );

    if (!title || !description) return;

    title.textContent =
      currentLanguage === "hi"
        ? family.nameHi
        : family.nameEn;

    description.textContent =
      currentLanguage === "hi"
        ? family.descriptionHi
        : family.descriptionEn;


    renderMembers(
      family.members
    );

  }


  function renderMembers(members) {

    const container =
      document.getElementById(
        "family-tree-members"
      );

    if (!container) return;

    container.innerHTML = "";

    const generations = [

      "grandparent",
      "parent",
      "child"

    ];


    generations.forEach(
      generation => {

        const membersInGeneration =
          members.filter(
            member =>
              member.generation === generation
          );

        if (!membersInGeneration.length)
          return;


        const generationContainer =
          document.createElement("div");

        generationContainer.className =
          "tree-generation";


        membersInGeneration.forEach(
          member => {

            const card =
              document.createElement("div");

            card.className =
              "member-card";


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


            card.addEventListener(
              "click",
              () => {

                openMember(
                  member.id
                );

              }
            );


            generationContainer.appendChild(
              card
            );

          }
        );


        container.appendChild(
          generationContainer
        );


        if (
          generation !==
          "child"
        ) {

          const connector =
            document.createElement("div");

          connector.className =
            "tree-connector";

          container.appendChild(
            connector
          );

        }

      }
    );

  }


  /* =======================================================
     OPEN MEMBER PROFILE
     ======================================================= */

  window.openMember = function(memberId) {

    if (!selectedFamily)
      return;


    selectedMember =
      selectedFamily.members.find(
        member =>
          member.id === memberId
      );


    if (!selectedMember)
      return;


    renderMemberProfile();

    showPage("member-profile");

  };


  function renderMemberProfile() {

    const member =
      selectedMember;

    const name =
      currentLanguage === "hi"
        ? member.nameHi
        : member.nameEn;

    const designation =
      currentLanguage === "hi"
        ? member.designationHi
        : member.designationEn;

    const achievement =
      currentLanguage === "hi"
        ? member.achievementHi
        : member.achievementEn;


    const profileName =
      document.getElementById(
        "profile-name"
      );

    const profileDesignation =
      document.getElementById(
        "profile-designation"
      );

    const profileAchievement =
      document.getElementById(
        "profile-achievement"
      );


    if (profileName)
      profileName.textContent =
        name;

    if (profileDesignation)
      profileDesignation.textContent =
        designation;

    if (profileAchievement)
      profileAchievement.textContent =
        achievement;

  }


  /* =======================================================
     BACK BUTTONS
     ======================================================= */

  document
    .querySelectorAll("[data-back]")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          const destination =
            button.dataset.back;

          showPage(destination);

        }
      );

    });


  /* =======================================================
     EVENTS
     ======================================================= */

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


  window.openEvent = function(eventId) {

    const event =
      events.find(
        item => item.id === eventId
      );

    if (!event)
      return;


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


    const eventTitle =
      document.getElementById(
        "event-detail-title"
      );

    const eventLocation =
      document.getElementById(
        "event-detail-location"
      );

    const eventDescription =
      document.getElementById(
        "event-detail-description"
      );

    const eventImage =
      document.getElementById(
        "event-detail-image"
      );


    if (eventTitle)
      eventTitle.textContent =
        title;

    if (eventLocation)
      eventLocation.textContent =
        `${event.date} • ${location}`;

    if (eventDescription)
      eventDescription.textContent =
        description;

    if (eventImage)
      eventImage.style.backgroundImage =
        `url("${event.image}")`;


    showPage("event-detail");

  };


  /* =======================================================
     EVENT FILTERS
     ======================================================= */

  document
    .querySelectorAll(".filter-btn")
    .forEach(button => {

      button.addEventListener(
        "click",
        () => {

          document
            .querySelectorAll(
              ".filter-btn"
            )
            .forEach(btn =>
              btn.classList.remove(
                "active-filter"
              )
            );

          button.classList.add(
            "active-filter"
          );


          const category =
            button.dataset.category;

          document
            .querySelectorAll(
              ".large-event-card"
            )
            .forEach(card => {

              if (
                category === "all" ||
                card.dataset.category ===
                  category
              ) {

                card.style.display =
                  "block";

              } else {

                card.style.display =
                  "none";

              }

            });

        }
      );

    });


  /* =======================================================
     SEARCH
     ======================================================= */

  const searchInput =
    document.getElementById(
      "search-input"
    );

  const searchResults =
    document.getElementById(
      "search-results"
    );


  if (searchInput) {

    searchInput.addEventListener(
      "input",
      () => {

        const query =
          searchInput.value
            .trim()
            .toLowerCase();


        if (!query) {

          searchResults.innerHTML = "";

          return;

        }


        const results = [];


        Object.values(families)
          .forEach(family => {

            family.members.forEach(
              member => {

                const name =
                  `${member.nameHi} ${member.nameEn}`
                    .toLowerCase();

                const designation =
                  `${member.designationHi} ${member.designationEn}`
                    .toLowerCase();


                if (
                  name.includes(query) ||
                  designation.includes(query)
                ) {

                  results.push({
                    member,
                    family
                  });

                }

              }
            );

          });


        searchResults.innerHTML = "";


        if (!results.length) {

          searchResults.innerHTML =
            `<p style="color:#77736b">
              No family member found.
            </p>`;

          return;

        }


        results.forEach(result => {

          const member =
            result.member;

          const family =
            result.family;


          const card =
            document.createElement(
              "div"
            );

          card.className =
            "search-result";


          const name =
            currentLanguage === "hi"
              ? member.nameHi
              : member.nameEn;

          const designation =
            currentLanguage === "hi"
              ? member.designationHi
              : member.designationEn;


          card.innerHTML = `

            <div class="search-result-avatar">
              👤
            </div>

            <div>
              <h3>${name}</h3>
              <p>${designation}</p>
            </div>

            <button>→</button>

          `;


          card
            .querySelector("button")
            .addEventListener(
              "click",
              () => {

                selectedFamily =
                  family;

                selectedMember =
                  member;

                renderMemberProfile();

                showPage(
                  "member-profile"
                );

              }
            );


          searchResults.appendChild(
            card
          );

        });

      }
    );


  /* =======================================================
     FAMILY LOGIN
     ======================================================= */

  const loginForm =
    document.getElementById(
      "family-login-form"
    );


  if (loginForm) {

    loginForm.addEventListener(
      "submit",
      event => {

        event.preventDefault();


        const username =
          document.getElementById(
            "login-username"
          ).value.trim();

        const password =
          document.getElementById(
            "login-password"
          ).value.trim();


        /*
          DEMO LOGIN ONLY.

          Real authentication should be
          connected to a secure backend later.
        */

        if (
          username === "family" &&
          password === "1234"
        ) {

          showPage(
            "family-dashboard"
          );

        } else {

          alert(
            currentLanguage === "hi"
              ? "गलत लॉगिन विवरण। डेमो के लिए family / 1234 का उपयोग करें।"
              : "Incorrect login. For the demo use family / 1234."
          );

        }

      }
    );

  }


  /* =======================================================
     LOGOUT
     ======================================================= */

  const logoutButton =
    document.getElementById(
      "logout-button"
    );


  if (logoutButton) {

    logoutButton.addEventListener(
      "click",
      () => {

        showPage("home");

      }
    );

  }


  /* =======================================================
     INITIAL STATE
     ======================================================= */

  updateLanguage("hi");

  showPage("home");

});
