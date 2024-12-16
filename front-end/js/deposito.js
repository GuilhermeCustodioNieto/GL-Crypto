const token = localStorage.getItem("jwtToken");
const userId = localStorage.getItem("userId");

if (!token || token == "") {
  Swal.fire({
    icon: "error",
    title: "Usuario não logado",
    text: "Faça login para prosseguir",
  }).then(() => {
    window.location.href = "../login/login.html";
  });
}

function adicionarCriptos() {
  let moedas = document.querySelector("#moeda-pagar");

  axios
    .get("https://gl-crypto-api.onrender.com/money/realMoney/")
    .then((response) => {
      response.data.forEach((element) => {
        console.log(element);

        moedas.innerHTML += `<option class="opcao-select" value="${element.Money.abbreviation}">${element.Money.abbreviation}</option>`;
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar criptomoedas:", error);
    });
}

adicionarCriptos();

async function buscarCryptoId(abbreviation) {
  try {
    const response = await axios.get(
      `https://gl-crypto-api.onrender.com/money/realMoney/abbreviation/${abbreviation}`
    );
    console.log(response.data.Money.id);

    return response.data.Money.id;
  } catch (error) {
    console.error(`Erro ao buscar o ID para ${abbreviation}:`, error);
    throw error;
  }
}

const form = document.getElementById("formulario");
form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const dataRequest = {};

  formData.forEach((value, key) => {
    dataRequest[key] = value;
  });

  if (!dataRequest["balance"]) {
    Swal.fire({
      icon: "error",
      title: "Digite um valor para prosseguir",
    });
    return;
  }

  try {
    const RealMoneyId = await buscarCryptoId(dataRequest["realMoney"]);

    // Adicionando os IDs ao dataRequest
    dataRequest["RealMoneyId"] = RealMoneyId;

    dataRequest["idUser"] = userId;

    // Enviando os dados
    await axios.post(
      "https://gl-crypto-api.onrender.com/transation/deposit",
      {
        ...dataRequest,
        userId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    Swal.fire({
      title: "Transação realizada com sucesso!",
      icon: "success",
    }).then(() => {
      window.location.href = "../usuario/usuario.html";
    });
  } catch (error) {
    console.error("Erro ao realizar a transação:", error);
    Swal.fire({
      icon: "error",
      title: "Ocorreu um erro ao realizar a transação",
    });
  }
});
