import multer from 'multer';
import { Router } from 'express';
import {
  alterarProduto,
  alterarImagem,
  buscarPorId,
  buscarPorNome,
  inserirProduto,
  listarTodosProdutos,
  removerProduto,
} from '../repository/produtoRepository.js';

const endpoint = Router();

const upload = multer({ dest: 'storage/imagensSolar' });

endpoint.post('/produto', async (req, resp) => {
  try {
    const novoProduto = req.body;

    const produtoInserido = await inserirProduto(novoProduto);
    resp.send(produtoInserido);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.get('/produto', async (req, resp) => {
  try {
    const resposta = await listarTodosProdutos();
    resp.send(resposta);
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.get('/produto/busca', async (req, resp) => {
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

endpoint.get('/produto/:id', async (req, resp) => {
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

endpoint.delete('/produto/:id', async (req, resp) => {
  try {
    const { id } = req.params;

    const resposta = await removerProduto(id);

    resp.status(204).send();
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.put('/produto/:id', async (req, resp) => {
  try {
    const { id } = req.params;
    const produto = req.body;

    const resposta = await alterarProduto(id, produto);

    resp.status(204).send();
  } catch (err) {
    resp.status(400).send({
      erro: err.message,
    });
  }
});

endpoint.put(
  '/produto/:id/imagem',
  upload.single('imagem'),
  async (req, resp) => {
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
  }
);

export default endpoint;
