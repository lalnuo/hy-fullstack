const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const Person = require("./Person");

app.use(express.static("build"));
app.use(bodyParser.json());
app.use(cors());
morgan.token("body", req => JSON.stringify(req.body));
app.use(morgan(":method :url :body :res[content-length] - :response-time ms"));
app.use(morgan("tiny"));

app.get("/api/persons", (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons.map(Person.format));
  });
});

app.delete("/api/persons/:id", (req, res) => {
  Person.remove({ _id: req.params.id }).then(() => {
    res.sendStatus(200);
  });
});

app.put("/api/persons/:id", (req, res) => {
  const person = {
    name: req.body.name,
    number: req.body.number
  };
  Person.findByIdAndUpdate(req.params.id, person, { new: true }).then(
    person => {
      res.json(Person.format(person));
    }
  );
});

app.post("/api/persons", (req, res) => {
  const name = req.body.name;
  const number = req.body.number;

  new Person({ name, number })
    .save()
    .then(result => {
      res.send(Person.format(result));
    })
    .catch(error => {
      res.status(400).send(error.message || error.errmsg);
    });
});

app.get("/api/persons/:id", (req, res) => {
  Person.findById(req.params.id).then(data => {
    console.log(data);
    res.json(Person.format(data));
  });
});

app.get("/info", (req, res) => {
  Person.count().then(count => {
    res.send(`
      <p>puhelinluettelossa on ${count} henkilön tiedot</p>
      ${new Date()}
    `);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
