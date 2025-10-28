'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");
 
// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}
 
// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
// modalCloseBtn.addEventListener("click", testimonialsModalFunc);
// overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
// const form = document.querySelector("[data-form]");
// const formInputs = document.querySelectorAll("[data-form-input]");
// const formBtn = document.querySelector("[data-form-btn]");
// const form = document.querySelector("[data-form]");

// const formInputs = document.querySelectorAll("[data-form-input]");

const formBtn = document.querySelector("[data-form-btn]");
const formInputs = document.querySelectorAll("[data-form-input]");


document.querySelector("[data-form]").addEventListener("submit", function(event) {
  event.preventDefault(); 
  const sendersName = document.querySelector("[data-form-input-name]").value;
  const emailAddress = document.querySelector("[data-form-input-email]").value;
  const phoneNumber = document.querySelector("[data-form-input-phone-number]").value;
  const message = document.querySelector("[data-form-input-message]").value;

  const emailData = { sendersName, emailAddress, phoneNumber, message };
  console.log(emailData)
  sendForm(emailData);
});

const apiUrl = 'http://localhost:3010/';
function sendForm(emailData){
  const urlSendInfo = `${apiUrl}receiveForm/receive-form`;
  fetch(urlSendInfo, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(emailData),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}


// add event to all form input field
// for (let i = 0; i < formInputs.length; i++) {
//   formInputs[i].addEventListener("input", function () {

//     // check form validation
//     if (form.checkValidity()) {
//       formBtn.removeAttribute("disabled");
//     } else {
//       formBtn.setAttribute("disabled", "");
//     }

//   });
// }



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const targetPage = this.dataset.target;

    for (let i = 0; i < pages.length; i++) {
      if (pages[i].dataset.page === targetPage) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }
  });
  
}

// document.getElementById('language-switch').addEventListener('change', function () {
//   console.log("execute translate")
//   const lang = this.value;
//   const currentTranslations = translations[lang];

//   Object.keys(currentTranslations).forEach(id => {
//     const el = document.getElementById(id);
//     if (el) el.textContent = currentTranslations[id];
//   });
// });

// Función que traduce según idioma seleccionado
document.getElementById('language-switch').addEventListener('change', function () {
  const lang = this.value;
  translatePage(lang);
});

// Nueva función para aplicar las traducciones
function translatePage(lang) {
  const currentTranslations = translations[lang];

  Object.keys(currentTranslations).forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      // Si es input o textarea, traduce el placeholder
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = currentTranslations[id];
      } else {
        // Si no, traduce el contenido de texto normal
        el.textContent = currentTranslations[id];
      }
    }
  });
}

// 🟢 Cargar idioma por defecto al abrir la página
document.addEventListener('DOMContentLoaded', () => {
  const defaultLang = 'es'; // o 'en', según lo que prefieras
  document.getElementById('language-switch').value = defaultLang;
  translatePage(defaultLang);
});


  const overlaytwo = document.getElementById("overlaytwo");
  const imgAmpliadaTwo = document.getElementById("imgAmpliadaTwo");

  // Selecciona todas las imágenes de certificados
  const imagenesCert = document.querySelectorAll(".lang-cert img");

  imagenesCert.forEach(img => {
    img.addEventListener("click", () => {
      imgAmpliadaTwo.src = img.src;
      overlaytwo.classList.add("active");
      document.body.style.overflow = "hidden"; // bloquea el scroll
    });
  });

  overlaytwo.addEventListener("click", () => {
    overlaytwo.classList.remove("active");
    document.body.style.overflow = ""; // restaura el scroll
  });