CREATE DATABASE agendaConsultaDB;
USE agendaConsultaDB;
CREATE TABLE clinica (
  id_clinica INT PRIMARY KEY,
  nome_clinica VARCHAR(100),
  cep_clinica VARCHAR(8)
);
CREATE TABLE especialidade (
  id_especialidade INT PRIMARY KEY,
  nome VARCHAR(100));
CREATE TABLE medico (
  CRM VARCHAR(10) PRIMARY KEY,
  nome VARCHAR(100),
  id_especialidade INT,
  FOREIGN KEY (id_especialidade) REFERENCES especialidade(id_especialidade)
);
CREATE TABLE paciente (
  cpf VARCHAR(11) PRIMARY KEY,
  nome VARCHAR(100),
  data_nascimento DATE,
  id_especialidade INT,
  genero ENUM('Masculino', 'Feminino'),
  FOREIGN KEY (id_especialidade) REFERENCES especialidade(id_especialidade)
);
CREATE TABLE consulta (
  id_consulta INT PRIMARY KEY,
  cpf_paciente VARCHAR(11),
  CRM_medico VARCHAR(10),
  id_clinica INT,
  data_agenda_inicio DATETIME,
  data_agenda_fim DATETIME,
  data_real_inicio DATETIME,
  data_real_fim DATETIME,
  FOREIGN KEY (cpf_paciente) REFERENCES paciente(cpf),
  FOREIGN KEY (CRM_medico) REFERENCES medico(CRM),
  FOREIGN KEY (id_clinica) REFERENCES clinica(id_clinica));
CREATE TABLE prontuario (
  id_prontuario INT PRIMARY KEY,
  id_consulta INT,
  anamnese TEXT,
  resultado_exames TEXT,
  diagnostico TEXT,
  FOREIGN KEY (id_consulta) REFERENCES consulta(id_consulta));