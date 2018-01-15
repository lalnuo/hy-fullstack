import React from 'react';
const Kurssi = ({ kurssi }) => (
  <div>
    <h2>{kurssi.nimi}</h2>
    <Sisalto osat={kurssi.osat} />
  </div>
);

const Sisalto = ({ osat }) => (
  <div>
    <h4>sisältö</h4>
    <ul>
      {osat.map(osa => <li key={osa.id}>{osa.nimi}, tehtäviä {osa.tehtavia}</li>)}
    </ul>
    <span>Yhteensä {osat.reduce((acc, i) => acc + i.tehtavia, 0)} tehtävää</span>
  </div>
);

export default Kurssi;
