import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";

class App extends React.Component {
  state = {
    countries: [],
    filter: ""
  };
  componentDidMount() {
    axios.get("https://restcountries.eu/rest/v2/all").then(response =>
      this.setState({
        countries: response.data
      })
    );
  }

  handleFilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  searchByCountry = country => {
    this.setState({ filter: country });
  };

  render() {
    const filteredCountries = this.state.countries.filter(country =>
      country.name.toUpperCase().includes(this.state.filter.toUpperCase())
    );

    let result;
    if (filteredCountries.length > 10) {
      result = <p>too many matches, specify another filter</p>;
    } else if (filteredCountries.length === 1) {
      result = <Country country={filteredCountries[0]} />;
    } else {
      result = (
        <CountryList
          searchByCountry={this.searchByCountry}
          countries={filteredCountries}
        />
      );
    }
    return (
      <div>
        find countries:{" "}
        <input value={this.state.filter} onChange={this.handleFilterChange} />
        {result}
      </div>
    );
  }
}

const Country = ({ country }) => {
  return (
    <div>
      <h2>
        {country.name} {country.nativeName}
      </h2>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <img src={country.flag} height={200} width={400} />
    </div>
  );
};

const CountryList = ({ countries, searchByCountry }) => (
  <div>
    {countries.map(country => (
      <p onClick={() => searchByCountry(country.name)} key={country.name}>
        {country.name}
      </p>
    ))}
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
