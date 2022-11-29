import {
  todos, criar, deletar, atualizar,
} from '../services/cliente.services';

const getAll = async (req, res) => {
  const clientes = await todos();

  return res.status(200).json(clientes);
};

const createCliente = async (req, res) => {
  const { nome, cpf, dataDeNascimento } = req.body;
  const { id } = req.params;

  const cliente = await criar({
    id, nome, cpf, dataDeNascimento,
  });
  return res.status(200).json(cliente);
};

const deleteCliente = async (req, res) => {
  const { id } = req.params;
  const cliente = await deletar({ id });
  return res.status(200).json(cliente);
};

const updateCliente = async (req, res) => {
  const { nome, cpf, dataDeNascimento } = req.body;
  const { id } = req.params;

  const cliente = await atualizar({
    id, nome, cpf, dataDeNascimento,
  });
  return res.status(200).json(cliente);
};

export {
  getAll, createCliente, deleteCliente, updateCliente,
};
