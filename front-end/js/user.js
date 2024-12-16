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

let dataUser = null;

const user = axios
  .get(`https://gl-crypto-api.onrender.com/users/getAllData/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
  .then((response) => {
    dataUser = response.data;

    formatarDados();
  });

/*
        <div class="linha-logo">
                <div class="logo-box">
                  <img
                    src="../imgs/logos/bitcoin.png"
                    alt="logo"
                    class="coin-logo"
                  />
                  <h2 class="coin-sigla">BTC</h2>
                  <p class="coin-nome">Bitcoin</p>
                </div>
                <div class="valores-box">
                  <h2 class="tabela-valores">$98.492,26</h2>
                </div>
                <div class="bonus-box">
                  <div class="fundos-valor">
                    <p class="texto-valor">Possui:</p>
                    <span class="valor-conta">***</span>
                  </div>
                </div>
              </div>
             */

function formatarDados() {
  const name = String(dataUser.personalName).split(" ");

  document.querySelector("#username").innerHTML = dataUser.personalName;
  document.querySelector("#username-title").innerHTML = name[0];

  document.getElementById("email").innerHTML = dataUser.email;
  document.getElementById("phone").innerHTML = dataUser.phone;
  document.getElementById("cpf").innerHTML = dataUser.cpf;
  document.getElementById("rg").innerHTML = dataUser.rg;

  async function processarCriptos(dataUser) {
    async function buscarCryptoId(abbreviation) {
      try {
        const response = await axios.get(
          `https://gl-crypto-api.onrender.com/money/abbreviation/${abbreviation}`
        );
        return response.data.id;
      } catch (error) {
        console.error(`Erro ao buscar o ID para ${abbreviation}:`, error);
        throw error;
      }
    }

    async function alterarValorCompra(idCryptoInput, idCryptoOutput, balance) {
      try {
        console.log({
          idMoneyInput: idCryptoInput,
          idMoneyOutput: idCryptoOutput,
          balance: balance,
          idUser: userId,
        });

        const response = await axios.post(
          "https://gl-crypto-api.onrender.com/transation/convert",
          {
            idMoneyInput: idCryptoInput,
            idMoneyOutput: idCryptoOutput,
            balance: balance,
            idUser: userId,
          }
        );
        return response.data["converted-value"];
      } catch (error) {
        console.error("Erro ao converter valor:", error);
        throw error;
      }
    }

    const tabelaCriptos = document.getElementById("tabelaCriptos");
    tabelaCriptos.innerHTML = ""; // Limpa a tabela antes de adicionar novos itens

    for (const value of dataUser.wallet.cryptoWallets) {
      console.log(value);

      let valor = "";

      if (value.moneyType.type === "Crypto") {
        valor = value.totalInDollar; // Valor já disponível
      } else if (value.moneyType.type === "RealMoney") {
        try {
          const idCryptoInput = await buscarCryptoId(
            value.moneyType.abbreviation
          );
          const idCryptoOutput = await buscarCryptoId("USD");
          valor = await alterarValorCompra(idCryptoInput, idCryptoOutput, 1); // Valor convertido
        } catch (error) {
          console.error("Erro ao processar transação:", error);
          valor = "Erro"; // Valor padrão em caso de erro
        }
      }

      console.log(valor);

      /*
      <img
              src="../imgs/logos/bitcoin.png"
              alt="logo"
              class="coin-logo"
            />
      */

      // Adiciona a linha na tabela
      tabelaCriptos.innerHTML += `
        <div class="linha-logo">
          <div class="logo-box">
            
            <h2 class="coin-sigla">${value.moneyType.abbreviation}</h2>
            <p class="coin-nome">${value.moneyType.name}</p>
          </div>
          <div class="valores-box">
            <h2 class="tabela-valores">$${valor}</h2>
          </div>
          <div class="bonus-box">
            <div class="fundos-valor">
              <p class="texto-valor">Possui:</p>
              <span class="valor-conta">${value.balance}</span>
            </div>
          </div>
        </div>`;
    }
  }
  processarCriptos(dataUser);
}

document.getElementById("verificar").addEventListener("click", (event) => {
  event.preventDefault();

  Swal.fire({
    icon: "error",
    title: "Funcionaliade em manutenção",
    text: "Desculpe, mas estamos trabalhando nessa funcionalidade no momento",
  });
});

document.getElementById("sair").addEventListener("click", (event) => {
  event.preventDefault();

  localStorage.setItem("jwtToken", "");
  localStorage.setItem("userId", "");

  Swal.fire({
    icon: "sucess",
    title: "Conta deslogada com sucesso",
  }).then(() => {
    window.location.href = "../login/login.html";
  });
});
