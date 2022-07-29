import { Dispatch, SetStateAction, useEffect, useState } from "React";
import Axios from "axios";
import React from "React";
import Card from './src/components/Card'

export interface IValues {
  id: number;
  name: string;
  cost: string;
  category: string;
  setValues: React.SetStateAction<any>
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

export default function App() {
  const [values, setValues] = useState<IValues>();
  const [listCard, setListCard] = useState<IList[]>();
  console.log(listCard);
  const handleRegisterGame = () => {
    Axios.post("http://localhost:3001/register", {
      name: values?.name,
      cost: values?.cost,
      category: values?.category,
    }).then(() => {
      Axios.post("http://localhost:3001/search", {
        name: values!.name,
        cost: values!.cost,
        category: values?.category,
      }).then((response) => {
        setListCard([
          ...listCard,
          {
            id: response.data[0].id,
            name: values?.name,
            cost: values?.cost,
            category: values?.category,
          },
        ]);
      });
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListCard(response.data);
    });
  }, []);

  const handleaddValues = (value) => {
    setValues((prevValues) => ({
      ...prevValues,
      [value.target.name]: value.target.value,
    }));
  };

  return (
    <div className="app-container">
      <div className="register-container">
        <h1 className="register-title">Scrim Shop</h1>

        <input
          type="text"
          name="name"
          placeholder="Nome"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Preço"
          name="cost"
          className="register-input"
          onChange={handleaddValues}
        />
        <input
          type="text"
          placeholder="Categoria"
          name="category"
          className="register-input"
          onChange={handleaddValues}
        />

        <button onClick={handleRegisterGame} className="register-button">
          Cadastrar
        </button>
      </div>

      {listCard?.map((val) => (
        <Card
          listCard={listCard}
          setListCard={setListCard}
          key={val.id}
          id={val.id}
          name={val.name}
          cost={val.cost}
          category={val.category}
        />
      ))}
    </div>
  );
}
