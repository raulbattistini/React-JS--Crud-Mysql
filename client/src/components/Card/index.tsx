import {useState} from 'react'
import "./card.css";
import FormDialog from "../dialog";

interface IValues {
  name: string;
  cost: string;
  category: string;
  setValues: React.SetStateAction<any>;
  id: number;
}

interface IList {
  id: number;
  name: string;
  cost: string;
  category: string;
  listCard: [
    {
      name: string;
      cost: string;
      category: string;
      setValues: React.SetStateAction<any>;
      id: number;
    }
  ];
  setListCard: React.SetStateAction<IValues>;
  open?: boolean;
}

export default function Card(props: IList) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <FormDialog
        open={true}
        setOpen={setOpen}
        title={props.name}
        category={props.category}
        cost={props.cost}
        listCard={props?.listCard}
        setListCard={props.setListCard}
        id={props.id}
        name={""}
      />
      <div className="card-container" onClick={() => setOpen(true)}>
        <h1 className="card-title">{props.name}</h1>
        <p className="card-id">{props.id}</p>
        <p className="card-cartegory">{props.category}</p>
        <h3 className="card-cost">R${props.cost}</h3>
      </div>
    </>
  );
}
