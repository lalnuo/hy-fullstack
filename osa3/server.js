const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());
morgan.token("body", req => JSON.stringify(req.body));
app.use(morgan(":method :url :body :res[content-length] - :response-time ms"));
app.use(morgan("tiny"));

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Lalli Nuorteva",
    number: "040-123456",
    id: 2
  },
  {
    name: "Foo Bar",
    number: "040-123456",
    id: 3
  }
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.delete("/api/persons/:id", (req, res) => {
  persons = persons.filter(person => person.id !== Number(req.params.id));
  res.sendStatus(200);
});

app.post("/api/persons", (req, res) => {
  const id = Math.floor(Math.random() * 100000);
  const name = req.body.name;
  const number = req.body.number;
  if (!name) {
    res.status(400).send("Name can not be empty");
  } else if (!number) {
    res.status(400).send("Number can not be empty");
  } else if (persons.find(person => person.name === name)) {
    res.status(400).send("Name must be unique");
  } else {
    persons.push({ name, number, id });
    res.status(200).send({ name, number, id });
  }
});

app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;
  const person = persons.find(person => person.id === Number(id));
  res.json(person);
});

app.get("/info", (req, res) => {
  res.send(`
    <p>puhelinluettelossa on ${persons.length} henkilön tiedot</p>
    ${new Date()}
  `);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
