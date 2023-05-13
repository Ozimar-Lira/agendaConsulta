import multer from 'multer';
import { Router } from 'express';
import {
  alterarFilme,
  alterarImagem,
  buscarPorId,
  buscarPorNome,
  inserirFilme,
  listarTodosFilmes,
  removerFilme,
} from '../repository/filmeRepository.js';

const endpoint = Router();

const upload = multer({ dest: 'storage/capasFilmes' });

endpoint.post('/filme', async (req, resp) => {
  try {
    const novoFilme = req.body;

    const filmeInserido = await inserirFilme(novoFilme);
    resp.send(filmeInserido);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.get('/filme', async (req, resp) => {
  try {
    const resposta = await listarTodosFilmes();
    resp.send(resposta);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.get('/filme/busca', async (req, resp) => {
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

endpoint.get('/filme/:id', async (req, resp) => {
  try {
    const id = Number(req.params.id);

    const resposta = await buscarPorId(id);

    resp.send(resposta);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.delete('/filme/:id', async (req, resp) => {
  try {
    const { id } = req.params;

    const resposta = await removerFilme(id);

    resp.status(204).send();
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.put('/filme/:id', async (req, resp) => {
  try {
    const { id } = req.params;
    const filme = req.body;

    const resposta = await alterarFilme(id, filme);

    resp.status(204).send();
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.put('/filme/:id/capa', upload.single('capa'), async (req, resp) => {
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
});

export default endpoint;
