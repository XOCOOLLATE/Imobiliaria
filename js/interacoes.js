const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const propertyList = document.getElementById("propertyList");
const filterForm = document.getElementById("filterForm");
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

/* AQUI EMBAIXO VOCÊ COLOCA O CÓDIGO DA BUSCA */

const formBusca = document.getElementById("formBusca");
const resultadosImoveis = document.getElementById("resultadosImoveis");

formBusca.addEventListener("submit", function (event) {
  event.preventDefault();

  const finalidade = document.getElementById("finalidade").value;
  const tipoImovel = document.getElementById("tipoImovel").value;
  const cidadeBairro = document
    .getElementById("cidadeBairro")
    .value.toLowerCase()
    .trim();

  const imoveisFiltrados = properties.filter(function (imovel) {
    const combinaFinalidade =
      finalidade === "" || imovel.negocio === finalidade;
    const combinaTipo = tipoImovel === "" || imovel.tipo === tipoImovel;

    const combinaLocal =
      cidadeBairro === "" ||
      imovel.cidade.toLowerCase().includes(cidadeBairro) ||
      imovel.bairro.toLowerCase().includes(cidadeBairro);

    return combinaFinalidade && combinaTipo && combinaLocal;
  });

  mostrarImoveis(imoveisFiltrados);
});

function mostrarImoveis(lista) {
  resultadosImoveis.innerHTML = "";

  if (lista.length === 0) {
    resultadosImoveis.innerHTML = `
      <p>Nenhum imóvel encontrado com esses filtros.</p>
    `;
    return;
  }

  lista.forEach(function (imovel) {
    resultadosImoveis.innerHTML += `
      <div class="card-imovel">
        <h3>${imovel.title}</h3>
        <p><strong>Tipo:</strong> ${imovel.tipo}</p>
        <p><strong>Finalidade:</strong> ${imovel.negocio}</p>
        <p><strong>Local:</strong> ${imovel.bairro}, ${imovel.cidade}</p>
        <p><strong>Quartos:</strong> ${imovel.quartos}</p>
        <p><strong>Banheiros:</strong> ${imovel.banheiros}</p>
        <p><strong>Garagem:</strong> ${imovel.garagem}</p>
        <p><strong>Valor:</strong> ${imovel.valor}</p>
      </div>
    `;
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
