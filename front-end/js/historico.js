const token = sessionStorage.getItem("jwtToken");
const userId = sessionStorage.getItem("userId");

async function getHistory() {
  const response = await axios.get(
    "http://localhost:3000/transation/get-history"
  );

  return response.data;
}

function pegarDadosLinha(linha) {
  /*
  1. status *
  data *
  tipo transação *
  transmissor *
  receptor *
  moeda enviada * 
  moeda recebida * 
  */

  let status = "";

  if (linha.status == `Complete`) {
    status = "Completa";
  } else if (linha.status == `Loading`) {
    status = `Carregando`;
  } else if (linha.status == `Unhautorized`) {
    status = `Não autorizado`;
  }

  const data = new Date(linha.date).toLocaleDateString("pt-br", {
    timeZone: "UTC",
  });

  let tipoTransacao = "";

  if (linha.tipoTransacao == `Buy`) {
    tipoTransacao = "Compra";
  } else if (linha.tipoTransacao == `Sell`) {
    tipoTransacao = `Venda`;
  } else if (linha.tipoTransacao == `Deposit`) {
    tipoTransacao = `Deposito`;
  }

  let transmissor = ``;

  if (!linha.senderId) {
    transmissor = "Sistema";
  } else {
    const personalName = String(linha.sender.personalName || "").trim();
    transmissor = personalName
      ? personalName.split(" ").slice(0, 2).join(" ")
      : "";
  }

  let receptor = ``;

  if (!linha.receiverId) {
    receptor = "Sistema";
  } else {
    const personalName = String(linha.receiverUser.personalName || "").trim();
    receptor = personalName
      ? personalName.split(" ").slice(0, 2).join(" ")
      : "";
  }

  let moedaEnviada = ``;

  if (!linha.paymentMoneyId) {
    moedaEnviada = "Nenhuma";
  } else {
    moedaEnviada = linha.paymentMoney.abbreviation;
  }

  let moedaRecebida = ``;

  if (!linha.moneyId) {
    moedaRecebida = "Nenhuma";
  } else {
    moedaRecebida = linha.amount + ` ` + linha.money.abbreviation;
  }

  const dados = {
    status: status,
    data: data,
    tipoTransacao: tipoTransacao,
    transmissor: transmissor,
    receptor: receptor,
    moedaEnviada: moedaEnviada,
    moedaRecebida: moedaRecebida,
  };

  return dados;
}

function colocarLinha(linha) {
  document.querySelector(`#body-tabela`).innerHTML += `
  <tr class="tb-linha">
            <td class="tb-status">${linha.status}</td>
            <td class="tb-dados">${linha.data}</td>
            <td class="tb-dados">${linha.tipoTransacao}</td>
            <td class="tb-dados">${linha.transmissor}</td>
            <td class="tb-dados">${linha.receptor}</td>
            <td class="tb-dados">${linha.moedaEnviada}</td>
            <td class="tb-dados">${linha.moedaRecebida}</td>
          </tr>`;
}

async function main() {
  const response = await getHistory();

  response.forEach((linha) => {
    console.log(linha);

    const dadosFormatados = pegarDadosLinha(linha);
    colocarLinha(dadosFormatados);
  });
}

main();
