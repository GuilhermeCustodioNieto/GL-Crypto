const token = localStorage.getItem("jwtToken");
const userId = localStorage.getItem("userId");

if (token && token != "") {
  console.log(token);

  document.querySelector(".container-header").innerHTML = `
  <section class="section-header">
        <a href="./index.html"
          ><img src="./imgs/logo.png" alt="logotipo" class="logotipo"
        /></a>
        <nav class="nav-bar">
          <a href="./venda-compra/compras-cripto.html" class="links-header p"
            >Compre Cripto</a
          >
          <a href="./venda-compra/vendas-cripto.html" class="links-header p"
            >Trade Cripto</a
          >
          <a href="./index.html" class="links-header p">Sobre GL Cripto</a>
        </nav>
      </section>
      <section class="section-header">
        <a href="./usuario/deposito.html" class="box-link2"
          ><span
            class="iconify"
            data-icon="tdesign:money"
            data-width="24"
            data-height="24"
          ></span>
          DEPOSITAR</a
        >

        <a href="./usuario/usuario.html" class="link-none"
          ><span
            class="iconify icon-user"
            data-icon="mingcute:user-4-fill"
          ></span
        ></a>
      </section>`;
}

document.getElementById("airdrop-link").addEventListener("click", (event) => {
  event.preventDefault();

  Swal.fire({
    icon: "error",
    title: "Funcionaliade em manutenção",
    text: "Desculpe, mas estamos trabalhando nessa funcionalidade no momento",
  });
});

document.getElementById("qrcode-link").addEventListener("click", (event) => {
  event.preventDefault();

  Swal.fire({
    icon: "error",
    title: "Funcionaliade em manutenção",
    text: "Desculpe, mas estamos trabalhando nessa funcionalidade no momento",
  });
});
