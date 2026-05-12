const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const propertyList = document.getElementById("propertyList");
const filterForm = document.getElementById("filterForm");
const contactForm = document.getElementById("contactForm");

const whatsappNumber = "5551995483061";

const properties = [
  {
    titulo: "Casa ampla em bairro residencial",
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
    titulo: "Apartamento moderno próximo a serviços",
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
    titulo: "Terreno com excelente potencial",
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
    titulo: "Sala comercial para locação",
    tipo: "Comercial",
    negocio: "Aluguel",
    cidade: "Porto Alegre",
    bairro: "Centro Histórico",
    quartos: 0,
    banheiros: 1,
    garagem: 0,
    valor: "R$ 1.900/mês",
  },
  {
    titulo: "Casa térrea com pátio",
    tipo: "Casa",
    negocio: "Venda",
    cidade: "Guaíba",
    bairro: "Colina",
    quartos: 2,
    banheiros: 1,
    garagem: 2,
    valor: "R$ 430.000",
  },
  {
    titulo: "Apartamento compacto para investir",
    tipo: "Apartamento",
    negocio: "Venda",
    cidade: "Porto Alegre",
    bairro: "Cidade Baixa",
    quartos: 1,
    banheiros: 1,
    garagem: 0,
    valor: "R$ 310.000",
  },
];

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

function renderProperties(list) {
  propertyList.innerHTML = "";

  if (list.length === 0) {
    propertyList.innerHTML = `
      <div class="empty-message">
        <h3>Nenhum imóvel encontrado</h3>
        <p>Tente alterar os filtros ou entre em contato para receber atendimento personalizado.</p>
      </div>
    `;
    return;
  }

  list.forEach((property) => {
    const card = document.createElement("article");
    card.classList.add("property-card");

    const detalhes = [];

    if (property.quartos > 0) {
      detalhes.push(`${property.quartos} quarto(s)`);
    }

    if (property.banheiros > 0) {
      detalhes.push(`${property.banheiros} banheiro(s)`);
    }

    if (property.garagem > 0) {
      detalhes.push(`${property.garagem} vaga(s)`);
    }

    detalhes.push(property.tipo);

    const message = encodeURIComponent(
      `Olá, tenho interesse no imóvel: ${property.titulo}. Poderia me passar mais informações?`,
    );

    card.innerHTML = `
      <div class="property-image">
        <span class="property-badge">${property.negocio}</span>
      </div>

      <div class="property-content">
        <h3>${property.titulo}</h3>

        <p class="property-location">
          ${property.bairro}, ${property.cidade}
        </p>

        <div class="property-details">
          ${detalhes.map((item) => `<span>${item}</span>`).join("")}
        </div>

        <strong class="property-price">${property.valor}</strong>

        <a class="property-link" href="https://wa.me/${whatsappNumber}?text=${message}" target="_blank">
          Tenho interesse
        </a>
      </div>
    `;

    propertyList.appendChild(card);
  });
}

filterForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const tipoNegocio = document.getElementById("tipoNegocio").value;
  const tipoImovel = document.getElementById("tipoImovel").value;
  const cidade = document.getElementById("cidade").value.toLowerCase().trim();

  const filteredProperties = properties.filter((property) => {
    const matchNegocio =
      tipoNegocio === "todos" || property.negocio === tipoNegocio;
    const matchTipo = tipoImovel === "todos" || property.tipo === tipoImovel;

    const matchCidade =
      cidade === "" ||
      property.cidade.toLowerCase().includes(cidade) ||
      property.bairro.toLowerCase().includes(cidade);

    return matchNegocio && matchTipo && matchCidade;
  });

  renderProperties(filteredProperties);

  document.getElementById("imoveis").scrollIntoView({
    behavior: "smooth",
  });
});

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

if (propertyList) {
  renderProperties(properties);
}
