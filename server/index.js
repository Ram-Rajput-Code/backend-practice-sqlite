const express = require("express");
const { createItem, readItems, updateItem, deleteItem, readItemById } = require("./itemsCrud");
const { createUser, readUsers, readUserById, updateUser, deleteUser } = require("./userCrud");
const app = express();
const cors = require("cors");
app.use(cors());

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
  

// Get all users
app.get("/users", (req, res) => {
  readUsers((err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).json(rows);
    }
  });
});

// Get user by ID
app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  readUserById(id, (err, row) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (!row) {
      res.status(404).send(`User with ID ${id} not found.`);
    } else {
      res.status(200).json(row);
    }
  });
});

// Create a new user
app.post("/users", (req, res) => {
  const { username, email, password } = req.body;
  createUser(username, email, password, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(201).send(`User added with ID: ${data.ID}`);
    }
  });
});

// Update user
app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;
  updateUser(id, username, email, password, (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send(`User with ID ${id} updated.`);
    }
  });
});

// Delete user
app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  deleteUser(id, (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send(`User with ID ${id} deleted.`);
    }
  });
});

//start server 

app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
