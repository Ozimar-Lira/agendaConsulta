import { con } from './connection.js';

export async function inserirPaciente(paciente) {
  const comando = `INSERT INTO paciente (cpf, nome, data_nascimento, id_especialidade, genero) value (?,?,?,?,?)`;

  const [resposta] = await con.query(comando, [
    paciente.cpf,
    paciente.nome,
    paciente.data_nascimento,
    paciente.id_especialidade,
    paciente.genero,
  ]);
  paciente.cpf = resposta.inserirPaciente;
  return paciente;
}

/*export async function alterarImagem(imagem, id) {
  const comando = `UPDATE tb_filme 
          SET img_filme     = ?
      WHERE id_filme        = ? `;

  const [resposta] = await con.query(comando, [imagem, id]);
  return resposta.affectedRows;
}*/

export async function listarTodosPacientes() {
  const comando = `SELECT cpf, nome,data_nascimento, id_especialidade, genero FROM paciente`;

  const [linhas] = await con.query(comando);
  return linhas;
}

export async function buscarPorId(cpf) {
  const comando = `cpf, nome,data_nascimento, id_especialidade, genero FROM paciente WHERE cpf = ? `;

  const [linhas] = await con.query(comando, [cpf]);
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

export async function removerPaciente(cpf) {
  const comando = `DELETE FROM paciente 
             WHERE cpf = ? `;

  const [resposta] = await con.query(comando, [cpf]);
  return resposta.affectedRows;
}

export async function alterarPaciente(cpf, paciente) {
  const comando = `UPDATE paciente 
          SET nome              = ?,
              data_nascimento   = ?,
              id_especialidade  = ?,
              genero            = ?    
             
        WHERE cpf         = ?`;

  const [resposta] = await con.query(comando, [
    paciente.nome,
    paciente.data_nascimento,
    paciente.id_especialidade,
    paciente.genero,
    cpf,
  ]);
  return resposta.affectedRows;
}
