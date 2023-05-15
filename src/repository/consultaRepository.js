import { con } from './connection.js';

export async function inserirConsulta(consulta) {
  const comando = `INSERT INTO consulta (cpf_paciente, CRM_medico,id_clinica, data_agenda_inicio,data_agenda_fim, data_real_inicio, data_real_fim) value (?,?,?,?,?,?,?)`;

  const [resposta] = await con.query(comando, [
    consulta.cpf_paciente,
    consulta.crm_medico,
    consulta.id_clinica,
    consulta.data_agenda_inicio,
    consulta.data_agenda_fim,
    consulta.data_real_inicio,
    consulta.data_real_fim,
  ]);
  consulta.id = resposta.inserirConsulta;
  return consulta;
}

/*export async function alterarImagem(imagem, id) {
  const comando = `UPDATE tb_filme 
          SET img_filme     = ?
      WHERE id_filme        = ? `;

  const [resposta] = await con.query(comando, [imagem, id]);
  return resposta.affectedRows;
}*/

export async function listarTodasConsultas() {
  const comando = `SELECT id_consulta, cpf_paciente, CRM_medico,id_clinica, data_agenda_inicio,data_agenda_fim, data_real_inicio, data_real_fim FROM consulta`;

  const [linhas] = await con.query(comando);
  return linhas;
}

export async function buscarPorId(id) {
  const comando = `id_consulta, cpf_paciente, CRM_medico,id_clinica, data_agenda_inicio,data_agenda_fim, data_real_inicio, data_real_fim FROM consulta WHERE id_consulta = ? `;

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

export async function removerConsulta(id) {
  const comando = `DELETE FROM consulta 
             WHERE id_consulta = ? `;

  const [resposta] = await con.query(comando, [id]);
  return resposta.affectedRows;
}

export async function alterarConsulta(id, consulta) {
  const comando = `UPDATE consulta 
          SET cpf_paciente       = ?,
              crm_medico         = ?,
              id_clinica         = ? ,
              data_agenda_inicio = ?,
              data_agenda_fim    = ?,
              data_real_inicio   = ?,
              data_real_fim      = ?             
        WHERE id_clinica         = ?`;

  const [resposta] = await con.query(comando, [
    consulta.cpf_paciente,
    consulta.crm_medico,
    consulta.id_clinica,
    consulta.data_agenda_inicio,
    consulta.data_agenda_fim,
    consulta.data_real_inicio,
    consulta.data_real_fim,
    id,
  ]);
  return resposta.affectedRows;
}
