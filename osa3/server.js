const express = require("express");
const app = express();

const persons = [
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
