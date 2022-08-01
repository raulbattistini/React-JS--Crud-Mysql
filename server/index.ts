import express, { Request, Response } from "express";

const app = express();

import mysql from "mysql";

import bodyParser from "body-parser";

import cors from "cors";

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "crudgames",
});

app.post("/register", async (req: Request, res: Response) => {
  con.connect(function (err: Error) {
    if (err) throw err;
    console.log("Connected!");
  });
  try {
    const { name, cost, category } = req.body;

    let mysql = "INSERT INTO games ( name, cost, category) VALUES (?, ?, ?)";
    con.query(mysql, [name, cost, category], (err: Error, response: Response) => {
      res.send(response);
    });
  } catch (e) {
    res.status(500).json({
      message: "Erro no Servidor " + e.error,
    });
  }
});

app.post("/search", async (req: Request, res: Response) => {
  con.connect(function (err: Error) {
    if (err) throw err;
    console.log("Connected!");
  });
  try {
    const { name, cost, category } = await req.body;

    let mysql =
      "SELECT * from games WHERE name = ? AND cost = ? AND category = ?";
    con.query(mysql, [name, cost, category], (err: Error, response: Response) => {
      if (err) res.send(err);
      res.send(response);
    });
  } catch (e) {
    res.status(500).json({
      message: "Erro no Servidor " + e.error,
    });
  }
});

app.get("/getCards", async (req: Request, res: Response) => {
  con.connect(function (err: Error) {
    if (err) throw err;
    console.log("Connected!");
  });
  try {
    let mysql = "SELECT * FROM games";
    con.query(mysql, (err: Error, response: Response) => {
      if (err) {
        console.log(err);
      } else {
        res.send(response);
      }
    });
  } catch (e) {
    res.status(500).json({
      message: "Erro no Servidor " + e.error,
    });
  }
});

app.put("/edit", async (req: Request, res: Response) => {
  con.connect(function (err: Error) {
    if (err) throw err;
    console.log("Connected!");
  });
  try {
    const { id, name, cost, category } = await req.body;
    let mysql =
      "UPDATE games SET name = ?, cost = ?, category = ? WHERE id = ?";
    con.query(
      mysql,
      [name, cost, category, id],
      (err: Error, response: Response) => {
        if (err) {
          res.send(err);
        } else {
          res.send(response);
        }
      }
    );
  } catch (e) {
    res.status(500).json({
      message: "Erro no Servidor " + e.error,
    });
  }
});

app.delete("/delete/:id", async (req: Request, res: Response) => {
  con.connect(function (err: Error) {
    if (err) throw err;
    console.log("Connected!");
  });
  try {
    const { id } = await req.params;
    let mysql = "DELETE FROM games WHERE id = ?";
    con.query(mysql, id, (err: Error, response: Response) => {
      if (err) {
        console.log(err);
      } else {
        res.send(response);
      }
    });
  } catch (e) {
    res.status(500).json({
      message: "Erro no Servidor " + e.error,
    });
  }
});
app.listen(3333, () => {
  console.log("Server is running on port 3333");
});
