document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     GHAR PARIVAR — FAMILY SYSTEM
     ===================================================== */

  const pages = document.querySelectorAll(".page");

  let selectedFamily = null;
  let selectedMember = null;
  let currentLanguage = "hi";


  /* =====================================================
     PAGE NAVIGATION
     ===================================================== */

  window.showPage = function (pageId) {

    pages.forEach(page => {
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
  };


  document.querySelectorAll("[data-page]").forEach(element => {

    element.addEventListener("click", event => {

      event.preventDefault();

      const page = element.dataset.page;

      if (page) {
        window.showPage(page);
      }

    });

  });


  /* =====================================================
     MOBILE MENU
     ===================================================== */

  const menuButton =
    document.querySelector(".mobile-menu-btn");

  const mobileMenu =
    document.querySelector(".mobile-menu");

  if (menuButton && mobileMenu) {

    menuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });

  }


  /* =====================================================
     LANGUAGE
     ===================================================== */

  function updateLanguage(language) {

    currentLanguage = language;

    document.querySelectorAll("[data-hi]").forEach(element => {

      const hindi = element.dataset.hi;
      const english = element.dataset.en;

      element.textContent =
        language === "hi" ? hindi : english;

    });

    document.querySelectorAll(
      ".language-switcher button"
    ).forEach(button => {

      button.classList.toggle(
        "active",
        button.dataset.language === language
      );

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
  ).forEach(button => {

    button.addEventListener("click", () => {
      updateLanguage(button.dataset.language);
    });

  });


  /* =====================================================
     SLIDESHOW
     ===================================================== */

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

    slides.forEach(slide => {
      slide.classList.remove("active-slide");
    });

    dots.forEach(dot => {
      dot.classList.remove("active-dot");
    });

    slides[slideIndex]
      ?.classList.add("active-slide");

    dots[slideIndex]
      ?.classList.add("active-dot");
  }


  previous?.addEventListener("click", () => {
    showSlide(slideIndex - 1);
  });

  next?.addEventListener("click", () => {
    showSlide(slideIndex + 1);
  });


  dots.forEach((dot, index) => {

    dot.addEventListener("click", () => {
      showSlide(index);
    });

  });


  showSlide(0);

  if (slides.length > 1) {

    setInterval(() => {
      showSlide(slideIndex + 1);
    }, 5000);

  }


  /* =====================================================
     FAMILY DATA
     ===================================================== */

  const families = {

    family1: {

      nameHi: "शर्मा परिवार",
      nameEn: "Sharma Family",

      descriptionHi:
        "एक स्नेही और एकजुट परिवार।",

      descriptionEn:
        "A loving and close-knit family.",

      members: [

        {
          id: "rajendra",

          nameHi: "श्री राजेंद्र शर्मा",
          nameEn: "Mr. Rajendra Sharma",

          designationHi: "दादाजी • परिवार के वरिष्ठ सदस्य",
          designationEn: "Grandfather • Senior Family Member",

          generation: "grandparent",

          photo: "grandfather-photo",

          relationHi: "परिवार के वरिष्ठ सदस्य",
          relationEn: "Senior member of the family",

          biographyHi:
            "राजेंद्र शर्मा परिवार के मार्गदर्शक और वरिष्ठ सदस्य हैं। उन्होंने अपना जीवन परिवार और समाज की सेवा में समर्पित किया है।",

          biographyEn:
            "Rajendra Sharma is the guiding senior member of the family. He has devoted his life to his family and community.",

          achievementsHi: [
            "समाज सेवा में 30 वर्षों का योगदान",
            "परिवार के लिए निरंतर मार्गदर्शन",
            "सामुदायिक कार्यक्रमों में सक्रिय भूमिका"
          ],

          achievementsEn: [
            "30 years of contribution to social service",
            "Continuous guidance to the family",
            "Active role in community programs"
          ]

        },


        {
          id: "sunita",

          nameHi: "श्रीमती सुनीता शर्मा",
          nameEn: "Mrs. Sunita Sharma",

          designationHi: "दादीजी • परिवार की वरिष्ठ सदस्य",
          designationEn: "Grandmother • Senior Family Member",

          generation: "grandparent",

          photo: "grandmother-photo",

          relationHi: "परिवार की वरिष्ठ सदस्य",
          relationEn: "Senior member of the family",

          biographyHi:
            "सुनीता शर्मा परिवार की स्नेही और मार्गदर्शक वरिष्ठ सदस्य हैं।",

          biographyEn:
            "Sunita Sharma is a loving and guiding senior member of the family.",

          achievementsHi: [
            "परिवार को एकजुट रखने में महत्वपूर्ण भूमिका",
            "सामाजिक गतिविधियों में योगदान",
            "परिवार की परंपराओं को आगे बढ़ाना"
          ],

          achievementsEn: [
            "Important role in keeping the family connected",
            "Contribution to social activities",
            "Preserving family traditions"
          ]

        },


        {
          id: "amit",

          nameHi: "श्री अमित शर्मा",
          nameEn: "Mr. Amit Sharma",

          designationHi: "पिताजी • व्यवसायी",
          designationEn: "Father • Business Professional",

          generation: "parent",

          photo: "father-photo",

          relationHi: "राजेंद्र और सुनीता शर्मा के पुत्र",
          relationEn: "Son of Rajendra and Sunita Sharma",

          biographyHi:
            "अमित शर्मा परिवार की अगली पीढ़ी का प्रतिनिधित्व करते हैं और व्यवसाय के क्षेत्र में कार्यरत हैं।",

          biographyEn:
            "Amit Sharma represents the next generation of the family and works in the business sector.",

          achievementsHi: [
            "सफल व्यवसाय का संचालन",
            "सामाजिक कार्यों में योगदान",
            "युवा पीढ़ी को मार्गदर्शन"
          ],

          achievementsEn: [
            "Runs a successful business",
            "Contribution to social initiatives",
            "Guidance to the younger generation"
          ]

        },


        {
          id: "neha",

          nameHi: "श्रीमती नेहा शर्मा",
          nameEn: "Mrs. Neha Sharma",

          designationHi: "माताजी • शिक्षिका",
          designationEn: "Mother • Teacher",

          generation: "parent",

          photo: "mother-photo",

          relationHi: "अमित शर्मा की जीवनसाथी",
          relationEn: "Spouse of Amit Sharma",

          biographyHi:
            "नेहा शर्मा शिक्षा के क्षेत्र में कार्यरत हैं और परिवार में शिक्षा एवं संस्कारों को महत्व देती हैं।",

          biographyEn:
            "Neha Sharma works in education and values learning and family traditions.",

          achievementsHi: [
            "शिक्षा के क्षेत्र में योगदान",
            "विद्यार्थियों का मार्गदर्शन",
            "परिवार में शिक्षा को प्रोत्साहन"
          ],

          achievementsEn: [
            "Contribution to education",
            "Guidance to students",
            "Encouraging education within the family"
          ]

        },


        {
          id: "aarav",

          nameHi: "आरव शर्मा",
          nameEn: "Aarav Sharma",

          designationHi: "पुत्र • विद्यार्थी",
          designationEn: "Son • Student",

          generation: "child",

          photo: "child-one-photo",

          relationHi: "अमित और नेहा शर्मा के पुत्र",
          relationEn: "Son of Amit and Neha Sharma",

          biographyHi:
            "आरव परिवार की युवा पीढ़ी का हिस्सा हैं और शिक्षा तथा रचनात्मक गतिविधियों में रुचि रखते हैं।",

          biographyEn:
            "Aarav is part of the younger generation and is interested in education and creative activities.",

          achievementsHi: [
            "विद्यालय प्रतियोगिताओं में भागीदारी",
            "रचनात्मक गतिविधियों में रुचि",
            "शैक्षणिक उपलब्धियां"
          ],

          achievementsEn: [
            "Participation in school competitions",
            "Interest in creative activities",
            "Academic achievements"
          ]

        },


        {
          id: "anaya",

          nameHi: "अनाया शर्मा",
          nameEn: "Anaya Sharma",

          designationHi: "पुत्री • विद्यार्थी",
          designationEn: "Daughter • Student",

          generation: "child",

          photo: "child-two-photo",

          relationHi: "अमित और नेहा शर्मा की पुत्री",
          relationEn: "Daughter of Amit and Neha Sharma",

          biographyHi:
            "अनाया कला, रचनात्मकता और सीखने में रुचि रखने वाली परिवार की युवा सदस्य हैं।",

          biographyEn:
            "Anaya is a young family member interested in art, creativity and learning.",

          achievementsHi: [
            "कला प्रतियोगिताओं में भागीदारी",
            "रचनात्मक गतिविधियों में रुचि",
            "विद्यालय कार्यक्रमों में सहभागिता"
          ],

          achievementsEn: [
            "Participation in art competitions",
            "Interest in creative activities",
            "Participation in school programs"
          ]

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

          designationHi: "दादाजी • सेवानिवृत्त अधिकारी",
          designationEn: "Grandfather • Retired Officer",

          generation: "grandparent",

          photo: "grandfather-photo",

          relationHi: "परिवार के वरिष्ठ सदस्य",
          relationEn: "Senior family member",

          biographyHi:
            "मोहन वर्मा सार्वजनिक सेवा में लंबे अनुभव वाले परिवार के वरिष्ठ सदस्य हैं।",

          biographyEn:
            "Mohan Verma is a senior family member with extensive experience in public service.",

          achievementsHi: [
            "सार्वजनिक सेवा में दीर्घ अनुभव",
            "परिवार का मार्गदर्शन",
            "सामुदायिक योगदान"
          ],

          achievementsEn: [
            "Extensive public service experience",
            "Family guidance",
            "Community contribution"
          ]

        },

        {
          id: "rahul",

          nameHi: "राहुल वर्मा",
          nameEn: "Rahul Verma",

          designationHi: "पुत्र • इंजीनियर",
          designationEn: "Son • Engineer",

          generation: "parent",

          photo: "father-photo",

          relationHi: "मोहन वर्मा के पुत्र",
          relationEn: "Son of Mohan Verma",

          biographyHi:
            "राहुल तकनीकी क्षेत्र में कार्यरत हैं।",

          biographyEn:
            "Rahul works in the technology sector.",

          achievementsHi: [
            "तकनीकी क्षेत्र में उत्कृष्ट कार्य",
            "नई तकनीकों में रुचि",
            "व्यावसायिक उपलब्धियां"
          ],

          achievementsEn: [
            "Excellent work in technology",
            "Interest in new technologies",
            "Professional achievements"
          ]

        },

        {
          id: "vivaan",

          nameHi: "विवान वर्मा",
          nameEn: "Vivaan Verma",

          designationHi: "पुत्र • विद्यार्थी",
          designationEn: "Son • Student",

          generation: "child",

          photo: "child-one-photo",

          relationHi: "राहुल वर्मा के पुत्र",
          relationEn: "Son of Rahul Verma",

          biographyHi:
            "विवान खेल और शिक्षा में रुचि रखते हैं।",

          biographyEn:
            "Vivaan is interested in sports and education.",

          achievementsHi: [
            "खेल प्रतियोगिताओं में उपलब्धियां",
            "विद्यालय गतिविधियों में भागीदारी"
          ],

          achievementsEn: [
            "Achievements in sports",
            "Participation in school activities"
          ]

        }

      ]

    },


    family3: {

      nameHi: "गुप्ता परिवार",
      nameEn: "Gupta Family",

      descriptionHi:
        "शिक्षा, संस्कृति और सेवा को महत्व देने वाला परिवार।",

      descriptionEn:
        "A family that values education, culture and service.",

      members: [

        {
          id: "suresh",

          nameHi: "श्री सुरेश गुप्ता",
          nameEn: "Mr. Suresh Gupta",

          designationHi: "दादाजी • व्यवसायी",
          designationEn: "Grandfather • Business Owner",

          generation: "grandparent",

          photo: "grandfather-photo",

          relationHi: "परिवार के वरिष्ठ सदस्य",
          relationEn: "Senior family member",

          biographyHi:
            "सुरेश गुप्ता व्यवसाय और सामाजिक सेवा में योगदान देने वाले परिवार के वरिष्ठ सदस्य हैं।",

          biographyEn:
            "Suresh Gupta is a senior family member who contributes to business and social service.",

          achievementsHi: [
            "व्यवसाय में अनुभव",
            "सामाजिक सेवा में योगदान",
            "परिवार का मार्गदर्शन"
          ],

          achievementsEn: [
            "Business experience",
            "Contribution to social service",
            "Family guidance"
          ]

        },

        {
          id: "rohit",

          nameHi: "रोहित गुप्ता",
          nameEn: "Rohit Gupta",

          designationHi: "पुत्र • चार्टर्ड अकाउंटेंट",
          designationEn: "Son • Chartered Accountant",

          generation: "parent",

          photo: "father-photo",

          relationHi: "सुरेश गुप्ता के पुत्र",
          relationEn: "Son of Suresh Gupta",

          biographyHi:
            "रोहित वित्तीय क्षेत्र में कार्यरत हैं।",

          biographyEn:
            "Rohit works in the financial sector.",

          achievementsHi: [
            "वित्तीय क्षेत्र में पेशेवर उपलब्धियां",
            "परिवार के व्यवसाय में योगदान"
          ],

          achievementsEn: [
            "Professional achievements in finance",
            "Contribution to the family business"
          ]

        },

        {
          id: "riya",

          nameHi: "रिया गुप्ता",
          nameEn: "Riya Gupta",

          designationHi: "पुत्री • विद्यार्थी",
          designationEn: "Daughter • Student",

          generation: "child",

          photo: "child-two-photo",

          relationHi: "रोहित गुप्ता की पुत्री",
          relationEn: "Daughter of Rohit Gupta",

          biographyHi:
            "रिया शिक्षा और सांस्कृतिक गतिविधियों में रुचि रखती हैं।",

          biographyEn:
            "Riya is interested in education and cultural activities.",

          achievementsHi: [
            "शैक्षणिक उपलब्धियां",
            "सांस्कृतिक कार्यक्रमों में भागीदारी"
          ],

          achievementsEn: [
            "Academic achievements",
            "Participation in cultural programs"
          ]

        }

      ]

    }

  };


  /* =====================================================
     OPEN FAMILY
     ===================================================== */

  window.openFamily = function (familyId) {

    selectedFamily = families[familyId];

    if (!selectedFamily) return;

    renderFamily();

    window.showPage("family-detail");
  };


  /* =====================================================
     RENDER FAMILY
     ===================================================== */

  function renderFamily() {

    if (!selectedFamily) return;

    const title =
      document.getElementById("family-detail-title");

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

    renderTree();

  }


  /* =====================================================
     RENDER FAMILY TREE
     ===================================================== */

  function renderTree() {

    const container =
      document.getElementById(
        "family-tree-members"
      );

    if (!container || !selectedFamily) return;

    container.innerHTML = "";

    const generations = [
      "grandparent",
      "parent",
      "child"
    ];

    generations.forEach((generation, index) => {

      const members =
        selectedFamily.members.filter(
          member =>
            member.generation === generation
        );

      if (!members.length) return;

      const row =
        document.createElement("div");

      row.className =
        "tree-generation";

      members.forEach(member => {

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
          <div class="member-photo ${member.photo}"></div>

          <h3>${name}</h3>

          <span>${designation}</span>

          <div style="
            margin-top:12px;
            color:#8a5a32;
            font-size:12px;
            font-weight:800;
          ">
            ${currentLanguage === "hi"
              ? "प्रोफ़ाइल देखें →"
              : "View Profile →"}
          </div>
        `;

        card.addEventListener("click", () => {

          selectedMember = member;

          renderMember();

          window.showPage("member-profile");

        });

        row.appendChild(card);

      });

      container.appendChild(row);

      if (index < generations.length - 1) {

        const connector =
          document.createElement("div");

        connector.className =
          "tree-connector";

        container.appendChild(connector);

      }

    });

  }


  /* =====================================================
     MEMBER PROFILE
     ===================================================== */

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

    const biography =
      currentLanguage === "hi"
        ? selectedMember.biographyHi
        : selectedMember.biographyEn;

    const relation =
      currentLanguage === "hi"
        ? selectedMember.relationHi
        : selectedMember.relationEn;

    const achievements =
      currentLanguage === "hi"
        ? selectedMember.achievementsHi
        : selectedMember.achievementsEn;


    const nameElement =
      document.getElementById("profile-name");

    const designationElement =
      document.getElementById(
        "profile-designation"
      );

    const biographyElement =
      document.getElementById(
        "profile-biography"
      );

    const achievementElement =
      document.getElementById(
        "profile-achievement"
      );

    const relationElement =
      document.getElementById(
        "profile-relation"
      );


    if (nameElement)
      nameElement.textContent = name;

    if (designationElement)
      designationElement.textContent =
        designation;

    if (biographyElement)
      biographyElement.textContent =
        biography;

    if (relationElement)
      relationElement.textContent =
        relation;


    if (achievementElement) {

      achievementElement.innerHTML = "";

      achievements.forEach(achievement => {

        const item =
          document.createElement("div");

        item.className =
          "achievement-card";

        item.innerHTML = `
          <span>🏆</span>
          <p>${achievement}</p>
        `;

        achievementElement.appendChild(item);

      });

    }

  }


  /* =====================================================
     BACK BUTTONS
     ===================================================== */

  document.querySelectorAll("[data-back]")
    .forEach(button => {

      button.addEventListener("click", () => {

        const destination =
          button.dataset.back;

        window.showPage(destination);

      });

    });


  /* =====================================================
     START
     ===================================================== */

  updateLanguage("hi");

  window.showPage("home");

});
/* =====================================================
   GHAR PARIVAR — REAL BACKEND LOGIN
   ===================================================== */

const API_URL = "https://ghar-parivar-backend.onrender.com";


async function gharParivarLogin(username, password) {

  try {

    const response = await fetch(
      `${API_URL}/login`,
      {
        method: "POST",

        credentials: "include",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          username: username,
          password: password
        })
      }
    );


    const data = await response.json();


    if (!response.ok) {

      throw new Error(
        data.detail || "Login failed"
      );

    }


    localStorage.setItem(
      "gp_role",
      data.role
    );

    localStorage.setItem(
      "gp_family",
      data.family_id || ""
    );


    return data;

  } catch (error) {

    console.error(
      "Ghar Parivar login error:",
      error
    );

    throw error;

  }

}


/* =====================================================
   LOGIN FORM
   ===================================================== */

const loginForm =
  document.querySelector(".login-card form");


if (loginForm) {

  loginForm.addEventListener(
    "submit",
    async function(event) {

      event.preventDefault();


      const usernameInput =
        loginForm.querySelector(
          'input[name="username"], input[type="text"]'
        );


      const passwordInput =
        loginForm.querySelector(
          'input[name="password"], input[type="password"]'
        );


      if (!usernameInput || !passwordInput) {

        alert(
          "Login form fields could not be found."
        );

        return;

      }


      const username =
        usernameInput.value.trim();

      const password =
        passwordInput.value;


      if (!username || !password) {

        alert(
          "Please enter username and password."
        );

        return;

      }


      const button =
        loginForm.querySelector(
          'button[type="submit"]'
        );


      if (button) {

        button.disabled = true;

        button.textContent =
          "Logging in...";

      }


      try {

        const result =
          await gharParivarLogin(
            username,
            password
          );


        if (result.role === "admin") {

          window.showPage(
            "admin-dashboard"
          );

        } else {

          window.showPage(
            "member-dashboard"
          );

        }


      } catch (error) {

        alert(
          error.message ||
          "Invalid username or password."
        );


      } finally {

        if (button) {

          button.disabled = false;

          button.textContent =
            "Login";

        }

      }

    }
  );

}


/* =====================================================
   LOGOUT
   ===================================================== */

async function gharParivarLogout() {

  try {

    await fetch(
      `${API_URL}/logout`,
      {
        method: "POST",
        credentials: "include"
      }
    );

  } catch (error) {

    console.error(
      "Logout error:",
      error
    );

  }


  localStorage.removeItem(
    "gp_role"
  );

  localStorage.removeItem(
    "gp_family"
  );


  window.showPage("home");

}


window.gharParivarLogout =
  gharParivarLogout;
