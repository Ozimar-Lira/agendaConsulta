import multer from 'multer';
import { Router } from 'express';
import {
  alterarClinica,
  buscarPorId,
  inserirClinica,
  listarTodosClinicas,
  removerClinica,
} from '../repository/clinicaRepository.js';

const endpoint = Router();

/*const upload = multer({ dest: 'storage/capasFilmes' });*/

endpoint.post('/clinica', async (req, resp) => {
  try {
    const novoClinica = req.body;

    const clinicaInserido = await inserirClinica(novoClinica);
    resp.send(clinicaInserido);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.get('/clinica', async (req, resp) => {
  try {
    const resposta = await listarTodosClinicas();
    resp.send(resposta);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.get('/clinica/busca', async (req, resp) => {
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

endpoint.get('/clinica/:id', async (req, resp) => {
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

endpoint.delete('/clinica/:id', async (req, resp) => {
  try {
    const { id } = req.params;

    const resposta = await removerClinica(id);

    resp.status(204).send();
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.put('/clinica/:id', async (req, resp) => {
  try {
    const { id } = req.params;
    const clinica = req.body;

    const resposta = await alterarClinica(id, clinica);

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
