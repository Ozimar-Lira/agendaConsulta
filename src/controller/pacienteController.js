import multer from 'multer';
import { Router } from 'express';
import {
  alterarPaciente,
  buscarPorId,
  inserirPaciente,
  listarTodosPacientes,
  removerPaciente,
} from '../repository/pacienteRepository.js';

const endpoint = Router();

/*const upload = multer({ dest: 'storage/capasFilmes' });*/

endpoint.post('/paciente', async (req, resp) => {
  try {
    const novoPaciente = req.body;

    const pacienteInserido = await inserirPaciente(novoPaciente);
    resp.send(pacienteInserido);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.get('/paciente', async (req, resp) => {
  try {
    const resposta = await listarTodosPacientes();
    resp.send(resposta);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.get('/paciente/busca', async (req, resp) => {
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

endpoint.get('/paciente/:cpf', async (req, resp) => {
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

endpoint.delete('/paciente/:cpf', async (req, resp) => {
  try {
    const { cpf } = req.params;

    const resposta = await removerPaciente(cpf);

    resp.status(204).send();
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.put('/paciente/:cpf', async (req, resp) => {
  try {
    const { cpf } = req.params;
    const paciente = req.body;

    const resposta = await alterarPaciente(cpf, paciente);

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
