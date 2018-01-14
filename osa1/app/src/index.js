import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = 'Reactin perusteet'
  const tehtavia1 = 10
  const osa2 = 'Tiedonvälitys propseilla'
  const tehtavia2 = 7
  const osa3 = 'Komponenttien tila'
  const tehtavia3 = 14

  return (
    <div>
      <Otsikko kurssi={kurssi} />
      <Sisalto
        osa1={osa1}
        osa2={osa2}
        osa3={osa3}
        tehtavia1={tehtavia1}
        tehtavia2={tehtavia2}
        tehtavia3={tehtavia3}
      />
      <Yhteensa yhteensa={tehtavia1 + tehtavia2 + tehtavia3} />
    </div>
  )
}

const Yhteensa = ({ yhteensa }) => <p>yhteensä {yhteensa} tehtävää</p>
const Otsikko = ({ kurssi }) => <h1>{kurssi}</h1>
const Sisalto = ({ osa1, osa2, osa3, tehtavia1, tehtavia2, tehtavia3 }) => (
  <div>
    <Osa tehtavia={tehtavia1} osa={osa1} />
    <Osa tehtavia={tehtavia2} osa={osa2} />
    <Osa tehtavia={tehtavia3} osa={osa3} />
  </div>
);

const Osa = ({ osa, tehtavia }) => <p>{osa} {tehtavia}</p>


ReactDOM.render(
  <App />,
  document.getElementById('root')
)
