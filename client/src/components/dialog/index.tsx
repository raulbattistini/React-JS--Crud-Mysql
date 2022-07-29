import React, { Dispatch, SetStateAction, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Axios from "axios";
import produce from "immer";
import { api } from "../../services/api";
import { Form, Formik } from "formik";

export interface IValues {
  id: number;
  name: string;
  cost: string;
  category: string;
  setValues: React.SetStateAction<any>;
}

interface IList {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  id: number;
  name: string;
  cost: string;
  category: string;
  listCard: IValues[];
  setListCard: React.SetStateAction<IValues>;
}

export default function FormDialog(props: IList) {

//  states
  const [editValues, setEditValues] = useState({
    id: props.id,
    name: props.title,
    cost: props.cost,
    category: props.category,
  });
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = useState([]);
  const [postData, setPostData] = useState([]);



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.BaseSyntheticEvent) => {
    setValues(e.currentTarget.values);
  };

  const handleUpdate = async (id: number, values: IValues) => {
    const updatePost = {
      id: values.id,
      name: values.name,
      cost: values.cost,
      category: values.category
    };
    const res = await api.put(`/posts/${id}`, updatePost);
  };

  const handleSubmitUpdate = (id: number, values: IValues) => {
    handleUpdate(id, values);
    loadPost();
  };

  // http
  const loadPost = async () => {
    const res = await api.get("/registro1");
    setPostData(res.data);
  };

  const getSinglePost = async (id: number) => {
    const res = await api.get(`/posts/${id}`);
  };

  const remove = async (id: number) => {
    const res = await api.delete(`/posts/${id}`);
    loadPost();
  };

  const handleSubmit = async (values: IValues) => {
    const addPost = {
      id: values.id,
      name: values.name,
      cost: values.cost,
      category: values.category
    };
    api.post("/api/game", addPost);
  };

  return (
    <>
      <Dialog
        open={props.open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <Formik
          initialValues={{}} //criar state pra armazenar o que esta no objeto segundo o id
          onSubmit={() => {}}
        >
          {({ values, errors, touched, handleChange }) => {
            return (
              <Form>
                <DialogTitle id="form-dialog-title">Editar</DialogTitle>
                <DialogContent>
                  <TextField
                    disabled
                    margin="dense"
                    id="id"
                    label="id"
                    defaultValue={props.id}
                    type="text"
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nome do jogo"
                    defaultValue={props.title}
                    type="text"
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="cost"
                    label="preço"
                    defaultValue={props.cost}
                    type="number"
                    onChange={handleChange}
                    fullWidth
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="category"
                    label="Categoria"
                    defaultValue={props.category}
                    type="text"
                    onChange={handleChange}
                    fullWidth
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    onClick={(id) => remove(id)}
                  >
                    Excluir
                  </Button>
                  <Button
                    color="primary"
                    type="submit"
                  >
                    Salvar
                  </Button>
                </DialogActions>
              </Form>
            );
          }}
        </Formik>
      </Dialog>
    </>
  );
}
