import multer from 'multer';
import { Router } from 'express';
import {
  alterarLogin,
  buscarPorId,
  inserirLogin,
  listarTodosLogins,
  removerLogin,
} from '../repository/loginRepository.js';

const endpoint = Router();

/*const upload = multer({ dest: 'storage/capasFilmes' });*/

endpoint.post('/login', async (req, resp) => {
  try {
    const novoLogin = req.body;

    const loginInserido = await inserirLogin(novoLogin);
    resp.send(loginInserido);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.get('/login', async (req, resp) => {
  try {
    const resposta = await listarTodosLogins();
    resp.send(resposta);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.get('/login/busca', async (req, resp) => {
  try {
    const { nome } = req.query;

    const resposta = await buscarPorNome(nome);

    resp.send(resposta);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.get('/login/:cpf', async (req, resp) => {
  try {
    const cpf = Number(req.params.cpf);

    const resposta = await buscarPorId(cpf);

    resp.send(resposta);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.delete('/login/:cpf', async (req, resp) => {
  try {
    const { cpf } = req.params;

    const resposta = await removerLogin(cpf);

    resp.status(204).send();
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.put('/login/:cpf', async (req, resp) => {
  try {
    const { cpf } = req.params;
    const login = req.body;

    const resposta = await alterarLogin(cpf, login);

    resp.status(204).send();
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

/*endpoint.put('/filme/:id/capa', upload.single('capa'), async (req, resp) => {
  try {
    const { id } = req.params;
    const imagem = req.file.path;

    const resposta = await alterarImagem(imagem, id);

    resp.status(204).send();
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});*/

export default endpoint;
