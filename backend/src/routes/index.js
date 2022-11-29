import { Router } from 'express';
import {
  getAll, createCliente, deleteCliente, updateCliente,
} from '../controllers/cliente.controller';

const routes = new Router();

routes.get('/', (req, res) => {
  res.status(200).json({ ok: 'conected' });
});

routes.get('/clientes', getAll);

routes.post('/clientes', createCliente);

routes.delete('/clientes/:id', deleteCliente);

routes.put('/clientes/:id', updateCliente);

export default routes;
