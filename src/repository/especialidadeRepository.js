import { con } from './connection.js';

export async function inserirEspecialidade(especialidade) {
  const comando = `INSERT INTO especialidade (nome) value (?)`;

  const [resposta] = await con.query(comando, [especialidade.nome]);
  especialidade.id_especialista = resposta.inserirEspecialidade;
  return especialidade;
}

/*export async function alterarImagem(imagem, id) {
  const comando = `UPDATE tb_filme 
          SET img_filme     = ?
      WHERE id_filme        = ? `;

  const [resposta] = await con.query(comando, [imagem, id]);
  return resposta.affectedRows;
}*/

export async function listarTodasEspecialidades() {
  const comando = `SELECT id_especialista  id, nome  nome FROM especialidade`;

  const [linhas] = await con.query(comando);
  return linhas;
}

export async function buscarPorId(id) {
  const comando = `SELECT id_especialidade,nome FROM especialidade WHERE id_especialidade = ? `;

  const [linhas] = await con.query(comando, [id]);
  return linhas[0];
}

/*export async function buscarPorNome(nome) {
  const comando = `SELECT id_filme		    id,
              nm_filme		    nome,
              vl_avaliacao	  avaliacao,
              dt_lancamento	  lancamento,
              bt_disponivel	  disponivel
         FROM tb_filme
        WHERE nm_filme like ? `;

  const [linhas] = await con.query(comando, [`%${nome}%`]);
  return linhas;
}
*/

export async function removerEspecialidade(id) {
  const comando = `DELETE FROM especialidade 
             WHERE id_especialista = ? `;

  const [resposta] = await con.query(comando, [id]);
  return resposta.affectedRows;
}

export async function alterarEspecialidade(id, especialidade) {
  const comando = `UPDATE especialidade SET nome = ? WHERE id_especialista = ?`;
  const [resposta] = await con.query(comando, [especialidade.nome, id]);
  return resposta.affectedRows;
}
