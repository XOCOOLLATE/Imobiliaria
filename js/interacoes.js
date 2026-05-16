const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const propertyList = document.getElementById("propertyList");
const contactForm = document.getElementById("contactForm");

const whatsappNumber = "5551995483061";

const properties = [
  {
    title: "Casa ampla em bairro residencial",
    tipo: "Casa",
    negocio: "Venda",
    cidade: "Guaíba",
    bairro: "Centro",
    quartos: 3,
    banheiros: 2,
    garagem: 2,
    valor: "R$ 690.000",
  },
  {
    title: "Apartamento moderno próximo a serviços",
    tipo: "Apartamento",
    negocio: "Aluguel",
    cidade: "Porto Alegre",
    bairro: "Menino Deus",
    quartos: 2,
    banheiros: 1,
    garagem: 1,
    valor: "R$ 2.800/mês",
  },
  {
    title: "Terreno com excelente potencial",
    tipo: "Terreno",
    negocio: "Venda",
    cidade: "Guaíba",
    bairro: "Santa Rita",
    quartos: 0,
    banheiros: 0,
    garagem: 0,
    valor: "R$ 260.000",
  },
  {
    title: "Sala comercial para locação",
    tipo: "Comercial",
    negocio: "Aluguel",
    cidade: "Porto Alegre",
    bairro: "Centro Histórico",
    quartos: 0,
    banheiros: 1,
    garagem: 0,
    valor: "R$ 1.900/mês",
  },
];

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

function renderProperties(lista) {
  if (!propertyList) return;

  propertyList.innerHTML = "";

  lista.forEach((property) => {
    propertyList.innerHTML += `
      <article class="property-card">
        <div class="property-image">
          <span class="property-badge">${property.negocio}</span>
        </div>

        <div class="property-content">
          <h3>${property.title}</h3>

          <p class="property-location">
            ${property.bairro}, ${property.cidade}
          </p>

          <div class="property-details">
            <span>${property.tipo}</span>
            <span>${property.quartos} quartos</span>
            <span>${property.banheiros} banheiros</span>
            <span>${property.garagem} vagas</span>
          </div>

          <strong class="property-price">${property.valor}</strong>

          <a
            class="property-link"
            href="https://wa.me/${whatsappNumber}"
            target="_blank"
          >
            Falar com corretor
          </a>
        </div>
      </article>
    `;
  });
}

if (propertyList) {
  renderProperties(properties);
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const interesse = document.getElementById("interesse").value;
    const mensagem = document.getElementById("mensagem").value;

    const text = encodeURIComponent(
      `Olá, meu nome é ${nome}.
Telefone: ${telefone}
Tenho interesse em: ${interesse}
Mensagem: ${mensagem}`,
    );

    window.open(`https://wa.me/${whatsappNumber}?text=${text}`, "_blank");
  });
}
