import { ObjectId } from 'mongodb';
import connection from './mongoConnection';

const getAll = async () => {
  const db = await connection();
  return db.collection('clientes').find().toArray();
};

const newCliente = async ({ nome, cpf, dataDeNascimento }) => {
  const db = await connection();
  const cliente = await db.collection('clientes').insertOne({ nome, cpf, dataDeNascimento });
  const { insertedId: _id } = cliente;
  return {
    nome, cpf, dataDeNascimento, _id,
  };
};

const clienteExists = async ({ cpf, id }) => {
  const db = await connection();
  let cliente = null;
  if (id) {
    cliente = await db.collection('clientes').findOne({ _id: ObjectId(id) });
  } else {
    cliente = await db.collection('clientes').findOne({ cpf });
  }
  return cliente;
};

const deleta = async ({ id }) => {
  const db = await connection();
  await db.collection('clientes').deleteOne({ _id: ObjectId(id) });
  return { id };
};

const update = async ({
  id, nome, cpf, dataDeNascimento,
}) => {
  const db = await connection();
  await db.collection('clientes').updateOne({ _id: ObjectId(id) }, { $set: { nome, cpf, dataDeNascimento } });
  return {
    id, nome, cpf, dataDeNascimento,
  };
};

export {
  getAll, newCliente, clienteExists, deleta, update,
};
