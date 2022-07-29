import { Dispatch, SetStateAction, useEffect, useState } from "React";
import Axios from "axios";
import React from "React";
import Card from "./src/components/Card";
import { Formik, Form } from "formik";
import { api } from "./src/services/api";

export interface IValues {
  id: number;
  name: string;
  cost: string;
  category: string;
  setValues: React.SetStateAction<any>;
  setListCard: SetStateAction<IValues[] | undefined>;
}

export default function App() {
  const [values, setValues] = useState<IValues>();
  const [listCard, setListCard] = useState<IValues[]>();
  console.log(listCard);

  const handleSubmit = async (values) => {
    const addPost = {
      id: values.id,
      name: values.name,
      cost: values.cost,
      category: values.category,
    };
    api.post("/api/games", addPost);
  };

  useEffect(() => {
    Axios.get("http://localhost:3333/api/games").then((response) => {
      setListCard(response.data);
    });
  }, []);

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
          onSubmit={(values) => handleSubmit(values)}
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
          setListCard={()=>{}}
        />
      ))}
    </div>
  );
}
