import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";

const FormContainer = styled.form`
  display: flex;
  align-items: flex-end;
  gap: 10px;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
`;

const InputArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  width: 120px;
  padding: 0 10px;
  border: 1px solid #bbb;
  border-radius: 5px;
  height: 40px;
`;

const Label = styled.label``;

const Button = styled.button`
  padding: 10px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  background-color: #2c73d2;
  color: white;
  height: 42px;
`;

const Form = ({ getUsers, onEdit, setOnEdit }) => {
  const ref = useRef();

  useEffect(() => {
    if (onEdit) {
      console.log({onEdit});

      const user = ref.current;
      user.nome.value = onEdit.nome;
      user.cpf.value = onEdit.cpf;
      user.dataDeNascimento.value = onEdit.dataDeNascimento;
    }
  }, [onEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nome = e.target[0].value
    const cpf = e.target[1].value
    const dataDeNascimento = e.target[2].value
    const user = ref.current;

    console.log({nome, cpf, dataDeNascimento});

    if (
      !user.cpf.value
    ) {
      return toast.warn("Preencha o campo CPF!");
    }

    if (
      user.cpf.value.length !== 11
    ) {
      return toast.warn("CPF inválido!");
    }

    if (onEdit) {
      console.log({onEdit});
      await axios
        .put("http://localhost:8800/clientes/" + onEdit._id, {
          nome,
          cpf,
          dataDeNascimento
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
        toast.success("Dados atualizados!");
    } else {
      console.log(user);
      await axios
        .post("http://localhost:8800/clientes", {
          nome,
          cpf,
          dataDeNascimento
        })
        .then(({ data }) => toast.success(data))
        .catch(({ data }) => toast.error(data));
        return toast.success("Cliente cadastrado com sucesso!");
    }

    setOnEdit(null);
    getUsers();
  };

  return (
    <FormContainer ref={ref} onSubmit={handleSubmit}>
      <InputArea>
        <Label>Nome</Label>
        <Input name="nome" />
      </InputArea>
      <InputArea>
        <Label>CPF</Label>
        <Input name="cpf" type='number' />
      </InputArea>
      <InputArea>
        <Label>Data de Nascimento</Label>
        <Input name="dataDeNascimento" type="date" />
      </InputArea>

      <Button type="submit">SALVAR</Button>
    </FormContainer>
  );
};

export default Form;