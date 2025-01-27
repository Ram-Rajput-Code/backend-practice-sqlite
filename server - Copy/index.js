const express = require("express");
const { createItem, readItems, updateItem, deleteItem, readItemById } = require("./crud");
const app = express();

app.use(express.json());

app.get("/items", (req, res) => {
  readItems((err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).json(rows);
    }
  });
});

app.post("/items", (req, res) => {
  const { name, description } = req.body;
  createItem(name, description, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send(`Item is added ID: ${data.ID}`);
    }
  });
});

app.put("/items/:id", (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).send("Name and description are required.");
    }
    updateItem(id, name, description, (err) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).send(`Item with ID ${id} updated.`);
      }
    });
  });

  app.delete("/items/:id", (req, res) => {
    const { id } = req.params;
    deleteItem(id, (err) => {
      if (err) {
        res.status(500).send(err.message);
      } else {
        res.status(200).send(`Item with ID ${id} deleted.`);
      }
    });
  });
  
  app.get("/items/:id", (req, res) => {
    const { id } = req.params;
    readItemById(id, (err, row) => {
      if (err) {
        res.status(500).send(err.message);
      } else if (!row) {
        res.status(404).send(`Item with ID ${id} not found.`);
      } else {
        res.status(200).json(row);
      }
    });
  });
  

app.listen(3001, () => {
  console.log("server is running ");
});
