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
  let moedas1 = document.querySelector(".moedas1");
  let moedas2 = document.querySelector(".moedas2");

  axios
    .get("https://gl-crypto-api.onrender.com/money/")
    .then((response) => {
      response.data.forEach((element) => {
        moedas1.innerHTML += `<option class="opcao-select" value="${element.abbreviation}" >${element.abbreviation}</option>`;
        moedas2.innerHTML += `<option class="opcao-select" value="${element.abbreviation}" >${element.abbreviation}</option>`;
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
      "https://gl-crypto-api.onrender.com/transation/convert",
      {
        idMoneyInput: idCryptoInput,
        idMoneyOutput: idCryptoOutput,
        balance: balance,
      }
    );

    document.querySelector(".pagar-input").value =
      response.data["converted-value"];
  } catch (err) {
    console.log(err);
  }
}

document
  .querySelector(".receber-input")
  .addEventListener("change", async (event) => {
    event.preventDefault();

    const idCryptoInput = await buscarCryptoId(
      document.querySelector(".moedas2").value
    );
    const idCryptoOutput = await buscarCryptoId(
      document.querySelector(".moedas1").value
    );

    const balance = document.querySelector(".receber-input").value;
    alterarValorCompra(idCryptoInput, idCryptoOutput, balance);
  });

async function buscarCryptoId(abbreviation) {
  try {
    const response = await axios.get(
      `https://gl-crypto-api.onrender.com/money/abbreviation/${abbreviation}`
    );

    console.log(response.data.id);

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

    if (!dataRequest["balance"]) {
      Swal.fire({
        icon: "error",
        title: "Digite um valor para prosseguir",
      });
      return;
    }

    try {
      // Buscando os IDs de forma assíncrona

      console.log(dataRequest["pagar"]);

      const idCryptoInput = await buscarCryptoId(dataRequest["receber"]);
      const idCryptoOutput = await buscarCryptoId(dataRequest["pagar"]);

      // Adicionando os IDs ao dataRequest
      dataRequest["idMoneyInput"] = idCryptoInput;
      dataRequest["idMoneyOutput"] = idCryptoOutput;

      dataRequest["idUser"] = userId;

      console.log("Data Request:", dataRequest);
      console.log(token);

      // Enviando os dados
      await axios.post(
        "https://gl-crypto-api.onrender.com/transation/buy",
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
      console.log(error);

      if (error.response.data.message == "Output crypto wallet not found.") {
        Swal.fire({
          icon: "error",
          title: "A criptomoeda que você está usando para pagar não existe",
          text: "Use uma criptomoeda existente na sua carteira",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Ocorreu um erro ao realizar a transação",
        });
      }
    }
  });
}

fazerTransacao();
