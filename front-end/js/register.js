

const dataRequest = {}

document.querySelector(".formulario").addEventListener("submit", (event) => {
    event.preventDefault();

    function calculateAge(birthDate) {
        const birthDateObj = new Date(birthDate);
        const today = new Date();

        let age = today.getFullYear() - birthDateObj.getFullYear();
        const m = today.getMonth() - birthDateObj.getMonth();

        // Se o mês atual for anterior ao mês de nascimento, ou se for o mesmo mês mas antes do dia de nascimento, subtrai 1 do cálculo da idade
        if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }

        return age;
    }

    

    const form = new FormData(event.target)

    const birthDate = document.getElementById("data-nascimento").value;
        
    const age = calculateAge(birthDate);

    if (age < 18) {
        alert("Você precisa ter 18 anos ou mais para se registrar.");
        return; 
    }

    formData.forEach((value, key) => {
        dataRequest[key] = value;
    });

    window.location.href("../.html")
})

document.querySelector("#registro2").addEventListener("submit", (event) => {
    event.preventDefault()

    const form = new FormData(event.target)
    form.forEach((value, key) => {
        dataRequest[key] = value;
    })
})

document.querySelector("#registro3").addEventListener("submit", (event) => {
    event.preventDefault()



    const form = new FormData(event.target)

    if(form["passowrd"] == form["secondPassword"]){
        form.forEach((value, key) => {
            dataRequest[key] = value;
        })

        console.log(dataRequest);

        axios.post("http://localhost:3000/auth/register", formDataObject)
            .then(response => {
                console.log("Resposta da API:", response.data);
                // Aqui você pode redirecionar ou mostrar uma mensagem de sucesso
                // window.location.href = "proxima-pagina.html"; // Exemplo de redirecionamento
                window.location.href("../index.html")
            })
            .catch(error => {
                console.error("Erro ao enviar dados:", error);
            });
    } else {
        alert("Senhas diferentes")
    }

    
})  

function register () {

}



