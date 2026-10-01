/* IMPORTEI AS BIBLIOTECAS QUE ESTAREI USANDO NESSE PROJETO */

const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

/* DEFINI UMA VARIÁVEL PARA ESTAR SENDO O CORAÇÃO DA APLICALÇÃO */

const app = express();

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./database.sqlite");

db.run(`CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    email TEXT UNIQUE,
    senha TEXT
)`);

app.post("/cadastro", (req, res) => {
  // 1. Pegamos o nome, email e a senha que vieram lá do frontend.
  const { nome, email, senha } = req.body;

  // 2. Criamos a frase de comando para o banco de dados.
  const comandoSQL = `INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)`;

  // 3. Pedimos para o banco rodar o comando, passando os três dados organizados
  db.run(comandoSQL, [nome, email, senha], function (erro) {
    if (erro) {
      console.log("Ops, deu erro ao salvar no banco:", erro.message);
      return res.status(500).send("Erro ao salvar os dados.");
    }

    console.log("Dados gravados com sucesso no banco SQLite!");
    res.send("CADASTRO SOLICITADO COM SUCESSO!");
  });
});

app.post("/login", (req, res) => {
  // 1. O intuíto aqui é pegar os valores de email e senha e chechar a existência e compatibilidade ambos no banco de dados.
  const { email, senha } = req.body;
  // 2. Verificando se esse usuário já está cadastrado no meu banco de dados.
  const comandoSQL = `SELECT * FROM usuarios WHERE email = ?`;
  // 3.
  db.get(comandoSQL, [email], function (erro, usuario) {
    if (erro) {
      return res
        .status(500)
        .send(`Não foi possível fazer o login, tente novamente em instantes!`);
    }

    if (!usuario) {
      // 4. Significa: "Se NÃO existir um usuário..."
      return res.status(400).json({ erro: "Email ou Senha incorretos!" });
    }

    if (senha !== usuario.senha) {
      // 5. Essa etapa vai veirifciar a veraciade da senha daquele usuário no banco de dados.
      return res.status(400).json({ erro: "Email ou Senha incorretos!" });
    }

    // 6. Nessa estapa, estaremos confirmando se as condições usuário e senha foram atendidos então o usuário conseguirá ter feito o login.
    res.send({
      Mensagem: `Login Efetuado com sucesso!`,
      usuario: {
        nome: usuario.nome,
        email: usuario.email,
      },
    });
  });
});

app.listen(3000, () => {
  console.log("Sucesso, estamos online na porta 3000!");
});
