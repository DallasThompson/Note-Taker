const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;

const notesRouter = require("./backendRoutes/notes");

const app = express();
// const PORT = 3000;

app.use(express.json());

app.use("/api/notes", notesRouter);

app.use(
  express.static(path.join(__dirname, "public"), {
    extensions: ["html", "js", "css"],
  })
);
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "notes.html"));
});

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT} `);
});
