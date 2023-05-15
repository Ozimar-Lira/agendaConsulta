import { con } from './connection.js';

export async function inserirClinica(clinica) {
  const comando = `INSERT INTO clinica (nome_clinica, cep_clinica) value (?,?)`;

  const [resposta] = await con.query(comando, [
    clinica.nome_clinica,
    clinica.cep_clinica,
  ]);
  clinica.id = resposta.inserirClinica;
  return clinica;
}

/*export async function alterarImagem(imagem, id) {
  const comando = `UPDATE tb_filme 
          SET img_filme     = ?
      WHERE id_filme        = ? `;

  const [resposta] = await con.query(comando, [imagem, id]);
  return resposta.affectedRows;
}*/

export async function listarTodosClinicas() {
  const comando = `SELECT id_clinica, nome_clinica,cep_clinica FROM clinica`;

  const [linhas] = await con.query(comando);
  return linhas;
}

export async function buscarPorId(id) {
  const comando = `SELECT id_clinica, nome_clinica,cep_clinica FROM clinica WHERE id_clinica = ? `;

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

export async function removerClinica(id) {
  const comando = `DELETE FROM clinica 
             WHERE id_clinica = ? `;

  const [resposta] = await con.query(comando, [id]);
  return resposta.affectedRows;
}

export async function alterarClinica(id, clinica) {
  const comando = `UPDATE clinica 
          SET nome_clinica       = ?,
              cep_clinica        = ?
             
        WHERE id_clinica         = ?`;

  const [resposta] = await con.query(comando, [
    clinica.nome_clinica,
    clinica.cep_clinica,
    id,
  ]);
  return resposta.affectedRows;
}
