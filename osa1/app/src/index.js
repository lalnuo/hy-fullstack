import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [{
      nimi: 'Reactin perusteet',
      tehtavia: 10
    },
    {
      nimi: 'Tiedonvälitys propseilla',
      tehtavia: 7
    },
    {
      nimi: 'Komponenttien tila',
      tehtavia: 14
    }]
  };

  return (
    <div>
      <Otsikko kurssi={kurssi.nimi} />
      <Sisalto
        osat={kurssi.osat}
      />
      <Yhteensa yhteensa={kurssi.osat.reduce((acc, i) => acc + i.tehtavia, 0)} />
    </div>
  )
}

const Yhteensa = ({ yhteensa }) => <p>yhteensä {yhteensa} tehtävää</p>
const Otsikko = ({ kurssi }) => <h1>{kurssi}</h1>
const Sisalto = ({ osat }) => (
  <div>
    {osat.map(osa => <Osa osa={osa} />)}
  </div>
);

const Osa = ({ osa }) => <p>{osa.nimi} {osa.tehtavia}</p>


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
