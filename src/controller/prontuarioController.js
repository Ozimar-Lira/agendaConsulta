import multer from 'multer';
import { Router } from 'express';
import {
  inserirProntuario
} from '../repository/prontuarioRepository.js';

const endpoint = Router();

/*const upload = multer({ dest: 'storage/capasFilmes' });*/

endpoint.post('/prontuario', async (req, resp) => {
  try {
    const novoProntuario = req.body;

    const prontuarioInserido = await inserirProntuario(novoProntuario);
    resp.send(prontuarioInserido);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.get('/prontuario', async (req, resp) => {
  try {
    const resposta = await listarTodosProntuarios();
    resp.send(resposta);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.get('/prontuario/busca', async (req, resp) => {
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

endpoint.get('/prontuario/:crm', async (req, resp) => {
  try {
    const crm = Number(req.params.cpf);

    const resposta = await buscarPorId(crm);

    resp.send(resposta);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.delete('/prontuario/:crm', async (req, resp) => {
  try {
    const { crm } = req.params;

    const resposta = await removerProntuario(crm);

    resp.status(204).send();
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.put('/prontuario/:crm', async (req, resp) => {
  try {
    const { crm } = req.params;
    const prontuario = req.body;

    const resposta = await alterarProntuario(crm, prontuario);

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
