import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import filmeController from './controller/filmeController.js';

const servidor = express();
servidor.use(cors());
servidor.use(express.json());

servidor.use(filmeController);

servidor.listen(process.env.PORT, () => console.log('API subiu!'));
