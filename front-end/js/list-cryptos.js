async function getList() {
  const response = await axios.get("http://localhost:3000/money/cryptos/");

  return response.data;
}

function mudarInfos(crypto) {
  function definirValorizacao() {
    const valorization = Math.random();
    const isSum = Math.random() > 0.5;

    let bonusValor = "";

    if (isSum) {
      bonusValor = 'bonus-valor1">+';
    } else {
      bonusValor = 'bonus-valor2">-';
    }

    return `<h3 class="${bonusValor}${valorization.toFixed(2)}%</h3>`;
  }

  const imgUrl = crypto["Money"]["imgUrl"];

  let template = `
    <div class="linha-logo">
              <div class="logo-box">
                <img
                  src="${imgUrl}"
                  alt="logo"
                  class="coin-logo"
                />
                <h2 class="coin-sigla">${crypto.Money.abbreviation}</h2>
                <p class="coin-nome">${crypto.Money.name}</p>
              </div>
              <div class="valores-box">
                <h2 class="tabela-valores">${crypto.valueInDollar}</h2>
              </div>
              <div class="bonus-box">
                ${definirValorizacao()}
              </div>
            </div>
            `;

  document.querySelector(".tabela-box").innerHTML += template;
}

async function main() {
  const list = await getList();

  if (list.length <= 5) {
    for (let i = 0; i <= list.length - 1; i++) {
      mudarInfos(list[i]);
    }
  } else {
    list.forEach((crypto) => {
      mudarInfos(crypto);
    });
  }
}

main();
