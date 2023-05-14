import { con } from './connection.js';

export async function inserirProduto(produto) {
  const comando = `INSERT INTO tb_produto (nm_descricao, nm_inversor, nm_placas, vl_kit, bt_disponivel) value (?,?,?,?,?)`;

  const [resposta] = await con.query(comando, [
    produto.descricao,
    produto.inversor,
    produto.placas,
    produto.valor,
    produto.disponivel,
  ]);
  produto.id = resposta.inserirProduto;
  return produto;
}

export async function alterarImagem(imagem, id) {
  const comando = `UPDATE tb_produto 
          SET img_kit     = ?
      WHERE id_produto      = ? `;

  const [resposta] = await con.query(comando, [imagem, id]);
  return resposta.affectedRows;
}

export async function listarTodosProdutos() {
  const comando = `SELECT id_produto		    id,
              nm_descricao    nome,
              nm_inversor     inversor,
              nm_placas       placas, 
              vl_kit      	  valor,
              bt_disponivel	  disponivel
         FROM tb_produto`;

  const [linhas] = await con.query(comando);
  return linhas;
}

export async function buscarPorId(id) {
  const comando = `SELECT id_produto		    id,
                  nm_descricao    nome,
                  nm_inversor     inversor,
                  nm_placas       placas, 
                  vl_kit      	  valor,
                  bt_disponivel	  disponivel,
                  img_kit         imagem
                FROM tb_produto
                WHERE id_produto = ? `;

  const [linhas] = await con.query(comando, [id]);
  return linhas[0];
}

export async function buscarPorNome(nome) {
  const comando = `SELECT id_produto		    id,
                   nm_descricao    nome,
                   nm_inversor     inversor,
                   nm_placas       placas, 
                   vl_kit      	  valor,
                   bt_disponivel	  disponivel,
                  img_kit         imagem
                FROM tb_produto
                WHERE nm_descricao like ? `;

  const [linhas] = await con.query(comando, [`%${nome}%`]);
  return linhas;
}

export async function removerProduto(id) {
  const comando = `DELETE FROM tb_produto 
             WHERE id_produto = ? `;

  const [resposta] = await con.query(comando, [id]);
  return resposta.affectedRows;
}

export async function alterarProduto(id, produto) {
  const comando = `UPDATE tb_produto 
          SET nm_descricao  = ?,
              nm_inversor   = ?,
              nm_placas     = ?,
              vl_kit        = ?,
              bt_disponivel = ?
        WHERE id_produto    = ?`;

  const [resposta] = await con.query(comando, [
    produto.descricao,
    produto.inversor,
    produto.placas,
    produto.valor,
    produto.disponivel,
    id,
  ]);
  return resposta.affectedRows;
}
