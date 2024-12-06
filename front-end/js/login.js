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
      localStorage.setItem("jwtToken", response.data.returnData.token);
      localStorage.setItem("userId", response.data.returnData.idUser);

      window.location.href = "../usuario/usuario.html";
    })
    .catch((error) => {
      if (error.response.data.message == "Invalid email or password") {
        Swal.fire({
          icon: "error",
          title: "Email ou senha incorretos",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Ocorreu um erro ao realizar a transação",
        });
      }
    });
});
