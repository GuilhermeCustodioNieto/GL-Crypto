async function getList() {
  const response = await axios.get("https://gl-crypto-api.onrender.com/money/");

  return response.data;
}

function mudarInfos(money) {
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

  const imgUrl = money.imgUrl;

  let valor = "";
  if (money.type == "Crypto") {
    valor = money.valueInDollar;
  } else if (money.type == "RealMoney") {
    valor = money.valueInDollar;
  }

  /*
  <img
                  src="${money.imgUrl}"
                  alt="logo"
                  class="coin-logo"
                />
                 */

  let template = `
    <div class="linha-logo">
              <div class="logo-box">
                
                <h2 class="coin-sigla">${money.abbreviation}</h2>
                <p class="coin-nome">${money.name}</p>
              </div>
              <div class="valores-box">
                <h2 class="tabela-valores">${valor}</h2>
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

  if (list.length > 5) {
    for (let i = 0; i <= 5 - 1; i++) {
      mudarInfos(list[i]);
    }
  } else {
    list.forEach((money) => {
      mudarInfos(money);
    });
  }
}

main();
