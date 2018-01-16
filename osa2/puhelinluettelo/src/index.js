import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";
import {
  fetchPersons,
  addPerson,
  removePerson,
  updatePerson
} from "./personsService";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      newName: "",
      newNumber: "",
      filter: "",
      notification: ""
    };
  }

  componentDidMount() {
    fetchPersons().then(response => this.setState({ persons: response.data }));
  }

  updatePerson() {
    const names = this.state.persons.map(person => person.name);
    const updatedPerson = {
      ...this.state.persons[names.indexOf(this.state.newName)],
      number: this.state.newNumber
    };
    updatePerson(updatedPerson.id, updatedPerson).then(
      ({ data }) => {
        const persons = [...this.state.persons];
        persons[names.indexOf(this.state.newName)] = data;
        this.setState({
          persons,
          newName: "",
          newNumber: "",
          notification: `Henkilön ${
            data.name
          } puhelinnumero päivitetty onnistuneesti`
        });
      },
      () => {
        this.setState({
          persons: this.state.persons.filter(
            person => person.id === updatedPerson.id
          )
        });
        this.addPerson(updatedPerson);
      }
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    const names = this.state.persons.map(person => person.name);
    if (names.includes(this.state.newName)) {
      this.updatePerson();
      return;
    }

    const { newName, newNumber } = this.state;
    this.addPerson({ number: newNumber, name: newName });
  };

  addPerson = person => {
    addPerson(person).then(({ data }) => {
      this.setState({
        persons: this.state.persons.concat(data),
        newName: "",
        newNumber: "",
        notification: `Henkilö ${data.name} lisätty onnistuneesti`
      });
    });
  };

  handleRemove = id => {
    removePerson(id).then(() =>
      this.setState({
        notification: `Henkilö ${
          this.state.persons.find(i => i.id === id).name
        } poistettu onnistuneesti`,
        persons: this.state.persons.filter(person => person.id !== id)
      })
    );
  };

  handleNameChange = event => {
    this.setState({ newName: event.target.value });
  };

  handleNumberChange = event => {
    this.setState({ newNumber: event.target.value });
  };

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        {this.state.notification && (
          <Notification notification={this.state.notification} />
        )}
        <Filter
          filter={this.state.filter}
          onFilterChange={this.handleFilterChange}
        />
        <HenkiloForm
          onSubmit={this.handleSubmit}
          newName={this.state.newName}
          newNumber={this.state.newNumber}
          onNumberChange={this.handleNumberChange}
          onNameChange={this.handleNameChange}
        />
        <h2>Numerot</h2>
        {this.state.persons
          .filter(person =>
            person.name.toUpperCase().includes(this.state.filter.toUpperCase())
          )
          .map(person => (
            <Person
              onRemove={this.handleRemove}
              key={person.name}
              {...person}
            />
          ))}
      </div>
    );
  }
}

const Person = ({ name, number, id, onRemove }) => (
  <pre key={name}>
    {name} {number} <button onClick={onRemove.bind(null, id)}>Poista</button>
  </pre>
);

const Filter = ({ filter, onFilterChange }) => (
  <div>
    rajaa näytettävä arvo <input value={filter} onChange={onFilterChange} />
  </div>
);

const HenkiloForm = ({
  onSubmit,
  newName,
  newNumber,
  onNumberChange,
  onNameChange
}) => (
  <div>
    <h2>Lisää uusi</h2>
    <form onSubmit={onSubmit}>
      <div>
        nimi: <input value={newName} onChange={onNameChange} />
      </div>
      <div>
        numero: <input value={newNumber} onChange={onNumberChange} />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  </div>
);

const Notification = ({ notification }) => {
  return <div className="notification">{notification}</div>;
};
ReactDOM.render(<App />, document.getElementById("root"));
