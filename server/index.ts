import express, { Request, Response } from "express";

const app = express();

import mysql from "mysql";

import bodyParser from "body-parser";

import cors from "cors";

var db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "crudgames"
});



app.get("/api/games", (req: Request, res: Response) => {
  let SQL = "INSERT INTO games (  name, cost, category  ) VALUES ( 'FarCry5', '120', 'Acao' )"

  db.query(SQL, (err, result)=>{
   console.log(err)
  })
});

app.post("/api/CreateGame", async (req: Request, res: Response) => {
   db.connect(function (err) {
      if (err) throw err;
      console.log("Connected!");
    });

   try{
      const {name, cost, category} = await req.body;
      console.log(name, cost, category);
      const query = `INSERT INTO games (  name, cost, category  ) VALUES ( "oi", "oi", "oi" )`;
      console.log(query);

      db.query(query,function (err, result) {
         if (err) throw err;
         console.log("1 record inserted");
       });

      const data = `SELECT name,cost,category FROM games WHERE name=${name},cost=${cost},category=${category} `;

      res.status(200).json({data});

   }catch(e){
      res.status(500).json({
         message: "Erro no Servidor " + e.error
      })
   }
   
})

app.listen(3333, () => {
  console.log("Server is running on port 3333");
});
