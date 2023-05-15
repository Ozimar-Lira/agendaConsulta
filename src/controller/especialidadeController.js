import multer from 'multer';
import { Router } from 'express';
import {
  alterarEspecialidade,
  buscarPorId,
  inserirEspecialidade,
  listarTodasEspecialidades,
  removerEspecialidade,
} from '../repository/especialidadeRepository.js';

const endpoint = Router();

/*const upload = multer({ dest: 'storage/capasFilmes' });*/

endpoint.post('/especialidade', async (req, resp) => {
  try {
    const novaEspecialidade = req.body;

    const especialidadeInserido = await inserirEspecialidade(novaEspecialidade);
    resp.send(especialidadeInserido);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.get('/especialidade', async (req, resp) => {
  try {
    const resposta = await listarTodasEspecialidades();
    resp.send(resposta);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.get('/especialidade/busca', async (req, resp) => {
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

endpoint.get('/especialidade/:id', async (req, resp) => {
  try {
    const cpf = Number(req.params.id);

    const resposta = await buscarPorId(id);

    resp.send(resposta);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.delete('/especialidade/:id', async (req, resp) => {
  try {
    const { id } = req.params;

    const resposta = await removerEspecialidade(id);

    resp.status(204).send();
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.put('/especialidade/:id', async (req, resp) => {
  try {
    const { id } = req.params;
    const especialidade = req.body;

    const resposta = await alterarEspecialidade(id, especialidade);

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
