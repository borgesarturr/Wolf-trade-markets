const login = document.getElementById('formLogin')

login.addEventListener("submit", async (event) => {
  event.preventDefault();

  const emailDigitado = document.getElementById("mail").value;
  const senhaDigitada = document.getElementById("pass").value;
  

  // Requisição fatch sebdo estabelecida com o endereçamento da página de login.
  // Avisando para o navegador que será um método POST em formato Json.

  const resposta = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailDigitado,
      senha: senhaDigitada
    })
  });

  const dados = await resposta.json();

  if (resposta.status === 200) {
    alert("Login Realizado com sucesso!");
    // Essa linha abaixo vai estar redirecionando o usuário caso a verificalçao di login for validada pelo banco de dados.
    window.location.href = "dashboard.html";
  } else {
    alert("Ops, email ou senha incorretos!");
  }
});
