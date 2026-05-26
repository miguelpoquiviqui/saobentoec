/* ---- Preloader ---- */
window.addEventListener("load", () => {

  const preloader = document.getElementById("preloader");

  setTimeout(() => {

      preloader.classList.add("hide");

      setTimeout(() => {

          preloader.style.display = "none";

      }, 800);

  }, 3200);

});

  // MENU MOBILE
  
  const menu = document.getElementById("menu-mobile");
  const nav = document.getElementById("nav");
  
  menu.addEventListener("click", () => {
    nav.classList.toggle("active");
  });
  
  // HEADER SCROLL
  
  window.addEventListener("scroll", () => {
  
    const header = document.getElementById("header");
  
    if(window.scrollY > 50){
      header.classList.add("scrolled");
    }else{
      header.classList.remove("scrolled");
    }
  
  });
  
  // LIGHTBOX
  
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  
  galleryItems.forEach(item => {
  
    item.addEventListener("click", () => {
  
      lightbox.style.display = "flex";
      lightboxImg.src = item.src;
  
    });
  
  });
  
  document.querySelector(".close-lightbox").addEventListener("click", () => {
    lightbox.style.display = "none";
  });
  
  lightbox.addEventListener("click", (e) => {
  
    if(e.target !== lightboxImg){
      lightbox.style.display = "none";
    }
  
  });
  
// FORM WHATSAPP

const form = document.getElementById("contact-form");

form.addEventListener("submit", (e) => {

  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const number = document.getElementById("number").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // ===== NAME VALIDATION =====
  // PRECISA TER NOME E SOBRENOME

  const fullName = name.split(" ");

  if(fullName.length < 2){
    alert("Digite seu nome e sobrenome!");
    return;
  }

  // ===== PHONE VALIDATION =====
  // REMOVE TUDO QUE NÃO FOR NÚMERO

  const phoneClean = number.replace(/\D/g, "");

  if(phoneClean.length !== 11){
    alert("Digite um número válido com DDD!");
    return;
  }

  // ===== EMAIL VALIDATION =====

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if(!emailValid.test(email)){
    alert("Digite um e-mail válido!");
    return;
  }

  // ===== MESSAGE VALIDATION =====

  if(message.length < 10){
    alert("A mensagem deve ter no mínimo 10 caracteres!");
    return;
  }

  // ===== WHATSAPP NUMBER =====

  const phone = "+5531982579306";

  // ===== MESSAGE =====

  const text = 
`Olá,meu nome é: ${name},${message}


Outras informações sobre mim:
meu telefone: ${number},meu email: ${email}.`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;

  // ===== SUCCESS =====

  alert("Você está sendo redmensionado para o Whatsapp! Clique em 'OK'");

  // ===== OPEN WHATSAPP =====

  window.open(url, "_blank");

  // ===== RESET FORM =====

  form.reset();

});
  // BUTTON TOP
  
  const topBtn = document.getElementById("topBtn");
  
  window.addEventListener("scroll", () => {
  
    if(window.scrollY > 300){
      topBtn.style.display = "block";
    }else{
      topBtn.style.display = "none";
    }
  
  });
  
  topBtn.addEventListener("click", () => {
  
    window.scrollTo({
      top:0,
      behavior:"smooth"
    });
  
  });
  
  // ANIMAÇÃO AO ROLAR
  
  const observer = new IntersectionObserver((entries) => {
  
    entries.forEach(entry => {
  
      if(entry.isIntersecting){
        entry.target.classList.add("show");
      }
  
    });
  
  });
  
  document.querySelectorAll(".section").forEach(section => {
    observer.observe(section);
  });

    // carrosel patrocinadores
    const track = document.querySelector('.carousel-track');
const clone = track.innerHTML;
track.innerHTML += clone;