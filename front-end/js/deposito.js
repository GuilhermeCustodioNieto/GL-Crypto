const token = sessionStorage.getItem("jwtToken");
const userId = sessionStorage.getItem("userId");

function adicionarCriptos() {
  let moedas = document.querySelector("#moeda-pagar");

  axios
    .get("http://localhost:3000/money/realMoney/")
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
      `http://localhost:3000/money/realMoney/abbreviation/${abbreviation}`
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

  try {
    console.log(dataRequest["realMoney"]);

    const RealMoneyId = await buscarCryptoId(dataRequest["realMoney"]);

    // Adicionando os IDs ao dataRequest
    dataRequest["RealMoneyId"] = RealMoneyId;

    dataRequest["idUser"] = userId;

    console.log(dataRequest);

    // Enviando os dados
    await axios.post(
      "http://localhost:3000/transation/deposit",
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

    alert("Transação realizada com sucesso!");

    window.location.href = "../usuario/usuario.html";
  } catch (error) {
    console.error("Erro ao realizar a transação:", error);
    alert("Erro ao realizar a transação.");
  }
});
