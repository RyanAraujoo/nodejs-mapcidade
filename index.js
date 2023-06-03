const express = require('express');
const mysql = require('mysql');
const { DATETIME } = require('mysql/lib/protocol/constants/types');
const app = express();

// Configurações do banco de dados
const db = mysql.createConnection({
  host: 'db4free.net',
  user: 'mapcidadeflutter',
  password: 'mapcidade123',
  database: 'mapcidadeapi'
});

// Conectar ao banco de dados
db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados!');
});

// Middleware para permitir o uso de JSON nas requisições
app.use(express.json());

// Rota POST para cadastrar um novo usuário
app.post('/mapcidade/v1/usuarios', (req, res) => {
  const { email, nome, sobrenome, data_nascimento, cpf, cep, senha } = req.body;
  const novoUsuario = {
    email,
    nome,
    sobrenome,
    data_nascimento,
    cpf,
    cep,
    senha,
    chamados: JSON.stringify([])
  };

  // Insere o novo usuário na tabela 'usuarios'
  db.query('INSERT INTO usuario SET ?', novoUsuario, (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar usuário:', err);
      res.status(500).json({ error: 'Erro ao cadastrar usuário' });
      return;
    }

    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  });
});

// Rota GET para buscar um usuário pelo email e senha
app.get('/mapcidade/v1/usuarios', (req, res) => {
  const { email, senha } = req.query;
  // Busca o usuário na tabela 'usuarios' pelo email e senha
  db.query('SELECT * FROM usuario WHERE email = ? AND senha = ?', [email, senha], (err, result) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      res.status(500).json({ error: 'Erro ao buscar usuário' });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ error: 'Usuário não encontrado' });
    } else {
      const usuario = result[0];
      res.status(200).json(usuario);
    }
  });
});

// Rota GET para buscar informações do usuario
app.get('/mapcidade/v1/usuarios', (req, res) => {
  const { email } = req.query;
  // Busca o usuário na tabela 'usuarios' pelo email e senha
  db.query('SELECT * FROM usuario WHERE email = ?', [email], (err, result) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      res.status(500).json({ error: 'Erro ao buscar usuário' });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ error: 'Usuário não encontrado' });
    } else {
      const usuario = result[0];
      res.status(200).json(usuario);
    }
  });
});
// Rota POST para criar um novo chamado dentro do usuário
app.post('/mapcidade/v1/chamados', (req, res) => {
  const { logradouro, complemento, bairro, registro, descricao } = req.body;
  const { email } = req.query;
  // Verifica se o usuário existe antes de adicionar o chamado
  db.query('SELECT * FROM usuario WHERE email = ?', email, (err, result) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      res.status(500).json({ error: 'Erro ao buscar usuário' });

      return;
    }
    if (result.length === 0) {
      res.status(404).json({ error: 'Usuário não encontrado' });
      return;
    }

    const usuario = result[0];

    const novoChamado = {
      logradouro,
      complemento,
      bairro,
      registro,
      descricao,
      status: "analise",
      dataAtualizacao: new Date()
    };

    // Adiciona o novo chamado ao array de chamados do usuário
    usuario.chamados = usuario.chamados ? JSON.parse(usuario.chamados) : [];
    usuario.chamados.push(novoChamado);

    // Atualiza o registro do usuário no banco de dados
    db.query('UPDATE usuario SET chamados = ? WHERE email = ?', [JSON.stringify(usuario.chamados), email], (err, result) => {
      if (err) {
        console.error('Erro ao atualizar usuário:', err);
        res.status(500).json({ error: 'Erro ao atualizar usuário' });
        return;
      }

      res.status(200).json({ message: 'Chamado adicionado com sucesso' });
    });
  });
});

// Rota GET para pegar todos os chamados do usuário logado
app.get('/mapcidade/v1/chamados', (req, res) => {
  const { email } = req.query;

  // Verifica se o usuário existe antes de buscar os chamados
  db.query('SELECT * FROM usuario WHERE email = ?', email, (err, result) => {
    if (err) {
      console.error('Erro ao buscar usuário:', err);
      res.status(500).json({ error: 'Erro ao buscar usuário' });
      return;
    }

    if (result.length === 0) {
      res.status(404).json({ error: 'Usuário não encontrado' });
      return;
    }

    const usuario = result[0];
    usuario.chamados = usuario.chamados ? JSON.parse(usuario.chamados) : [];
    // Retorna os chamados do usuário

    res.status(200).json(usuario.chamados);
  });
});

app.listen(3000, () => {
  console.log(`Servidor iniciado na porta 3000`);
});