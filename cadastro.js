// 1. Pegamos o formulário pelo ID que está na linha 14 do seu HTML
const formulario = document.getElementById("formCadastro");

// 2. Escutamos o clique de envio (O bloco abre aqui)
formulario.addEventListener("submit", async (event) => {
  event.preventDefault(); // Impede a página de atualizar e quebrar o envio

  // 3. Pegamos os valores usando exatamente os IDs do seu HTML
  const emailDigitado = document.getElementById("mail").value;
  const senhaDigitada = document.getElementById("pass").value;
  const nomeDigitado = document.getElementById("nome").value;

  // 4. Enviamos os pacotes de dados para o seu servidor Node.js na porta 3000
  const resposta = await fetch("http://localhost:3000/cadastro", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: emailDigitado,
      senha: senhaDigitada,
      nome: nomeDigitado
    }),
  });

  // 5. Lemos o texto enviado pelo servidor ("CADASTRO SOLICITADO FCOM SUCESSO!")
  const resultadoTexto = await resposta.text();

  // 6. Mostra o alerta de sucesso na tela do navegador
  alert(resultadoTexto);
}); // (O bloco fecha corretamente aqui na última linha!)




