import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      newName: "",
      newNumber: "",
      filter: ""
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:3001/persons")
      .then(response => this.setState({ persons: response.data }));
  }

  handleSubmit = event => {
    event.preventDefault();

    if (
      this.state.persons.map(person => person.name).includes(this.state.newName)
    ) {
      return;
    }
    this.setState({
      persons: this.state.persons.concat({
        name: this.state.newName,
        number: this.state.newNumber
      }),
      newName: "",
      newNumber: ""
    });
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
          .map(person => <Person key={person.name} {...person} />)}
      </div>
    );
  }
}

const Person = ({ name, number }) => (
  <pre key={name}>
    {name} {number}
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

ReactDOM.render(<App />, document.getElementById("root"));
