const router = require("express").Router();
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

router.get("/", (req, res) => {
  res.json(JSON.parse(readFromDb()));
});

router.post("/", (req, res) => {
  const { title, text } = req.body;
  const newNote = {
    title,
    text,
    id: uuidv4(),
  };
  writeToDb(newNote);
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  let data = JSON.parse(readFromDb());
  let recordToDelete = -1;
  data.forEach((record, index) => {
    if (record.id === id) {
      recordToDelete = index;
    }
  });
  if (recordToDelete !== -1) {
    data.splice(recordToDelete, 1);
  }
  fs.writeFileSync("./db/db.json", JSON.stringify(data));
  res.json("itemDeleted");
});

const readFromDb = () => {
  let note = fs.readFileSync("./db/db.json", "utf-8");
  return note;
};

const writeToDb = (data) => {
  let note = JSON.parse(readFromDb());
  note.push(data);
  fs.writeFileSync("./db/db.json", JSON.stringify(note));
};

module.exports = router;
