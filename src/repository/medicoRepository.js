import { con } from './connection.js';

export async function inserirMedico(medico) {
  const comando = `INSERT INTO medico (crm, nome, id_especialidade) value (?,?,?)`;

  const [resposta] = await con.query(comando, [
    medico.crm,
    medico.nome,
    medico.id_especialidade,
  ]);
  medico.crm = resposta.inserirMedico;
  return medico;
}

/*export async function alterarImagem(imagem, id) {
  const comando = `UPDATE tb_filme 
          SET img_filme     = ?
      WHERE id_filme        = ? `;

  const [resposta] = await con.query(comando, [imagem, id]);
  return resposta.affectedRows;
}*/

export async function listarTodosMedicos() {
  const comando = `SELECT crm,nome,id_especialidade FROM medico`;

  const [linhas] = await con.query(comando);
  return linhas;
}

export async function buscarPorId(crm) {
  const comando = `SELECT crm,nome,id_especialidade FROM medico WHERE crm = ? `;

  const [linhas] = await con.query(comando, [crm]);
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

export async function removerMedico(crm) {
  const comando = `DELETE FROM medico 
             WHERE crm = ? `;

  const [resposta] = await con.query(comando, [crm]);
  return resposta.affectedRows;
}

export async function alterarMedico(crm, medico) {
  const comando = `UPDATE login 
          SET nome               = ?,
              id_especialidade   = ?,
             
        WHERE crm        = ?`;

  const [resposta] = await con.query(comando, [
    medico.nome,
    medico.id_especialidade,
    crm,
  ]);
  return resposta.affectedRows;
}
