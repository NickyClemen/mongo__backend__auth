import Config  from './config';
const { port } = new Config();

import authRouter from './routes/auth';

import express, { Application } from 'express';
import { Server } from 'http';
import { AddressInfo } from 'net';

const app:Application = express();

app.use(express.json());

authRouter(app);

const server:Server = app.listen(port, () => {
    const { port } = server.address() as AddressInfo;

    console.log(`Servidor escuchando desde el puerto ${ port }.`);
});