const express = require("express");
const cors = require("cors");

const pics = require("./pics");

const app = express();

app.use(cors());

// Vérifier que l'API fonctionne
app.get("/", (req, res) => {
  res.json({
    message: "Mon API Express fonctionne",
    total: pics.length
  });
});

// 1. Toutes les photos
app.get("/api/images", (req, res) => {
  res.json(pics);
});

// 2. Choisir une quantité
// Exemple : /api/images?limit=5
app.get("/api/images", (req, res) => {
  const limit = Number(req.query.limit);

  if (!limit) {
    return res.json(pics);
  }

  if (limit < 1 || limit > pics.length) {
    return res.status(400).json({
      error: `Choisis un nombre entre 1 et ${pics.length}`
    });
  }

  res.json(pics.slice(0, limit));
});

// 3. Choisir une photo précise
// Exemple : /api/image/10
app.get("/api/image/:id", (req, res) => {
  const id = Number(req.params.id);

  if (id < 1 || id > pics.length) {
    return res.status(404).json({
      error: `Photo introuvable. Choisis entre 1 et ${pics.length}`
    });
  }

  res.json({
    id: id,
    image: pics[id - 1]
  });
});

// 4. Photo aléatoire
app.get("/api/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * pics.length);

  res.json({
    id: randomIndex + 1,
    image: pics[randomIndex]
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API démarrée sur le port ${PORT}`);
});