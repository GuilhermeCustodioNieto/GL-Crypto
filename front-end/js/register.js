const dataRequest = {}; // Objeto para armazenar os dados do usuário

const pg2 = `
<body class="fundo centro-login">

    <main>
    <section class="container-principal">
        <header class="header-login">
        <a href="../index.html"
            ><img src="../imgs/logo.png" alt="logotipo" class="logotipo"
          /></a>
        <a href="./registro.html">
            <span class="iconify seta" data-icon="majesticons:arrow-up-line" data-inline="false"></span>
        </a>
        </header>

        <h2 class="sub-titulo">REGISTER II</h2>

        <form class="formulario" id="registro2">
        <div class="coluna">
            <label for="telefone" class="label-login">Numero de Telefone</label>
            <input type="tel" id="telefone" name="phone" required class="input-login" />
        </div>

        <div class="coluna">
            <label for="email" class="label-login">Email</label>
            <input type="email" id="email" name="email" required class="input-login" />
        </div>

        <div class="coluna">
            <label for="email" class="label-login">Confirme o Email</label>
            <input type="email" id="email" name="email" required class="input-login" />
        </div>

        <button type="submit" class="btn-login" id="pg2-submit">NEXT</button>
        </form>
    </section>
    </main>
</body>
`;

const pg3 = `
<body class="fundo centro-login">

    <main>
    <section class="container-principal">
        <header class="header-login">
        <a href="../index.html"
            ><img src="../imgs/logo.png" alt="logotipo" class="logotipo"
          /></a>
        <a href="./registro.html">
            <span class="iconify seta" data-icon="majesticons:arrow-up-line" data-inline="false"></span>
        </a>
        </header>

        <h2 class="sub-titulo">REGISTER III</h2>

        <form class="formulario">
        <div class="coluna">
            <label for="password" class="label-login">Senha</label>
            <input type="password" id="password" name="userPassword" required class="input-login" />
        </div>

        <div class="coluna">
            <label for="secondPassword" class="label-login">Confirme a Senha</label>
            <input type="password" id="secondPassword" name="secondPassword" required class="input-login" />
        </div>

        <button type="submit" class="btn-login" id="pg3-submit">NEXT</button>
        </form>
    </section>
    </main>
</body>
`;

// Função para alternar páginas
function switchPage(pageNumber) {
  console.log(`Tentando trocar para a página ${pageNumber}`); // Log para depurar
  if (pageNumber === 2) {
    document.body.innerHTML = pg2;
    console.log("Página 2 carregada.");
    initializePage2Events();
  } else if (pageNumber === 3) {
    document.body.innerHTML = pg3;
    console.log("Página 3 carregada.");
    initializePage3Events();
  } else {
    console.error("Número de página inválido:", pageNumber);
  }
}

// Inicializa os eventos da página 2
function initializePage2Events() {
  const form = document.querySelector("#registro2");
  if (!form) {
    console.error("Formulário da página 2 não encontrado!");
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    formData.forEach((value, key) => {
      dataRequest[key] = value;
    });

    switchPage(3);
  });
}

// Inicializa os eventos da página 3
function initializePage3Events() {
  const form = document.querySelector(".formulario");
  if (!form) {
    console.error("Formulário da página 3 não encontrado!");
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Submissão da página 3 capturada.");

    const formData = new FormData(form);
    const password = formData.get("userPassword");
    const secondPassword = formData.get("secondPassword");

    if (password !== secondPassword) {
      Swal.fire({
        title: "Senhas diferentes!",
        text: "As senhas devem ser iguais para você realizar seu cadastro",
        icon: "error",
        confirmButtonText: "Certo",
      });
      return;
    }

    formData.forEach((value, key) => {
      dataRequest[key] = value;
    });

    console.log(dataRequest);

    // Envia os dados para a API
    axios
      .post(
        "https://gl-crypto-api.onrender.com/auth/user/register",
        dataRequest
      )
      .then((response) => {
        Swal.fire({
          title: "Registro realizado com sucesso!",
          icon: "success",
        }).then(() => {
          window.location.href = "../index.html";
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Funcionaliade em manutenção",
          text: `Erro: ${error.response.data.message}`,
        });
      });
  });
}

// Captura o evento de submit para a página 1
document.querySelector("#pg1-submit").addEventListener("click", (event) => {
  event.preventDefault();
  console.log("Submissão da página 1 capturada.");

  const form = new FormData(document.querySelector("form"));
  form.forEach((value, key) => {
    dataRequest[key] = value;
  });

  const birthDate = form.get("data-nascimento");
  const age = calculateAge(birthDate);

  if (age < 18) {
    Swal.fire({
      icon: "error",
      title: "Você precisa ter 18 anos ou mais para se registrar",
    });
    return;
  }

  // Adiciona a idade ao objeto dataRequest
  dataRequest.age = age;

  switchPage(2);
});

// Função para calcular idade
function calculateAge(birthDate) {
  const birthDateObj = new Date(birthDate);
  const today = new Date();

  let age = today.getFullYear() - birthDateObj.getFullYear();
  const m = today.getMonth() - birthDateObj.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }

  return age;
}
