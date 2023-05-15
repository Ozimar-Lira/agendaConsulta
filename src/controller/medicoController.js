import multer from 'multer';
import { Router } from 'express';
import {
  alterarMedico,
  buscarPorId,
  inserirMedico,
  listarTodosMedicos,
  removerMedico,
} from '../repository/medicoRepository.js';

const endpoint = Router();

/*const upload = multer({ dest: 'storage/capasFilmes' });*/

endpoint.post('/medico', async (req, resp) => {
  try {
    const novoMedico = req.body;

    const medicoInserido = await inserirMedico(novoMedico);
    resp.send(medicoInserido);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.get('/medico', async (req, resp) => {
  try {
    const resposta = await listarTodosMedicos();
    resp.send(resposta);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.get('/medico/busca', async (req, resp) => {
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

endpoint.get('/medico/:crm', async (req, resp) => {
  try {
    const crm = Number(req.params.crm);

    const resposta = await buscarPorId(crm);

    resp.send(resposta);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.delete('/medico/:crm', async (req, resp) => {
  try {
    const { crm } = req.params;

    const resposta = await removerMedico(crm);

    resp.status(204).send();
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.put('/medico/:crm', async (req, resp) => {
  try {
    const { crm } = req.params;
    const medico = req.body;

    const resposta = await alterarMedico(crm, medico);

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
