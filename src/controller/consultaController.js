import multer from 'multer';
import { Router } from 'express';
import {
  alterarConsulta,
  buscarPorId,
  inserirConsulta,
  listarTodasConsultas,
  removerConsulta,
} from '../repository/consultaRepository.js';

const endpoint = Router();

/*const upload = multer({ dest: 'storage/capasFilmes' });*/

endpoint.post('/consulta', async (req, resp) => {
  try {
    const novaConsulta = req.body;

    const consultaInserido = await inserirConsulta(novaConsulta);
    resp.send(consultaInserido);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.get('/consulta', async (req, resp) => {
  try {
    const resposta = await listarTodasConsultas();
    resp.send(resposta);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.get('/consulta/busca', async (req, resp) => {
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

endpoint.get('/consulta/:id', async (req, resp) => {
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

endpoint.delete('/consulta/:id', async (req, resp) => {
  try {
    const { id } = req.params;

    const resposta = await removerConsulta(id);

    resp.status(204).send();
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.put('/consulta/:id', async (req, resp) => {
  try {
    const { id } = req.params;
    const consulta = req.body;

    const resposta = await alterarConsulta(id, consulta);

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
