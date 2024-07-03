const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3001;

app.use(cors());

app.get("/api/volumes/brief/isbn/:isbn", async (req, res) => {
  const { isbn } = req.params;
  try {
    const response = await axios.get(
      `https://openlibrary.org/api/volumes/brief/isbn/${isbn}.json`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching data from OpenLibrary API");
  }
});

app.listen(port, () => {
  console.log(`Proxy server listening at http://localhost:${port}`);
});
