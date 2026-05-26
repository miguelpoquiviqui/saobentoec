/* ---- Preloader ---- */
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.classList.add("hide");
    setTimeout(() => { preloader.style.display = "none"; }, 800);
  }, 3200);
});

// MENU MOBILE
const menu = document.getElementById("menu-mobile");
const nav = document.getElementById("nav");
menu.addEventListener("click", () => { nav.classList.toggle("active"); });

// HEADER SCROLL
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  header.classList.toggle("scrolled", window.scrollY > 50);
});

// LIGHTBOX
document.querySelectorAll(".gallery-item").forEach(item => {
  item.addEventListener("click", () => {
    document.getElementById("lightbox").style.display = "flex";
    document.getElementById("lightbox-img").src = item.src;
  });
});
document.querySelector(".close-lightbox").addEventListener("click", () => {
  document.getElementById("lightbox").style.display = "none";
});
document.getElementById("lightbox").addEventListener("click", (e) => {
  if (e.target !== document.getElementById("lightbox-img"))
    document.getElementById("lightbox").style.display = "none";
});

// FORM WHATSAPP
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const name    = document.getElementById("name").value.trim();
  const number  = document.getElementById("number").value.trim();
  const email   = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();
  if (name.split(" ").length < 2) { alert("Digite seu nome e sobrenome!"); return; }
  if (number.replace(/\D/g,"").length !== 11) { alert("Digite um número válido com DDD!"); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert("Digite um e-mail válido!"); return; }
  if (message.length < 10) { alert("A mensagem deve ter no mínimo 10 caracteres!"); return; }
  const text = `Olá, meu nome é: ${name}, ${message}\n\nOutras informações:\nTelefone: ${number}\nE-mail: ${email}`;
  alert("Você está sendo redirecionado para o WhatsApp! Clique em 'OK'");
  window.open(`https://wa.me/+5531982579306?text=${encodeURIComponent(text)}`, "_blank");
  e.target.reset();
});

// ANIMAÇÃO MINI-CARDS (IntersectionObserver)
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
}, { threshold: 0.3 });

document.querySelectorAll(".mini-card").forEach(card => cardObserver.observe(card));

// =====================
//     CHATBOT
// =====================
const WHATSAPP_NUMBER = "+5531982579306";

const FAQ = [
  {
    keys: ["próximo jogo","proximo jogo","quando joga","quando é o jogo"],
    answer: "🗓️ Ainda não temos informações sobre o próximo jogo do São Bento EC. Fique ligado nos campeonatos e nas nossas redes sociais para novidades! ⚽"
  },

  {
    keys: ["camisa","camisa torcida","uniforme","comprar camisa","camiseta"],
    answer: "👕 Quer adquirir a camisa versão torcedor do São Bento EC? Entre em contato conosco pelo WhatsApp para mais informações sobre disponibilidade e valores!"
  },

  {
    keys: ["patrocínio","patrocinio","patrocinador","patroc","empresa"],
    answer: "💼 Quer patrocinar o São Bento EC? Clique no botão <strong>'Seja Patrocinador'</strong> no menu ou fale diretamente conosco pelo WhatsApp. Temos ótimas opções de visibilidade!"
  },

  {
    keys: ["título","titulos","títulos","campeonato","conquistas","venceu"],
    answer: "🏆 O São Bento EC tem uma história vitoriosa! Confira a seção <strong>'Campeonatos Conquistados'</strong> na página para ver todos os nossos títulos. Orgulho da torcida! 🥇"
  },

  {
    keys: ["contato","telefone","email","e-mail","endereço","endereco","onde fica"],
    answer: "📞 Fale conosco:<br>• <strong>Tel:</strong> 31 98257-9306<br>• <strong>E-mail:</strong> miguelpoquiviqui00@gmail.com<br>• <strong>Local:</strong> Contagem - MG"
  },

  {
    keys: ["olá","ola","oi","bom dia","boa tarde","boa noite","hey"],
    answer: "👋 Olá! Bem-vindo ao São Bento EC! Como posso te ajudar hoje? Use os botões abaixo ou escreva sua pergunta!"
  },

  {
    keys: ["galeria","foto","fotos"],
    answer: "📸 Confira nossas fotos na seção <strong>Galeria</strong> aqui no site! Em breve teremos mais conteúdo no Instagram também. 🤙"
  },
];

let chatOpen = false;

function toggleChat() {
  chatOpen = !chatOpen;
  const win = document.getElementById("chat-window");
  const badge = document.querySelector("#chat-btn .badge");
  if (chatOpen) {
    win.classList.add("open");
    if (badge) badge.style.display = "none";
    if (document.getElementById("chat-messages").children.length === 0) {
      setTimeout(() => addBotMsg("👋 Olá! Sou o assistente do <strong>São Bento EC</strong>. Escolha uma opção abaixo ou escreva sua dúvida — se eu não souber, te conecto direto com a nossa equipe! ⚽"), 300);
    }
  } else {
    win.classList.remove("open");
  }
}

function addBotMsg(text) {
  const div = document.createElement("div");
  div.className = "msg bot";
  div.innerHTML = text;
  document.getElementById("chat-messages").appendChild(div);
  scrollChat();
}

function addUserMsg(text) {
  const div = document.createElement("div");
  div.className = "msg user";
  div.textContent = text;
  document.getElementById("chat-messages").appendChild(div);
  scrollChat();
}

function scrollChat() {
  const msgs = document.getElementById("chat-messages");
  msgs.scrollTop = msgs.scrollHeight;
}

function getAnswer(input) {
  const lower = input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
  for (const item of FAQ) {
    for (const key of item.keys) {
      const normKey = key.normalize("NFD").replace(/[\u0300-\u036f]/g,"");
      if (lower.includes(normKey)) return item.answer;
    }
  }
  return null;
}

function sendQuick(topic) {
  addUserMsg(topic);
  const answer = getAnswer(topic);
  setTimeout(() => {
    if (answer) {
      addBotMsg(answer);
    } else {
      fallbackWhatsApp(topic);
    }
  }, 500);
}

function sendMessage() {
  const input = document.getElementById("chat-input");
  const text = input.value.trim();
  if (!text) return;
  input.value = "";
  addUserMsg(text);
  const answer = getAnswer(text);
  setTimeout(() => {
    if (answer) {
      addBotMsg(answer);
    } else {
      fallbackWhatsApp(text);
    }
  }, 600);
}

function fallbackWhatsApp(question) {
  addBotMsg(`🤔 Não encontrei uma resposta exata para: <strong>"${question}"</strong><br><br>Mas nossa equipe pode te ajudar! Clique abaixo para falar diretamente no WhatsApp ⬇️`);
  setTimeout(() => {
    const btn = document.createElement("button");
    btn.className = "qr-btn";
    btn.style.cssText = "background:rgba(37,211,102,.1);border-color:#25d366;color:#25d366;margin:0 16px 12px;width:calc(100% - 32px);padding:10px;";
    btn.innerHTML = "💬 Falar no WhatsApp";
    btn.onclick = () => {
      const msg = `Olá, São Bento EC! Tenho uma dúvida: "${question}"`;
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank");
    };
    document.getElementById("chat-messages").appendChild(btn);
    scrollChat();
  }, 300);
}
