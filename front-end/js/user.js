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

  dataUser.wallet.cryptoWallets.forEach((value, key) => {
    document.getElementById("tabelaCriptos").innerHTML += `
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
                  <h2 class="tabela-valores">$${value.moneyType.Crypto.valueInDollar}</h2>
                </div>
                <div class="bonus-box">
                  <div class="fundos-valor">
                    <p class="texto-valor">Possui:</p>
                    <span class="valor-conta">${value.balance}</span>
                  </div>
                </div>
              </div>`;
  });
}
