let dataRequest = {};

const form = document.querySelector("#formulario");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  formData.forEach((value, key) => {
    dataRequest[key] = value;
  });

  axios
    .post("http://localhost:3000/auth/user/login", dataRequest)
    .then((response) => {
      console.log("Resposta da API:", response.data.returnData);
      sessionStorage.setItem("jwtToken", response.data.returnData.token);
      sessionStorage.setItem("userId", response.data.returnData.idUser);

      alert("Login concluído com sucesso!");
      window.location.href = "../usuario/usuario.html";
    })
    .catch((error) => {
      console.error("Erro ao enviar dados:", error);
      alert("Ocorreu um erro. Por favor, tente novamente.");
    });
});