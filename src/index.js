import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import loginController from './controller/loginController.js';
import especialidadeController from './controller/especialidadeController.js';
import medicoController from './controller/medicoController.js';

const servidor = express();
servidor.use(cors());
servidor.use(express.json());

servidor.use(medicoController);
servidor.use(especialidadeController);
servidor.use(loginController);

servidor.listen(process.env.PORT, () => console.log('API subiu!'));
