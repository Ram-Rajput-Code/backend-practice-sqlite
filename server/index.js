// index.js

const express = require("express");
const {
  createItem,
  readItems,
  updateItem,
  deleteItem,
  readItemById,
} = require("./CrudOperations/itemsCrud");
const {
  createUser,
  readUsers,
  readUserById,
  updateUser,
  deleteUser,
} = require("./CrudOperations/userCrud");
const {
  createHomeCard,
  readHomeCards,
  readHomeCardById,
  updateHomeCard,
  deleteHomeCard,
} = require("./CrudOperations/homeCardsCrud"); // Add this line
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Serve uploaded images statically
app.use("/uploads", express.static(uploadDir));

// Routes for items
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
      res.status(200).send(`Item added with ID: ${data.ID}`);
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

// Routes for users
app.get("/users", (req, res) => {
  readUsers((err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).json(rows);
    }
  });
});

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

// Routes for homeCards
app.get("/homeCards", (req, res) => {
  readHomeCards((err, rows) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).json(rows);
    }
  });
});

app.get("/homeCards/:id", (req, res) => {
  const { id } = req.params;
  readHomeCardById(id, (err, row) => {
    if (err) {
      res.status(500).send(err.message);
    } else if (!row) {
      res.status(404).send(`Home card with ID ${id} not found.`);
    } else {
      res.status(200).json(row);
    }
  });
});

app.post("/homeCards", (req, res) => {
  const { icon, heading, content } = req.body;
  createHomeCard(icon, heading, content, (err, data) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send(`Home card added with ID: ${data.ID}`);
    }
  });
});

app.put("/homeCards/:id", (req, res) => {
  const { id } = req.params;
  const { icon, heading, content } = req.body;
  updateHomeCard(id, icon, heading, content, (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send(`Home card with ID ${id} updated.`);
    }
  });
});

app.delete("/homeCards/:id", (req, res) => {
  const { id } = req.params;
  deleteHomeCard(id, (err) => {
    if (err) {
      res.status(500).send(err.message);
    } else {
      res.status(200).send(`Home card with ID ${id} deleted.`);
    }
  });
});

// Import SQLite database
const db = require("./config/database");

// Upload an image
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const imagePath = `/uploads/${req.file.filename}`;
  db.run(
    "INSERT INTO homepage_slider (image) VALUES (?)",
    [imagePath],
    function (err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.status(201).json({ id: this.lastID, image: imagePath });
    }
  );
});

// Get all images
app.get("/slider-images", (req, res) => {
  db.all("SELECT * FROM homepage_slider", [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).json(rows);
  });
});

// Update an image
app.put("/slider-images/:id", upload.single("image"), (req, res) => {
  const { id } = req.params;
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const newImagePath = `/uploads/${req.file.filename}`;
  db.run(
    "UPDATE homepage_slider SET image = ? WHERE id = ?",
    [newImagePath, id],
    function (err) {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.status(200).json({ id, image: newImagePath });
    }
  );
});

// Delete an image
app.delete("/slider-images/:id", (req, res) => {
  const { id } = req.params;

  db.get("SELECT image FROM homepage_slider WHERE id = ?", [id], (err, row) => {
    if (err || !row) {
      return res.status(404).send("Image not found.");
    }

    const filePath = path.join(__dirname, row.image);
    fs.unlink(filePath, (err) => {
      if (err) console.error("Failed to delete file:", err);
    });

    db.run("DELETE FROM homepage_slider WHERE id = ?", [id], (err) => {
      if (err) {
        return res.status(500).send(err.message);
      }
      res.status(200).send(`Image with ID ${id} deleted.`);
    });
  });
});

// Start server
app.listen(3001, () => {
  console.log("Server is running on http://localhost:3001");
});
