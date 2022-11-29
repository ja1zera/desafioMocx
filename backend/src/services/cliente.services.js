import {
  getAll, newCliente, clienteExists, deleta, update,
} from '../models/cliente.model';

const todos = async () => {
  const clientes = await getAll();
  return clientes;
};

const criar = async ({ nome, cpf, dataDeNascimento }) => {
  const doc = await clienteExists({ cpf });

  if (doc) {
    return { message: 'CPF já cadastrado!' };
  }
  if (cpf.length !== 11) {
    return { message: 'O campo CPF deve conter 11 dígitos!' };
  }

  const cliente = await newCliente({ nome, cpf, dataDeNascimento });
  return cliente;
};

const deletar = async ({ id }) => {
  const doc = await clienteExists({ id });

  if (!doc) return { message: 'Cliente não encontrado.' };
  const cliente = await deleta({ id });
  return cliente;
};

const atualizar = async ({
  id, nome, cpf, dataDeNascimento,
}) => {
  const doc = await clienteExists({ id });
  if (!doc) return { message: 'Cliente não encontrado.' };

  const cliente = await update({
    id, nome, cpf, dataDeNascimento,
  });
  return cliente;
};

export {
  todos, criar, deletar, atualizar,
};
