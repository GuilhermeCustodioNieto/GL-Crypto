const token = sessionStorage.getItem("jwtToken");
const userId = sessionStorage.getItem("userId");

if (!token) {
  alert("O usuário não está logado.");
  window.location.href = "../login/login.html";
}

let dataUser = null;

const user = axios
  .get(`http://localhost:3000/users/getAllData/${userId}`, {
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
  document.getElementById("id").innerHTML = dataUser.id;

  async function processarCriptos(dataUser) {
    async function buscarCryptoId(abbreviation) {
      try {
        const response = await axios.get(
          `http://localhost:3000/money/abbreviation/${abbreviation}`
        );
        return response.data.id;
      } catch (error) {
        console.error(`Erro ao buscar o ID para ${abbreviation}:`, error);
        throw error;
      }
    }

    async function alterarValorCompra(idCryptoInput, idCryptoOutput, balance) {
      try {
        const response = await axios.post(
          "http://localhost:3000/transation/convert",
          {
            idMoneyInput: idCryptoInput,
            idMoneyOutput: idCryptoOutput,
            balance: balance,
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
        valor = value.moneyType.Crypto.valueInDollar; // Valor já disponível
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

      // Adiciona a linha na tabela
      tabelaCriptos.innerHTML += `
        <div class="linha-logo">
          <div class="logo-box">
            <img
              src="../imgs/logos/bitcoin.png"
              alt="logo"
              class="coin-logo"
            />
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
