import { con } from './connection.js';

export async function inserirProntuario(prontuario) {
  const comando = `INSERT INTO prontuario (id_consulta, anamnese, resultado_exames, diagnostico) value (?,?,?,?)`;

  const [resposta] = await con.query(comando, [
    prontuario.id_consulta,
    prontuario.anamnese,
    prontuario.resultado_exames,
    prontuario.diagnostico,
  ]);
  prontuario.id = resposta.inserirProntuario;

  return prontuario;
}

/*export async function alterarImagem(imagem, id) {
  const comando = `UPDATE tb_filme 
          SET img_filme     = ?
      WHERE id_filme        = ? `;

  const [resposta] = await con.query(comando, [imagem, id]);
  return resposta.affectedRows;
}*/

export async function listarTodosProntuarios() {
  const comando = `SELECT id_prontuario, id_consulta, anamnese, resultado_exames, diagnostico from prontuario`;

  const [linhas] = await con.query(comando);
  return linhas;
}

export async function buscarPorId(id) {
  const comando = `SELECT id_prontuario, id_consulta, anamnese, resultado_exames, diagnostico FROM prontuario WHERE id_prontuario = ? `;

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

export async function removerProntuario(id) {
  const comando = `DELETE FROM prontuario 
             WHERE id_prontuario = ? `;

  const [resposta] = await con.query(comando, [id]);
  return resposta.affectedRows;
}

export async function alterarProntuario(id, prontuario) {
  const comando = `UPDATE prontuario 
          SET 
              id_consulta      = ?,
              anamnese         = ?,
              resultado_exames = ?,
              diagnostico      = ?                       
          WHERE id_prontuario  = ?`;

  const [resposta] = await con.query(comando, [
    prontuario.id_consulta,
    prontuario.anamnese,
    prontuario.resultado_exames,
    prontuario.diagnostico,
    id,
  ]);
  return resposta.affectedRows;
}
