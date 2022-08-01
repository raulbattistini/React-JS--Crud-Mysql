import { useEffect, useState } from "react";
import Axios from "axios";
import React from "React";
import Card from "./components/Card";
import { Formik, Form } from "formik";
import { api } from "./services/api";
import { CardAction, useCard } from "./contexts/CardContext";

export interface IValues {
  id: number;
  name: string;
  cost: string;
  category: string;
}

export default function App() {
  //states
  const [values, setValues] = useState<IValues>();
  const [listCard, setListCard] = useState<IValues[]>();
  const [postData, setPostData] = useState();
  console.log(listCard);

  //effect
  useEffect(() => {
    loadPost();
  }, []);

  //hook proprio

  const {state, dispatch} = useCard()

  //http
  const handleSubmit = async (name: string, cost: string, category: string) => {
    dispatch({
      type: CardAction.setName,
      payload: name
    })
    dispatch({
      type: CardAction.setCost,
      payload: cost
    })
    dispatch({
      type: CardAction.setCategory,
      payload: category
    })
  };


  const loadPost = async () => {
    const res = await api.get("/search");
    setPostData(res.data);
  };

  return (
    <div className="app-container">
      <div className="register-container">
        <h1 className="register-title">Scrim Shop</h1>
        <Formik
          // validationSchema={schema}
          initialValues={{
            name: "",
            cost: "",
            category: "",
          }}
          onSubmit={(state) => handleSubmit(state.name, state.cost, state.category)}
        >
          {({ values, errors, touched, handleChange }) => {
            return (
              <Form>
                <input
                  type="text"
                  name="name"
                  placeholder="Nome"
                  className="register-input"
                  onChange={handleChange}
                  value={values.name}
                />
                <input
                  type="text"
                  placeholder="Preço"
                  name="cost"
                  className="register-input"
                  onChange={handleChange}
                  value={values.cost}
                />
                <input
                  type="text"
                  placeholder="Categoria"
                  name="category"
                  className="register-input"
                  onChange={handleChange}
                  value={values.category}
                />

                <button type="submit" className="register-button">
                  Cadastrar
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>

      {listCard?.map((val) => (
        <Card
          key={val.id}
          id={val.id}
          name={val.name}
          cost={val.cost}
          category={val.category}
          listCard={[
            {
              name: "",
              cost: "",
              category: "",
              setValues: null,
              id: 0,
            },
          ]}
          setListCard={(value) => value}
        />
      ))}
    </div>
  );
}
