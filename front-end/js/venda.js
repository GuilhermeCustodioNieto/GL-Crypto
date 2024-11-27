const token = sessionStorage.getItem("jwtToken");
const userId = sessionStorage.getItem("userId");

if (!token) {
  alert("O usuário não está logado.");
  window.location.href = "../login/login.html";
}

function adicionarCriptos() {
  let moedas1 = document.querySelector(".moedas1");
  let moedas2 = document.querySelector(".moedas2");

  axios
    .get("http://localhost:3000/money/cryptos/")
    .then((response) => {
      response.data.forEach((element) => {
        moedas1.innerHTML += `<option class="opcao-select" value="${element.Money.abbreviation}" >${element.Money.abbreviation}</option>`;
        moedas2.innerHTML += `<option class="opcao-select" value="${element.Money.abbreviation}" >${element.Money.abbreviation}</option>`;
      });
    })
    .catch((error) => {
      console.error("Erro ao carregar criptomoedas:", error);
    });
}

adicionarCriptos();

async function alterarValorCompra(idCryptoInput, idCryptoOutput, balance) {
  try {
    const response = await axios.post(
      "http://localhost:3000/transation/convert",
      {
        idCryptoInput: idCryptoInput,
        idCryptoOutput: idCryptoOutput,
        balance: balance,
      }
    );

    console.log(response.data);

    document.querySelector(".receber-input").value =
      response.data["converted-value"];
  } catch (err) {
    console.log(err);
  }
}

document
  .querySelector(".pagar-input")
  .addEventListener("change", async (event) => {
    event.preventDefault();

    const idCryptoInput = await buscarCryptoId(
      document.querySelector(".moedas1").value
    );
    const idCryptoOutput = await buscarCryptoId(
      document.querySelector(".moedas2").value
    );

    const balance = document.querySelector(".pagar  -input").value;
    alterarValorCompra(idCryptoInput, idCryptoOutput, balance);
  });

async function buscarCryptoId(abbreviation) {
  try {
    const response = await axios.get(
      `http://localhost:3000/money/cryptos/abbreviation/${abbreviation}`
    );
    return response.data.id;
  } catch (error) {
    console.error(`Erro ao buscar o ID para ${abbreviation}:`, error);
    throw error;
  }
}

function fazerTransacao() {
  const form = document.getElementById("formulario");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const dataRequest = {};

    formData.forEach((value, key) => {
      dataRequest[key] = value;
    });

    try {
      // Buscando os IDs de forma assíncrona

      console.log(dataRequest["pagar"]);

      const idCryptoReceive = await buscarCryptoId(
        dataRequest["idCryptoReceive"]
      );
      const idCryptoSell = await buscarCryptoId(dataRequest["idCryptoSell"]);

      // Adicionando os IDs ao dataRequest
      dataRequest["idCryptoReceive"] = idCryptoReceive;
      dataRequest["idCryptoSell"] = idCryptoSell;

      dataRequest["idUser"] = userId;

      console.log("Data Request:", dataRequest);
      console.log(token);

      // Enviando os dados
      await axios.post(
        "http://localhost:3000/transation/sell",
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
}

fazerTransacao();
