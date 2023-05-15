import { con } from './connection.js';

export async function inserirLogin(login) {
  const comando = `INSERT INTO login (cpf, email, senha, tipo_login) value (?,?,?,?)`;

  const [resposta] = await con.query(comando, [
    login.cpf,
    login.email,
    login.senha,
    login.tipo_login,
  ]);
  login.cpf = resposta.inserirLogin;
  return login;
}

/*export async function alterarImagem(imagem, id) {
  const comando = `UPDATE tb_filme 
          SET img_filme     = ?
      WHERE id_filme        = ? `;

  const [resposta] = await con.query(comando, [imagem, id]);
  return resposta.affectedRows;
}*/

export async function listarTodosLogins() {
  const comando = `SELECT cpf,email,senha,tipo_login FROM login`;

  const [linhas] = await con.query(comando);
  return linhas;
}

export async function buscarPorId(cpf) {
  const comando = `SELECT cpf,email,senha,tipo_login FROM login WHERE cpf = ? `;

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

export async function removerLogin(cpf) {
  const comando = `DELETE FROM login 
             WHERE cpf = ? `;

  const [resposta] = await con.query(comando, [cpf]);
  return resposta.affectedRows;
}

export async function alterarLogin(cpf, login) {
  const comando = `UPDATE login 
          SET email      = ?,
              senha      = ?,
              tipo_login = ?
        WHERE cpf        = ?`;

  const [resposta] = await con.query(comando, [
    login.email,
    login.senha,
    login.tipo_login,
    cpf,
  ]);
  return resposta.affectedRows;
}
