// SUNUCUYU BU DOSYAYA KURUN
const express = require("express");
const Users = require("./users/model");
const server = express();
server.use(express.json());
server.get("/", (req, res) => {
  res.send("Server is running...");
});

// POST

server.post("/api/users", (req, res) => {
  let user = req.body;
  if (!user.name || !user.bio) {
    res
      .status(400)
      .json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" });
  } else {
    Users.insert(user)
      .then((newUser) => {
        res.status(201).json(newUser);
      })
      .catch((err) => {
        res.status(500);
        json({ message: "Veritabanına kaydedilirken bir hata oluştu" });
      });
  }
});

// GET

server.get("/api/users", (req, res) => {
  Users.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((err) => {
      res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" });
    });
});

server.get("/api/users/:id", (req, res) => {
  Users.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res
          .status(404)
          .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({ message: "Kullanıcı bilgisi alınamadı" });
    });
});

// DELETE

server.delete("/api/users/:id", (req, res) => {
  const id = req.params.id;

  Users.remove(id)
    .then((deletedUser) => {
      if (!deletedUser) {
        return res
          .status(404)
          .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
      }
      res.json(deletedUser);
    })
    .catch(() => {
      res.status(500).json({ message: "Kullanıcı silinemedi" });
    });
});

// PUT

server.put("/api/users/:id", (req, res) => {
  const id = req.params.id;
  const user = req.body;

  if (!user.name || !user.bio) {
    return res
      .status(400)
      .json({ message: "Lütfen kullanıcı için name ve bio sağlayın" });
  }

  Users.update(id, user)
    .then((updatedUser) => {
      if (!updatedUser) {
        return res
          .status(404)
          .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
      }
      res.json(updatedUser);
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Kullanıcı bilgisi alınamadı" });
    });
});

module.exports = server; // SERVERINIZI EXPORT EDİN {}
